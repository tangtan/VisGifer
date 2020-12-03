import DataSet from "@antv/data-set";
import { assign } from "lodash";
import G2 from "@antv/g2";
import { brotliDecompress } from "zlib";
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
export default function wordCloud(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  // 处理dataset不能接受全个位数的bug
  if (data.constructor == Array) {
    // 如果全是是个位数则全体*10
    let flag = true;
    for (const d of data) {
      if (d.value > 10) {
        flag = false;
        break;
      }
    }
    if (flag) {
      let dataNew = [];
      for (const d of data) {
        const dNew = {
          name: d.name,
          value: d.value * 10
        };
        dataNew.push(dNew);
      }
      data = dataNew;
    }
  } else {
    console.error("Invalid data in wordCloud.js. (not Array)");
  }
  // 词云shape的属性设置函数
  function getTextAttrs(cfg) {
    return assign({}, cfg.style, {
      fillOpacity: cfg.opacity,
      fontSize: cfg.size,
      rotate: cfg.origin._origin.rotate,
      text: cfg.origin._origin.text,
      textAlign: "center",
      // fontFamily: cfg.origin._origin.font,
      fontWeight: "bold",
      fill: cfg.color,
      textBaseline: "Alphabetic"
    });
  }
  // 给point注册一个词云的shape
  G2.Shape.registerShape("point", "wordle", {
    drawShape(cfg, container) {
      const attrs = getTextAttrs(cfg);
      return container.addShape("text", {
        attrs: _.assign(attrs, {
          x: cfg.x,
          y: cfg.y
        })
      });
    }
  });

  // 如果使用图形mask词云 可以使用以下代码定义图形
  // const imageMask = new Image();
  // imageMask.crossOrigin = '';
  // imageMask.src = 'https://zos.alipayobjects.com/rmsportal/EEFqYWuloqIHRnh.jpg';
  // imageMask.onload = () => { // 包围住以下所有代码

  const colorArray = [colorList[0], colorList[1], colorList[2], colorList[3]];

  const wordle = chart;
  const ds = new DataSet();
  const dv = ds.createView("wordle").source(data);
  dv.transform({
    type: "tag-cloud",
    fields: ["name", "value"],
    font: "Impact",
    size: [wordle._attrs.width, wordle._attrs.height * 1.5],
    padding: 12,
    fontWeight: "bold",
    // margin: 15,
    timeInterval: 5000, // max execute time
    rotate: () => {
      return 0; // 0, 90, 270
    },
    text(d) {
      return d.name;
    },
    fontSize(d) {
      if (d.value) {
        const max = dv.max("value");
        const min = dv.min("value");
        let vMap =
          ((d.value - min) / (max - min)) * (1.6 * baseFontSize) + baseFontSize;
        return vMap;
      }
      return 0;
    }
  });

  // 定义坐标轴
  wordle.coord().reflect();
  // 定义几何标记
  wordle
    .source(dv, {
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    })
    .legend(false)
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
        animation: "zoomIn",
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        duration: leaveDuration
      }
    })
    .active(false);
}
