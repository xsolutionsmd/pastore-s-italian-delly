import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
const app=fileURLToPath(new URL('../',import.meta.url));
const menu=JSON.parse(readFileSync(join(app,'src/menu.json'),'utf8'));
// On a source checkout, independently reconcile the public app snapshot to the
// coordinator's accepted authority. The runtime image deliberately excludes kb/.
const authority=join(app,'../kb/menu-source.json');
if(existsSync(authority)){
 const source=JSON.parse(readFileSync(authority,'utf8'));
 assert.deepEqual(menu.groups.map(g=>({id:g.id,heading:g.heading,items:g.items.map(({name,price,url})=>({name,price,url}))})),source.groups.map(g=>({id:g.id,heading:g.heading,items:g.items.map(({name,price,url})=>({name,price,url}))})));
 console.log('Accepted Toast authority reconciled: all group IDs, names, prices and row URLs match.');
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
assert.equal(menu.groups.length,17);assert.equal(menu.groups.reduce((n,g)=>n+g.items.length,0),147);
const paths=['index.html','menu/index.html','catering/index.html','our-story/index.html','visit/index.html','404.html'],titles=new Set();
for(const path of paths){
 const html=readFileSync(join(app,'dist',path),'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${path}: one h1`);
 assert(!/xs-stage|Something new is taking shape|A new website is being prepared/.test(html));
 assert(/name="robots" content="noindex, nofollow"/.test(html));
 assert(/<meta name="description" content="[^"]{60,}"/.test(html));titles.add(html.match(/<title>(.*?)<\/title>/)[1]);
 for(const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)){const url=match[1];assert(existsSync(resolve(app,'dist',`.${url}`,url.endsWith('/')?'index.html':'')),`${path}: missing ${url}`);}
}
assert.equal(titles.size,6,'Distinct page titles, including the error document');
const notFound=readFileSync(join(app,'dist/404.html'),'utf8');
assert(notFound.includes('<h1>Page not found</h1>'));
assert(notFound.includes('href="/">Back to Home</a>'));
assert(notFound.includes('href="/menu/">Explore the Menu</a>'));
const html=readFileSync(join(app,'dist/menu/index.html'),'utf8');
assert.equal((html.match(/data-group-id=/g)||[]).length,17);assert.equal((html.match(/data-item-id=/g)||[]).length,147);
const ids=new Set();
for(const group of menu.groups){assert(html.includes(`data-group-id="${group.id}"`));for(const item of group.items){
 assert(!ids.has(item.url),'Unique row destinations');ids.add(item.url);assert(html.includes(`href="${esc(item.url)}">${esc(item.name)}</a>`),item.name);
 const id=item.url.split('_').at(-1);const row=html.match(new RegExp(`data-item-id="${id}"[\\s\\S]*?</article>`))[0];
 assert(row.includes(`<span class="price">${esc(item.price)}</span>`));if(item.name==='Five Cheese Lasagna')assert(!/beef|vegetarian/i.test(row));
}}
assert(!/<img|<picture/i.test(html.slice(html.indexOf('class="menu-content"'),html.indexOf('</main>'))),'Menu is text-only');
const catering=readFileSync(join(app,'dist/catering/index.html'),'utf8');for(const fact of ['$10.95','$13.95','10-person minimum','48-hour notice','$25 advance payment'])assert(catering.includes(fact));
console.log('Content checks passed: five direct pages, 147 exact rows / 17 groups, prices, links, noindex, catering terms, text-only menu.');
