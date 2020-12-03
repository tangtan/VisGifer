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
export default function barLineDot(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const barLineDot = chart;
  let dataNew = [];
  data.forEach(item => {
    const data = {
      name: item.name,
      value: parseFloat(item.value)
    };
    dataNew.push(data);
  });
  console.log(dataNew);
  var Shape = G2.Shape;
  Shape.registerShape("point", "image", {
    drawShape: function drawShape(cfg, container) {
      cfg.points = this.parsePoints(cfg.points);
      var coord = this._coord;
      container.addShape("line", {
        attrs: {
          x1: cfg.points[0].x,
          y1: cfg.points[0].y,
          x2: cfg.points[0].x,
          y2: coord.start.y,
          stroke: fontColor,
          lineWidth: baseFontSize * 0.1,
          lineDash: [4, 2]
        }
      });
      return container.addShape("image", {
        attrs: {
          x: cfg.points[0].x - (baseFontSize * 0.3 * cfg.size) / 2,
          y: cfg.points[0].y - baseFontSize * 0.3 * cfg.size,
          width: baseFontSize * 0.3 * cfg.size,
          height: baseFontSize * 0.3 * cfg.size,
          img: cfg.shape[1]
        }
      });
    }
  });
  var imageMap = {
    West: "../static/icon/west.png",
    Midwest: "../static/icon/midwest.png",
    Northeast: "../static/icon/northeast-2.png",
    Southeast: "../static/icon/southeast.png",
    Southwest: "../static/icon/southwest.png",
    Others: "../static/icon/others.png"
  };
  barLineDot.guide().text({
    position: ["50%", "0%"],
    content: titleText,
    style: {
      fill: fontColor,
      textAlign: "center",
      fontSize: baseFontSize * 1,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    },
    offsetY: -baseFontSize * 2.8
  });
  barLineDot.source(dataNew, {
    value: {
      nice: false,
      max: 50,
      min: 0
    }
  });
  barLineDot.legend(false);
  barLineDot.axis("value", false);
  barLineDot.axis("name", {
    label: {
      offset: baseFontSize * 0.9,
      textStyle: {
        fill: fontColor,
        fontSize: baseFontSize * 0.63,
        textAlign: "center",
        fontWeight: 500
      }
    },
    line: {
      lineWidth: baseFontSize * 0.1, // 设置线的宽度
      stroke: fontColor // 设置线的颜色
    },
    tickLine: {
      alignWithLabel: false,
      length: 0
    }
  });
  barLineDot
    .point()
    .position("name*value")
    .size("value", function(value) {
      return value * 1.2;
    })
    .color("name", colorList)
    .shape("image");
  barLineDot
    .point()
    .position("name*value")
    .size("value", function(value) {
      return value * 1.6;
    })
    .color("name", colorList)
    .shape("circle")
    .label("value", function(value) {
      return {
        offset: -baseFontSize * 0.1,
        textStyle: {
          fontSize: baseFontSize * 0.7, // 文本大小
          fontWeight: 500,
          fill: fontColor
        },
        formatter: (text, item, index) => {
          const point = item.point;
          let percent = point["value"];
          return percent;
        }
      };
    })
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        duration: leaveDuration
      }
    })
    .tooltip(false)
    .active(false);
}
