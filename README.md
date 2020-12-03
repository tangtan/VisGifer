# VisGifer

> Making animated and expressive data visualizations (Powerer by G2).

## VIS Library

```bash
 src/types/v_comps/barBoard.js                | 154 ++++++++++++++++++++++++++
 src/types/v_comps/barDivide.js               | 163 +++++++++++++++++++++++++++
 src/types/v_comps/barDot.js                  | 109 ++++++++++++++++++
 src/types/v_comps/barHorizontalRect.js       | 195 ++++++++++++++++++++++++++++++++
 src/types/v_comps/barHorizontalRound.js      | 134 ++++++++++++++++++++++
 src/types/v_comps/barLineDot.js              | 136 +++++++++++++++++++++++
 src/types/v_comps/barRadial.js               |  82 ++++++++++++++
 src/types/v_comps/barStar.js                 | 138 +++++++++++++++++++++++
 src/types/v_comps/barThumb.js                | 359 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 src/types/v_comps/barTriangle.js             | 177 +++++++++++++++++++++++++++++
 src/types/v_comps/barVerticalRect.js         | 159 ++++++++++++++++++++++++++
 src/types/v_comps/barVerticalRound.js        | 166 ++++++++++++++++++++++++++++
 src/types/v_comps/chocolateInterestWaffle.js |   2 +-
 src/types/v_comps/donut.js                   |  38 +++----
 src/types/v_comps/dotHeight.js               | 120 ++++++++++++++++++++
 src/types/v_comps/dotSize.js                 |  85 ++++++++++++++
 src/types/v_comps/lineArea.js                |  90 +++++++++++++++
 src/types/v_comps/lineSmooth.js              | 148 +++++++++++++++++++++++++
 src/types/v_comps/pieFlower.js               | 158 ++++++++++++++++++++++++++
 src/types/v_comps/progressBar.js             |   2 -
 src/types/v_comps/wordCloud.js               | 137 +++++++++++++++++++++++
 src/utils/util.js                            |   7 ++
```

## TODO

- [ ] UI - Extensible JSON console
- [*] UI - Invisible video recorder
- [*] JSON - Editable JSON cfg
- [ ] TEST - Unit
- [ ] DOCs - README
- [*] FEAT - Output format

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
