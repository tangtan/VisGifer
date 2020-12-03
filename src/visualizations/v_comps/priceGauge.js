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
export default function priceGauge(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const priceGauge = chart;
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
  // 自定义Shape 部分
  Shape.registerShape("point", "pointer", {
    drawShape: function drawShape(cfg, group) {
      var center = this.parsePoint({
        // 获取极坐标系下画布中心点
        x: 0,
        y: 0
      });
      // 绘制指针
      group.addShape("line", {
        attrs: {
          x1: center.x,
          y1: center.y,
          x2: cfg.x,
          y2: cfg.y,
          stroke: cfg.color,
          lineWidth: 5,
          lineCap: "round"
        }
      });
      return group.addShape("circle", {
        attrs: {
          x: center.x,
          y: center.y,
          r: 9.75,
          stroke: cfg.color,
          lineWidth: 4.5,
          fill: "#fff"
        }
      });
    }
  });
  var color = ["#0086FA", "#FFBF00", "#F5222D"];

  priceGauge.source(dataNew);
  priceGauge.axis("name", {
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
    label: null
  });
  priceGauge.axis("value", {
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
  priceGauge
    .line()
    .position("name*value")
    .active(false)
    .tooltip(false)
    .style({
      stroke: "#497878"
    });
  priceGauge
    .point()
    .position("name*value")
    .size(4)
    .shape("circle")
    .style("name*value", (name, value) => {
      let fill = "#286E6E";
      let lineWidth = 1;
      if (name === "currentPrice") {
        fill = "#B84242";
        lineWidth = 1.5;
      }
      return {
        fill: fill,
        stroke: "#ffffff",
        lineWidth: lineWidth
      };
    })
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
          offset: -baseFontSize * 0.8, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            textAlign: "end", // 文本对齐方向，可取值为： start center end
            fill: "#404040", // 文本的颜色
            fontSize: `${baseFontSize}`, // 文本大小
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
    })
    .active(false);
}
