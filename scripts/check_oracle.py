#!/usr/bin/env python3
"""Exercise the real static image/Compose contract or a deployed HTTPS release."""
import argparse
import html
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
import urllib.error
import urllib.parse
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ('/', '/menu/', '/catering/', '/our-story/', '/visit/')

def run(*args, env=None):
    return subprocess.check_output(args, text=True, env=env).strip()

def check_http(base, revision):
    def get(path):
        with urllib.request.urlopen(base.rstrip('/') + path, timeout=20) as response:
            data = response.read()
            assert response.status == 200, path
            assert 'noindex' in response.headers.get('X-Robots-Tag', ''), path
            return data, response.headers
    version, headers = get('/version.json')
    assert json.loads(version)['revision'] == revision
    assert 'no-store' in headers.get('Cache-Control', '')
    assert get('/health')[0].strip() == b'ok'
    assets, titles = set(), set()
    for route in ROUTES:
        body = get(route)[0].decode()
        assert len(re.findall(r'<h1\b', body)) == 1, route
        assert 'name="robots" content="noindex, nofollow"' in body, route
        assert 'https://order.toasttab.com/online/pastores-italian-delly-8646-loch-raven-blvd' in body
        titles.add(re.search(r'<title>(.*?)</title>', body).group(1))
        for path in re.findall(r'(?:src|href)="(/[^"#?]*)"', body):
            if not path.endswith('/'):
                assets.add(html.unescape(path))
        if route == '/menu/':
            assert body.count('data-group-id=') == 17
            assert body.count('data-item-id=') == 147
            menu = body[body.index('class="menu-content"'):body.index('</main>')]
            assert not re.search(r'<img|<picture', menu, re.I), 'Text-only menu required'
    assert len(titles) == 5
    for asset in sorted(assets):
        assert get(asset)[0], asset
    try:
        get('/assets/pastores-infra-missing.css')
    except urllib.error.HTTPError as error:
        assert error.code == 404
    else:
        raise AssertionError('Missing asset must return 404')
    return {'base': base, 'revision': revision, 'routes': list(ROUTES), 'assets': len(assets),
            'health': True, 'noindex': True, 'menu_rows': 147, 'menu_groups': 17, 'menu_text_only': True}

def check_image(image, compose_path, environment, revision):
    identity = 'pastores-infra-check-' + uuid.uuid4().hex[:10]
    env = dict(os.environ, APP_IMAGE=image)
    rendered = json.loads(run('docker', 'compose', '-f', str(compose_path), 'config', '--format', 'json', env=env))
    assert set(rendered['services']) == {'web'}
    web = rendered['services']['web']
    assert web['read_only'] and web['environment']['APP_ENVIRONMENT'] == environment
    assert not web.get('volumes') and not web.get('ports')
    assert set(web['tmpfs']) == {'/tmp', '/data', '/config'}
    assert 'no-new-privileges:true' in web['security_opt']
    # Substitute only external test identities and a loopback ephemeral port.
    rendered['name'] = identity
    rendered['networks']['proxy']['name'] = identity
    web['networks']['proxy']['aliases'] = [identity]
    web['ports'] = [{'target': 8080, 'published': '0', 'host_ip': '127.0.0.1', 'protocol': 'tcp'}]
    run('docker', 'network', 'create', identity)
    with tempfile.TemporaryDirectory(prefix=identity) as folder:
        config = Path(folder)/'compose.json'
        config.write_text(json.dumps(rendered))
        command = ['docker', 'compose', '--project-name', identity, '-f', str(config)]
        try:
            run(*command, 'up', '-d', '--no-build', '--wait', '--wait-timeout', '90')
            container = run(*command, 'ps', '-q', 'web')
            info = json.loads(run('docker', 'inspect', container))[0]
            assert info['HostConfig']['ReadonlyRootfs']
            assert info['State']['Health']['Status'] == 'healthy'
            assert all(m['Type'] == 'tmpfs' for m in info['Mounts']), 'No persistent data in stateless candidate'
            image_info = json.loads(run('docker', 'image', 'inspect', image))[0]
            labels = image_info['Config']['Labels']
            assert labels['org.opencontainers.image.revision'] == revision
            assert labels['org.opencontainers.image.source'] == 'https://github.com/xsolutionsmd/pastore-s-italian-delly'
            address = run(*command, 'port', 'web', '8080')
            receipt = check_http('http://' + address, revision)
            receipt.update(compose=str(compose_path), environment=environment, architecture=image_info['Architecture'], readonly=True)
            return receipt
        finally:
            run(*command, 'down', '--volumes')
            run('docker', 'network', 'rm', identity)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--revision', required=True)
    parser.add_argument('--base-url')
    parser.add_argument('--image')
    parser.add_argument('--compose', type=Path, default=ROOT/'server/compose.yaml')
    parser.add_argument('--environment', default='production')
    args = parser.parse_args()
    assert re.fullmatch(r'[0-9a-f]{40}', args.revision)
    assert bool(args.base_url) != bool(args.image), 'Select live URL or image'
    result = check_http(args.base_url, args.revision) if args.base_url else check_image(args.image, args.compose, args.environment, args.revision)
    print(json.dumps(result, indent=2))
