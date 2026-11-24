import fs from 'node:fs';
import path from 'node:path';
const folder = new URL('./dist/', import.meta.url);
const files = fs.readdirSync(folder);
let count = 0;
for (const file of files.filter(f => f.endsWith('.html') && f !== '404.html')) {
  const html = fs.readFileSync(new URL(file,folder),'utf8');
  const fail = message => { throw new Error(`${file}: ${message}`); };
  if ((html.match(/<h1[ >]/g)||[]).length !== 1) fail('Need exactly one h1');
  if (!/<html lang="zh-CN">/.test(html) || !/name="viewport"/.test(html)) fail('Missing language/viewport');
  if (!/<link rel="canonical" href="https:\/\/yiyuanjc.github.io\//.test(html)) fail('Wrong canonical');
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) fail('Missing description');
  for (const schema of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(schema[1]);
  for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const destination = target.split('#')[0] || './';
    const local = destination === './' ? 'index.html' : destination;
    if (!fs.existsSync(new URL(local, folder))) fail(`Broken local link ${target}`);
  }
  if (/placeholder|lorem ipsum|TODO/i.test(html)) fail('Unfinished copy');
  if (file !== 'index.html' && /<dialog/.test(html)) fail('Homepage popup leaked');
  count++;
}
const titles = files.filter(f=>f.endsWith('.html')).map(f=>fs.readFileSync(new URL(f,folder),'utf8').match(/<title>(.*?)<\/title>/)?.[1]);
if (new Set(titles).size !== titles.length) throw new Error('Duplicate titles');
console.log(`PASS: ${count} pages; canonicals, metadata, schema, local links, unique titles, homepage-only popup.`);
