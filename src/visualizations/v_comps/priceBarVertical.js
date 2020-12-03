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
export default function priceBarVertical(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const priceBarVertical = chart;
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
  priceBarVertical.axis("name", {
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
  priceBarVertical.axis("value", {
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

  priceBarVertical.source(dataNew);
  priceBarVertical
    .interval()
    .position("name*value")
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
  priceBarVertical
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
