import DataSet from "@antv/data-set";
import { assign } from "lodash";
import G2 from "@antv/g2";
/**
 * 定义可视化动画效果
 * @author aHugh
 * @param {Object} chart 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @return
 */
export default function chatbubble(chart, data, enterDuration, leaveDuration) {
  // 词云shape的属性设置函数
  function getTextAttrs(cfg) {
    return assign({}, cfg.style, {
      fillOpacity: cfg.opacity,
      fontSize: cfg.size,
      rotate: cfg.origin._origin.rotate,
      text: cfg.origin._origin.text,
      textAlign: "center",
      fontFamily: cfg.origin._origin.font,
      fill: cfg.color,
      textBaseline: "Alphabetic"
    });
  }
  let maxX = 0,
    maxY = 0,
    minX = NaN,
    minY = NaN;
  // 给point注册一个词云的shape
  G2.Shape.registerShape("point", "wordle", {
    drawShape(cfg, container) {
      const attrs = getTextAttrs(cfg);
      const text = container.addShape("text", {
        attrs: _.assign(attrs, {
          x: cfg.x,
          y: cfg.y
        })
      });
      //获取到词云的包围盒
      minX = minX < text.getBBox().minX ? minX : text.getBBox().minX;
      minY = minY < text.getBBox().minY ? minY : text.getBBox().minY;
      maxX = maxX > text.getBBox().maxX ? maxX : text.getBBox().maxX;
      maxY = maxY > text.getBBox().maxY ? maxY : text.getBBox().maxY;
      return text;
    }
  });

  // 给interval注册一个会话框的shape
  var Shape = G2.Shape;
  Shape.registerShape("interval", "bubble", {
    getPoints(cfg) {
      //根据词云的shape 确定对话框的绘制区域
      const padding = parseInt(Math.max(maxY - minY, maxX - minX) / 10); //确定周围留白区域的宽度
      const x = parseInt(maxX + padding);
      const y = parseInt(maxY + 2 * padding); //对话框的小角需要流出更多的距离
      const y0 = parseInt(minY - padding);
      const x0 = parseInt(minX - padding);
      const width = x - x0;
      const height = y - y0;
      return [
        //从右下角出来
        //   { x: x , y: y },
        //   { x: x , y: y0 },
        //   { x: x0, y: y0 },
        //   { x: x0, y: y - 0.1*height },
        //   { x: x - width * 0.1, y: y - 0.1*height },
        //从左下角出来
        { x: x0, y: y },
        { x: x0, y: y0 },
        { x: x, y: y0 },
        { x: x, y: y - 0.1 * height },
        { x: x0 + width * 0.1, y: y - 0.1 * height }
      ];
    },
    draw(cfg, group) {
      // 自定义最终绘制
      const points = cfg.points;
      let path = [];
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point) {
          const action = i === 0 ? "M" : "L";
          path.push([action, point.x, point.y]);
        }
      }
      const first = points[0];
      path.push(["L", first.x, first.y]);
      path.push(["z"]);

      const bubble = group.addShape("path", {
        attrs: {
          path,
          stroke: cfg.color
        }
      });
      console.log(path);
      return bubble;
    }
  });

  G2.Animate.registerAnimation("appear", "floatIn", function(
    shape,
    animateCfg
  ) {
    //获取当前的透明度
    const strokeOpacity = G2.Util.isNil(shape.attr("strokeOpacity"))
      ? 1
      : shape.attr("strokeOpacity");
    const fillOpacity = G2.Util.isNil(shape.attr("fillOpacity"))
      ? 1
      : shape.attr("fillOpacity");
    // 设置初始态
    shape.attr("transform", [["t", 0, 100]]);
    shape.attr("strokeOpacity", 0);
    shape.attr("fillOpacity", 0);
    // console.log(shape);
    const index = shape.get("index");
    let delay = animateCfg.delay;
    if (G2.Util.isFunction(delay)) {
      delay = animateCfg.delay(index);
    }
    let easing = animateCfg.easing;
    if (G2.Util.isFunction(easing)) {
      easing = animateCfg.easing(index);
    }
    // 设置动画目标态
    shape.animate(
      {
        transform: [["t", 0, -100]],
        strokeOpacity,
        fillOpacity
      },
      animateCfg.duration,
      easing,
      animateCfg.callback,
      delay
    );
  });

  // 如果使用图形mask词云 可以使用以下代码定义图形
  // const imageMask = new Image();
  // imageMask.crossOrigin = '';
  // imageMask.src = 'https://zos.alipayobjects.com/rmsportal/EEFqYWuloqIHRnh.jpg';
  // imageMask.onload = () => { // 包围住以下所有代码

  const colorArray = [
    "#FF8247",
    "#5ED5D1",
    "#FF6E97",
    "#E03636",
    "#EDD0BE",
    "#199475",
    "#4cb4e7",
    "#25C6FC"
  ];

  const wordle = chart.view();

  const ds = new DataSet();
  const dv = ds.createView("wordle").source(data);
  dv.transform({
    type: "tag-cloud",
    fields: ["name", "value"],
    font: "Impact",
    // imageMask,
    // size: [ window.innerWidth, window.innerHeight ],
    padding: 10,
    timeInterval: 5000, // max execute time
    rotate: () => {
      return 0; // 0, 90, 270
    },
    text(d) {
      return d.name;
    },
    fontSize(d) {
      const max = dv.max("value");
      const min = dv.min("value");
      let vMap = ((d.value + 100 - min) / (max - min)) * 25;
      if (vMap < 10) {
        vMap = 10;
      }
      return vMap;
    }
  });
  console.log(dv);

  // 定义坐标轴
  wordle.coord().reflect();

  // 定义几何标记
  wordle
    .source(dv)
    .axis(false)
    .tooltip(false);

  wordle
    .point()
    .position("x*y")
    .color("text", colorArray)
    .size("size", function(size) {
      return size;
    })
    .shape("wordle")
    .animate({
      appear: {
        animation: "floatIn",
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        duration: leaveDuration
      }
    })
    .active(false);

  // console.log(minX, minY, maxX, maxY);

  const chatdata = [{ name: "a", value: 1 }];
  const chatbubble = chart.view();
  // 定义坐标轴
  chatbubble.source(chatdata);
  chatbubble.axis(false);

  chatbubble
    .interval()
    .position("name*value")
    .size(300)
    .color("genre")
    .shape("bubble")
    .active(false)
    .tooltip(false)
    .animate({
      appear: {
        animation: "floatIn",
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    });
}
