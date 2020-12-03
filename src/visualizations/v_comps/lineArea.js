export default function lineArea(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  ColorList,
  fontColor,
  titleText
) {
  const salesArea = chart;
  data = transferValue2Number(data);
  console.log(data);

  let maxvalue = 0;
  let minvalue = Infinity;
  for (let i = 0; i < data.length; i++) {
    if (maxvalue < data[i]["value"]) maxvalue = data[i]["value"];
    if (minvalue > data[i]["value"]) minvalue = data[i]["value"];
  }

  salesArea.source(data, {
    value: {
      ticks: [minvalue, minvalue + (maxvalue - minvalue) * 0.5],
      min: minvalue - (maxvalue - minvalue) * 0.3
    }
  });
  salesArea.tooltip(false);
  salesArea.legend(false);
  salesArea.guide().text({
    top: true,
    content: titleText,
    style: {
      fontSize: baseFontSize * 1.2,
      textAlign: "center",
      fontWeight: "bold",
      fill: fontColor
    },
    position: ["50%", "0%"],
    offsetY: -baseFontSize
  });
  salesArea.axis("value", {
    line: {
      stroke: "#eeeeee",
      lineWidth: 0
    },
    label: {
      textStyle: {
        fill: fontColor,
        fontSize: baseFontSize * 1,
        fontWeight: "bold"
      },
      offset: baseFontSize * 0.2
    }
  });
  salesArea.axis("name", {
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
      offset: baseFontSize * 0.8
    },
    tickLine: {
      length: -baseFontSize * 0.2
    }
  });
  salesArea
    .area()
    .position("name*value")
    .color(ColorList)
    .shape("smooth");
  salesArea
    .line()
    .position("name*value")
    .color(ColorList)
    .size(baseFontSize * 0.2)
    .shape("smooth")
    .animate({
      appear: {
        // animation: 'zoomIn',
        duration: enterDuration
      },
      leave: {
        // animation: 'zoomOut',
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    })
    .tooltip(false)
    .active(false);
}

function transferValue2Number(list) {
  let result = list;
  result.forEach((element, i) => {
    element.value = Number(element.value);
  });
  return result;
}
