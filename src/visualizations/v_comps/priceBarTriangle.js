import G2 from "@antv/g2";
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
export default function priceBarTriangle(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const priceBarTriangle = chart;
  data = data[2];
  console.log(data);
  let dataNew = [];
  data.forEach(item => {
    let dataTemp = {
      name: item.name,
      value: parseFloat(parseFloat(item.value).toFixed(2))
    };
    dataNew.push(dataTemp);
  });

  var Shape = G2.Shape;
  Shape.registerShape("interval", "triangle", {
    getPoints(cfg) {
      const x = cfg.x;
      const y = cfg.y;
      const y0 = cfg.y0;
      const width = cfg.size;
      return [
        { x: x - width / 2, y: y0 },
        { x: x, y: y },
        { x: x + width / 2, y: y0 }
      ];
    },
    draw(cfg, group) {
      // 自定义最终绘制
      const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
      const polygon = group.addShape("polygon", {
        attrs: {
          points: [
            [points[0].x, points[0].y],
            [points[1].x, points[1].y],
            [points[2].x, points[2].y]
          ],
          fill: cfg.color
        }
      });
      return polygon; // !必须返回 shape
    }
  });

  priceBarTriangle.source(dataNew);
  priceBarTriangle.axis("name", {
    title: {
      textStyle: {
        fontSize: baseFontSize,
        textAlign: "center",
        fill: "#999"
      }
    },
    line: {
      lineWidth: 0
    },
    label: {
      offset: 5
    }
  });
  priceBarTriangle.axis("value", {
    label: null,
    line: {
      lineWidth: 0
    },
    grid: {
      lineStyle: {
        lineWidth: 1
      }
    }
  });

  priceBarTriangle
    .interval()
    .position("name*value")
    .shape("triangle")
    .color("name*value", (name, value) => {
      let fill = "#286E6E";
      if (name === "currentPrice") {
        fill = "#B84242";
      }
      return fill;
    })
    .label("name*value", function(name, value) {
      if (name === "currentPrice") {
        return {
          offset: baseFontSize * 0.8, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            textAlign: "center", // 文本对齐方向，可取值为： start center end
            fill: "#404040", // 文本的颜色
            fontSize: `${baseFontSize * 0.8}`, // 文本大小
            textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
          },
          formatter: () => {
            return "Current  $" + value + "  !";
          }
        };
      }
    })
    .active(false)
    .tooltip(false)
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        duration: leaveDuration
      }
    });
  priceBarTriangle
    .point()
    .position("name*value")
    .size(4)
    .shape("circle")
    .color("name*value", (name, value) => {
      let fill = "#286E6E";
      if (name === "currentPrice") {
        fill = "#B84242";
      }
      return fill;
    })

    .active(false)
    .tooltip(false);
}
