export default function dotSize(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const dotSize = chart;

  data.forEach(item => {
    item.title = "sales";
    dotSize.guide().text({
      top: true,
      position: {
        title: titleText,
        name: item.name
      },
      content: item.value,
      style: {
        opacity: 1,
        textAlign: "center",
        fontSize: baseFontSize * 0.7,
        fill: fontColor,
        fontWeight: "bold"
      }
    });
  });
  console.log(data);

  dotSize.source(data);
  dotSize.tooltip(false);
  dotSize.legend(false);
  dotSize.axis("title", {
    line: null,
    tickLine: null,
    grid: null,
    label: null
  });
  dotSize.axis("name", {
    line: {
      stroke: "#eeeeee",
      lineWidth: 1
    },
    label: {
      textStyle: {
        fill: fontColor,
        fontSize: baseFontSize * 1,
        fontWeight: "bold"
      },
      offsetY: -baseFontSize * 1.2
    },
    tickLine: {
      length: -baseFontSize * 0.2
    }
  });
  dotSize.guide().text({
    top: true,
    content: "Sales",
    style: {
      fontSize: baseFontSize,
      textAlign: "center",
      fontWeight: "bold",
      fill: fontColor
    },
    position: ["50%", "10%"]
  });
  dotSize
    .point()
    .color(colorList[0])
    .position("name*title")
    .size("value", [baseFontSize * 0.6, baseFontSize * 1.35])
    .shape("circle")
    .style({
      fill: colorList[0],
      opacity: 1,
      lineWidth: 3,
      stroke: colorList[0]
    })
    .animate({
      appear: {
        animation: "zoomIn",
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    })
    .tooltip(false)
    .active(false);
}
