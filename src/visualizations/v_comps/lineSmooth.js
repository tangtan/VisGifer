export default function lineSmooth(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const lineSmooth = chart;
  let dataNew = [];
  data.forEach(item => {
    let dataTemp = {
      name: item.name,
      value: parseFloat(parseFloat(item.value).toFixed(2))
    };
    dataNew.push(dataTemp);
  });

  let maxValue = 0;
  let minValue = Infinity;
  for (let i = 0; i < data.length; i++) {
    if (maxValue < dataNew[i]["value"]) maxValue = dataNew[i]["value"];
    if (minValue > dataNew[i]["value"]) minValue = dataNew[i]["value"];
  }

  lineSmooth.source(dataNew, {
    value: {
      max: maxValue * 1.05,
      min: minValue * 0.97
    }
  });
  lineSmooth.guide().text({
    position: ["50%", "3%"],
    content: titleText,
    style: {
      fill: fontColor,
      textAlign: "center",
      fontSize: baseFontSize * 1,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  lineSmooth.axis("name", {
    title: null,
    line: {
      lineWidth: 1
    },
    label: {
      textStyle: {
        // fontFamily: 'Optima',
        fill: fontColor, // 文本的颜色
        fontSize: `${baseFontSize * 0.8}` // 文本大小
      },
      offset: baseFontSize * 0.7
    }
  });
  lineSmooth.axis("value", {
    label: null,
    line: {
      lineWidth: 0
    },
    // grid: {
    //   lineStyle: {
    //     lineWidth: 1
    //   }
    // }
    grid: null
  });
  lineSmooth
    .line()
    .position("name*value")
    .active(false)
    .tooltip(false)
    .shape("smooth")
    .size(baseFontSize * 0.15)
    .style({
      stroke: colorList[2]
    });
  lineSmooth
    .point()
    .position("name*value")
    .size("name", name => {
      if (name === dataNew[dataNew.length - 1].name) return baseFontSize * 0.4;
      else return baseFontSize * 0.2;
    })
    .shape("name", name => {
      if (name !== dataNew[dataNew.length - 1].name) return "circle";
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
      let fill = colorList[1];
      let stroke = 1;
      if (name === dataNew[dataNew.length - 1].name) {
        fill = colorList[0];
      }
      return fill;
    })
    .label("name*value", function(name, value) {
      if (name === dataNew[dataNew.length - 1].name) {
        return {
          offset: baseFontSize * 1.3, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            // fontFamily: 'Optima',
            textAlign: "center", // 文本对齐方向，可取值为： start center end
            fill: colorList[0], // 文本的颜色
            fontSize: `${baseFontSize * 1.2}`, // 文本大小
            textBaseline: "top", // 文本基准线，可取 top middle bottom，默认为middle
            fontWeight: "bold"
          },
          formatter: () => {
            return value + "  ";
          }
        };
      } else {
        return {
          offset: baseFontSize * 0.7, // 设置坐标轴文本 label 距离坐标轴线的距离
          textStyle: {
            // fontFamily: 'Optima',
            textAlign: "center", // 文本对齐方向，可取值为： start center end
            fill: fontColor, // 文本的颜色
            fontSize: `${baseFontSize * 1.0}`, // 文本大小
            textBaseline: "middle", // 文本基准线，可取 top middle bottom，默认为middle
            fontWeight: "bold"
          },
          formatter: () => {
            return value;
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
