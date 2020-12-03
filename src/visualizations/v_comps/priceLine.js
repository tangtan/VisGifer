/**
 * 定义可视化动画效果
 * @author aHugh
 * @param {Object} priceLine 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @return
 */
export default function priceLine(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const priceLine = chart;
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
  console.log(dataNew);
  priceLine.source(dataNew, {
    value: {
      max: dataNew[2].value * 1.2,
      min: dataNew[2].value * 0.95
    }
  });
  priceLine.axis("name", {
    title: null,
    line: {
      lineWidth: 1
    },
    label: {
      textStyle: {
        // fontFamily: 'Optima',
        fill: "#ffffff", // 文本的颜色
        fontSize: `${baseFontSize * 0.8}` // 文本大小
      }
    }
  });
  priceLine.axis("value", {
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
  priceLine
    .line()
    .position("name*value")
    .active(false)
    .tooltip(false)
    .shape("smooth")
    .size(baseFontSize * 0.15)
    .style({
      stroke: "#738cd9"
    });
  priceLine
    .point()
    .position("name*value")
    .size("name", name => {
      if (name == "Mar.") return baseFontSize * 0.4;
      else return baseFontSize * 0.2;
    })
    .shape("name", name => {
      if (name != "Mar.") return "circle";
      else return "triangle";
    })
    // .style('name*value', (name, value) => {
    //   let lineWidth = 500;
    //   if (name === 'Mar.') {
    //     lineWidth = 10;
    //     // stroke = 1;
    //   }
    //   return {
    //     stroke: 'solid',
    //     lineWidth: lineWidth
    //   }
    // })
    .color("name*value", (name, value) => {
      let fill = "#738cd9";
      let stroke = 1;
      if (name === "Mar.") {
        fill = "#fd5967";
      }
      return fill;
    })
    .label("name*value", function(name, value) {
      if (name === "Mar.") {
        return {
          offset: -baseFontSize * 0.7, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            // fontFamily: 'Optima',
            textAlign: "end", // 文本对齐方向，可取值为： start center end
            fill: "#fd5967", // 文本的颜色
            fontSize: `${baseFontSize * 1.2}`, // 文本大小
            textBaseline: "middle", // 文本基准线，可取 top middle bottom，默认为middle
            fontWeight: "bold"
          },
          formatter: () => {
            return "Current  Price $" + value + "  ";
          }
        };
      } else {
        return {
          offset: baseFontSize * 0.7, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            // fontFamily: 'Optima',
            textAlign: "end", // 文本对齐方向，可取值为： start center end
            fill: "#ffffff", // 文本的颜色
            fontSize: `${baseFontSize * 1.0}`, // 文本大小
            textBaseline: "middle", // 文本基准线，可取 top middle bottom，默认为middle
            fontWeight: "bold"
          },
          formatter: () => {
            return "$" + value;
          }
        };
      }
    })
    .active(false)
    .tooltip(false)
    .animate({
      appear: {
        animation: "clipIn",
        duration: enterDuration
      },
      leave: {
        duration: leaveDuration
      }
    })
    .active(false);
}
