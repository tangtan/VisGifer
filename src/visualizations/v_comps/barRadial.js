// 诺贝尔
export default function barRadial(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const barRadial = chart;
  let dataNew = [];
  data.forEach(item => {
    let dataTemp = {
      name: item.name,
      value: Number(item.value)
    };
    dataNew.push(dataTemp);
  });
  console.log(dataNew);

  let maxValue = 0;
  let minValue = Infinity;
  for (let i = 0; i < dataNew.length; i++) {
    if (maxValue < dataNew[i]["value"]) maxValue = dataNew[i]["value"];
    if (minValue > dataNew[i]["value"]) minValue = dataNew[i]["value"];
  }

  barRadial.source(dataNew, {
    count: {
      max: maxValue * 1.25
    }
  });
  barRadial.coord("theta", {
    innerRadius: 0.2,
    endAngle: Math.PI * 0.8
  });
  barRadial
    .interval()
    .position("name*value")
    .color("name", `${colorList[0]}-${colorList[3]}`)
    .shape("line")
    .size(baseFontSize * 0.12)
    .select(false)
    .style({
      lineAppendWidth: 10
    })
    .active(false)
    .tooltip(false)
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    }); // 线状柱状图
  barRadial
    .point()
    .position("name*value")
    .color("name", `${colorList[0]}-${colorList[3]}`)
    .shape("circle")
    .size(7);
  for (var i = 0, l = data.length; i < l; i++) {
    var obj = data[i];
    barRadial.guide().text({
      position: [obj.name, 0],
      content: obj.name + " ",
      style: {
        textAlign: "right",
        fontSize: baseFontSize * 0.48,
        // fontFamily: 'Optima',
        fill: fontColor,
        fontWeight: "bold"
      }
    });
  }
  barRadial.guide().text({
    position: ["25%", "60%"],
    content: titleText,
    style: {
      textAlign: "center",
      fill: fontColor,
      fontSize: baseFontSize * 1.0,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
}
