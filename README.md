# 一元机场 · 独立信息站

Public URL: https://houziwk2000-source.github.io/yiyuan/

## Maintain content

Edit `content.json` to update brand text, plan prices and traffic, popup settings, FAQ and guide articles. Keep verified business facts and the review date current. Source website: https://www.yiyuanjcgw.com/ . Do not add account credentials, personal subscription URLs or API keys.

Run `node build.mjs` then `node check.mjs` locally. No package install or external fonts are needed. GitHub Actions rebuilds and publishes `dist` on each push to main. Configure Pages source as GitHub Actions. The workflow is `.github/workflows/deploy.yml`.

The site contains full static HTML, individual article URLs, canonical tags, metadata, WebPage/Article JSON-LD, XML and HTML sitemaps, and a custom 404. No guaranteed indexing or rankings. Registration, popup and download-entry links all use the user-requested portal https://w1.feihouyun.com/#/register . No source-site settings are modified.

Homepage popup: `popup.enabled`, `title`, `text`, `button`, `waitSeconds`. A native modal dialog traps focus, supports Escape after the waiting period, and does not persist visitor data. All other pages omit the popup.

Responsive layout supports narrow phones, tablets, desktops and fold/unfold viewport widths. CSS also includes progressive viewport-segment handling and reduced-motion support. Physical device/Safari testing is separate from browser viewport checks.

Project Pages cannot serve the account-root robots.txt from this repository. Indexing defaults to allowed; sitemap is available at `/yiyuan/sitemap.xml`. Search Console/Bing verification or real indexing is not claimed without evidence.
