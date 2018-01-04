# webapp-timeline-search
A simple timeline search WebApp
## Setup
* `git clone https://github.com/sitevision/webapp-timeline-search.git`
* `cd webapp-timeline-search`
* `npm install`
* `npm run setup`
## Building
* `npm run zip` compress `/src` into `/dist`
* `npm run deploy` compress `/src` into `/dist` and upload to the addon configured in the setup task
* `npm run force-deploy` compress `/src` into `/dist` and upload to the addon configured in the setup task. This will overwrite the current webapp if it has the same id and version defined in manifest.json.