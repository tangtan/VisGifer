# VisGifer

> Creating short-form videos and gifs for animated data visualizations.

## Visualization

The visualization module is powered by [G2](https://g2.antv.vision/zh/examples/gallery).

## Configuration

```json
{
  "name": "Increases in Leaf Area (10^11 m2)",
  "data": [
    {
      "name": "Croplands",
      "value": 17.85
    },
    {
      "name": "Forests",
      "value": 16.72
    },
    {
      "name": "Grasslands",
      "value": 7.85
    },
    {
      "name": "Others",
      "value": 11.5
    }
  ],
  "vis_type": "barHorizontalRound",
  "vis_duration": 4,
  "vis_position_x": 10,
  "vis_position_y": 10,
  "vis_size_w": 400,
  "vis_size_h": 360,
  "vis_colors": ["#e0b25a"],
  "font_size": 16,
  "font_color": "#ffffff",
  "background_fill": "#703434",
  "background_opacity": 0.4,
  "background_src": "/static/sample.mp4", // support video or image background
  "background_size_w": 960, // only valid when background_src exist
  "background_size_h": 540
}
```

## TODO

- [*] UI - Extensible JSON console
- [*] UI - Invisible video recorder
- [*] JSON - Editable JSON cfg
- [ ] TEST - Unit
- [*] DOCs - README
- [*] FEAT - Output format
- [ ] FEAT - Multiple rendering
- [ ] FEAT - Customize events sequence

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
