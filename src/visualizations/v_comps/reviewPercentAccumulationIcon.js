import G2 from "@antv/g2";
import ShapeUtil from "@antv/g2/src/geom/util/shape.js";
import PathUtil from "@antv/g2/src/geom/util/path.js";
const Util = G2.Util;
const Shape = G2.Shape;
const Global = G2.Global;
const GPathUtil = Util.PathUtil;

/**
 * 定义可视化动画效果
 * @author aHugh
 * @param {Object} chart 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @return
 */
export default function reviewPercentAccumulationIcon(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const starPath =
    "M512 0c-27.733333 0-53.333333 14.933333-66.133333 42.666667l-96 206.933333c-12.8 25.6-36.266667 44.8-64 49.066667L64 330.666667c-59.733333 10.666667-85.333333 83.2-42.666667 125.866666l166.4 170.666667c19.2 19.2 27.733333 46.933333 23.466667 72.533333L170.666667 936.533333c-6.4 49.066667 29.866667 87.466667 72.533333 87.466667 12.8 0 23.466667-2.133333 36.266667-8.533333l196.266666-108.8c10.666667-6.4 23.466667-8.533333 36.266667-8.533334 12.8 0 25.6 2.133333 36.266667 8.533334l196.266666 108.8c10.666667 6.4 23.466667 8.533333 36.266667 8.533333 42.666667 0 81.066667-38.4 72.533333-87.466667l-38.4-236.8c-4.266667-25.6 4.266667-53.333333 23.466667-72.533333l166.4-170.666667c42.666667-42.666667 17.066667-115.2-42.666667-125.866666L740.266667 298.666667c-27.733333-4.266667-53.333333-23.466667-64-49.066667L578.133333 42.666667C565.333333 14.933333 539.733333 0 512 0z";
  const thumbPath =
    "M939.517328 410.237436h-272.638296C772.478372 19.839876 591.9995 0 591.9995 0c-73.59954 0-58.239636 59.519628-63.9996 69.759564 0 191.9988-202.878732 340.477872-202.878732 340.477872v541.436616C325.121168 1004.79372 400.0007 1023.9936 426.880532 1023.9936h409.59744c38.39976 0 69.759564-101.119368 69.759564-101.119368 101.119368-344.957844 101.119368-447.9972 101.119368-447.9972a63.9996 63.9996 0 0 0-68.479572-63.9996zM213.761864 410.237436H49.922888a33.279792 33.279792 0 0 0-33.919788 33.279792l33.919788 545.916588a33.919788 33.919788 0 0 0 34.559784 34.559784h141.439116c29.439816 0 29.439816-23.039856 29.439816-23.039856V451.837176a40.319748 40.319748 0 0 0-41.59974-41.59974z";
  const reviewPercentAccumulationIcon = chart;

  const dataNew = [data[0]];

  dataNew.forEach(item => {
    reviewPercentAccumulationIcon.guide().text({
      top: true,
      position: {
        name: item.name,
        value: 0.26
      },
      content: item.value * 100 + "%\n" + "like",
      style: {
        opacity: 1,
        textAlign: "center",
        fontSize: baseFontSize * 1.5,
        fill: "#ffffff",
        fontWeight: "bold"
      },
      offsetX: 20 // x 方向的偏移量
    });
  });

  reviewPercentAccumulationIcon.legend(false).axis(false);

  reviewPercentAccumulationIcon.source(dataNew, {
    value: {
      min: 0,
      max: 1
    }
  });

  function getLineAttrs(cfg) {
    const defaultAttrs = Global.shape.hollowInterval;
    const attrs = Util.mix({}, defaultAttrs, cfg.style);
    ShapeUtil.addStrokeAttrs(attrs, cfg);
    // @2018-12-10 by blue.lb 这里需要特殊处理，由于像tick这种shape名称在方法_applyViewThemeShapeStyle中，不会被当做hollow镂空图形处理，这导致lineWidth的值为0，所以无法绘制出内容，如果写在addStrokeAttrs中，又不能保证所有的默认lineWidth为2，这里做一下特殊处理解决
    attrs.lineWidth = cfg.size || 2; // size 就是线的宽度
    return attrs;
  }

  // 水波图
  /**
   * 用贝塞尔曲线模拟正弦波
   * Using Bezier curves to fit sine wave.
   * There is 4 control points for each curve of wave,
   * which is at 1/4 wave length of the sine wave.
   *
   * The control points for a wave from (a) to (d) are a-b-c-d:
   *          c *----* d
   *     b *
   *       |
   * ... a * ..................
   *
   * whose positions are a: (0, 0), b: (0.5, 0.5), c: (1, 1), d: (PI / 2, 1)
   *
   * @param {number} x          x position of the left-most point (a)
   * @param {number} stage      0-3, stating which part of the wave it is
   * @param {number} waveLength wave length of the sine wave
   * @param {number} amplitude  wave amplitude
   * @return {Array} 正弦片段曲线
   */
  function getWaterWavePositions(x, stage, waveLength, amplitude) {
    if (stage === 0) {
      return [
        [x + ((1 / 2) * waveLength) / Math.PI / 2, amplitude / 2],
        [x + ((1 / 2) * waveLength) / Math.PI, amplitude],
        [x + waveLength / 4, amplitude]
      ];
    } else if (stage === 1) {
      return [
        [x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 2), amplitude],
        [
          x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 1),
          amplitude / 2
        ],
        [x + waveLength / 4, 0]
      ];
    } else if (stage === 2) {
      return [
        [x + ((1 / 2) * waveLength) / Math.PI / 2, -amplitude / 2],
        [x + ((1 / 2) * waveLength) / Math.PI, -amplitude],
        [x + waveLength / 4, -amplitude]
      ];
    }
    return [
      [x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 2), -amplitude],
      [
        x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 1),
        -amplitude / 2
      ],
      [x + waveLength / 4, 0]
    ];
  }
  /**
   * 获取水波路径
   * @param  {number} radius          半径
   * @param  {number} waterLevel      水位
   * @param  {number} waveLength      波长
   * @param  {number} phase           相位
   * @param  {number} amplitude       震幅
   * @param  {number} cx              圆心x
   * @param  {number} cy              圆心y
   * @return {Array}  path            路径
   * @reference http://gitlab.alipay-inc.com/datavis/g6/blob/1.2.0/src/graph/utils/path.js#L135
   */
  function getWaterWavePath(
    radius,
    waterLevel,
    waveLength,
    phase,
    amplitude,
    cx,
    cy
  ) {
    const curves = Math.ceil(((2 * radius) / waveLength) * 4) * 2;
    const path = [];

    // map phase to [-Math.PI * 2, 0]
    while (phase < -Math.PI * 2) {
      phase += Math.PI * 2;
    }
    while (phase > 0) {
      phase -= Math.PI * 2;
    }
    phase = (phase / Math.PI / 2) * waveLength;

    const left = cx - radius + phase - radius * 2;
    /**
     * top-left corner as start point
     *
     * draws this point
     *  |
     * \|/
     *  ~~~~~~~~
     *  |      |
     *  +------+
     */
    path.push(["M", left, waterLevel]);

    /**
     * top wave
     *
     * ~~~~~~~~ <- draws this sine wave
     * |      |
     * +------+
     */
    let waveRight = 0;
    for (let c = 0; c < curves; ++c) {
      const stage = c % 4;
      const pos = getWaterWavePositions(
        (c * waveLength) / 4,
        stage,
        waveLength,
        amplitude
      );
      path.push([
        "C",
        pos[0][0] + left,
        -pos[0][1] + waterLevel,
        pos[1][0] + left,
        -pos[1][1] + waterLevel,
        pos[2][0] + left,
        -pos[2][1] + waterLevel
      ]);

      if (c === curves - 1) {
        waveRight = pos[2][0];
      }
    }

    /**
     * top-right corner
     *
     *                       ~~~~~~~~
     * 3. draws this line -> |      | <- 1. draws this line
     *                       +------+
     *                          ^
     *                          |
     *                  2. draws this line
     */
    path.push(["L", waveRight + left, cy + radius]);
    path.push(["L", left, cy + radius]);
    path.push(["L", left, waterLevel]);
    return path;
  }

  /**
   * 添加水波
   * @param {number} x           中心x
   * @param {number} y           中心y
   * @param {number} level       水位等级 0～1
   * @param {number} waveCount   水波数
   * @param {number} colors      色值
   * @param {number} group       图组
   * @param {number} clip        用于剪切的图形
   * @param {number} radius      绘制图形的高度
   */
  function addWaterWave(x, y, level, waveCount, colors, group, clip, radius) {
    const bbox = clip.getBBox();
    const width = bbox.maxX - bbox.minX;
    const height = bbox.maxY - bbox.minY;
    const duration = 5000;
    const delayDiff = 300;
    for (let i = 0; i < waveCount; i++) {
      const wave = group.addShape("path", {
        attrs: {
          path: getWaterWavePath(
            radius,
            bbox.minY + height * level,
            width / 4,
            0,
            width / 64,
            x,
            y
          ),
          fill: colors[i],
          clip
        }
      });
      // FIXME wave animation error in svg
      if (Global.renderer === "canvas") {
        wave.animate(
          {
            transform: [["t", width / 2, 0]],
            repeat: true
          },
          duration - i * delayDiff
        );
      }
    }
  }

  const pathMetaCache = {};

  function getFillAttrs(cfg) {
    const defaultAttrs = Global.shape.interval;
    const attrs = Util.mix({}, defaultAttrs, cfg.style);
    ShapeUtil.addFillAttrs(attrs, cfg);
    if (cfg.color) {
      attrs.stroke = attrs.stroke || cfg.color;
    }
    return attrs;
  }

  Shape.registerShape("interval", "liquid-fill-mypath", {
    draw(cfg, container) {
      const self = this;
      const attrs = Util.mix({}, getFillAttrs(cfg));
      const path = cfg.shape[1];

      const cy = 0.5;
      let sumX = 0;
      let minX = Infinity;
      Util.each(cfg.points, p => {
        if (p.x < minX) {
          minX = p.x;
        }
        sumX += p.x;
      });
      const cx = sumX / cfg.points.length;
      const cp = self.parsePoint({
        x: cx,
        y: cy
      });
      const minP = self.parsePoint({
        x: minX,
        y: -10
      });
      const xWidth = cp.x - minP.x;
      const radius = Math.min(xWidth, minP.y);

      let pathMeta;
      if (pathMetaCache[path]) {
        pathMeta = pathMetaCache[path];
      } else {
        const segments = GPathUtil.parsePathString(path);
        pathMetaCache[path] = pathMeta = {
          segments
        };
      }
      const transform = [];
      if (attrs.rotate) {
        transform.push(["r", (attrs.rotate / 180) * Math.PI]);
        delete attrs.rotate;
      }
      const shape = container.addShape("path", {
        attrs: Util.mix(attrs, {
          fillOpacity: 0,
          path: pathMeta.segments
        })
      });
      const bbox = Util.cloneDeep(shape.getBBox());
      const rangeX = bbox.maxX - bbox.minX;
      const rangeY = bbox.maxY - bbox.minY;
      const range = Math.max(rangeX, rangeY);
      const scale = (radius * 2) / range;
      shape.transform(transform.concat([["s", scale, scale]]));
      const dw = (scale * rangeX) / 2; // (bbox.maxX - bbox.minX) / 2;
      const dh = (scale * rangeY) / 2; // (bbox.maxY - bbox.minY) / 2;
      shape.transform([["t", cp.x - dw, cp.y - dh]]);
      addWaterWave(
        cp.x,
        cp.y,
        cfg.y / (2 * cp.y),
        1,
        [attrs.fill],
        container,
        shape,
        minP.y * 4
      );

      const keyShape = container.addShape("path", {
        attrs: Util.mix(getLineAttrs(cfg), {
          path: pathMeta.segments
        })
      });
      keyShape.transform(
        transform.concat([["s", scale, scale], ["t", cp.x - dw, cp.y - dh]])
      );
      return keyShape;
    }
  });

  reviewPercentAccumulationIcon
    .interval()
    .position("name*value")
    .color("#003963")
    .opacity(1)
    .shape("path", path => ["liquid-fill-mypath", thumbPath])
    .style({
      fill: "#003963" + "92",
      opacity: 1,
      lineWidth: 20,
      stroke: "#003963"
    })
    .animate({
      appear: {
        animation: "fadeIn",
        duration: enterDuration
      },
      leave: {
        animation: "fadeOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    })
    .tooltip(false)
    .active(false);
}
