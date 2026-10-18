import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
const entry=path=>fileURLToPath(new URL(path,import.meta.url));
export default defineConfig({build:{rollupOptions:{input:{home:entry('./index.html'),menu:entry('./menu/index.html'),catering:entry('./catering/index.html'),story:entry('./our-story/index.html'),visit:entry('./visit/index.html'),notFound:entry('./404.html')}}}});
