export default function dotHeight(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const dotHeight = chart;
  let dataNew = [];
  data.forEach(item => {
    let dataTemp = {
      name: parseInt(item.name),
      value: item.value
    };
    dataNew.push(dataTemp);
  });

  dotHeight.source(dataNew);
  dotHeight.axis("name", {
    title: null,
    line: {
      lineWidth: 0
    },
    tickLine: {
      length: 6,
      lineWidth: 0,
      stroke: fontColor
    },
    label: null
  });
  dotHeight.axis("value", {
    label: null,
    line: {
      lineWidth: 0
    },
    grid: {
      lineStyle: {
        lineWidth: 0,
        stroke: fontColor
      }
    }
  });
  let color = colorList;
  dotHeight.guide().text({
    position: ["30%", "0%"],
    content: titleText,
    style: {
      fill: fontColor,
      textAlign: "center",
      fontSize: baseFontSize * 1.2,
      fontWeight: "bold"
    }
  });
  dotHeight
    .point()
    .size(0)
    .position("name*value")
    .color("name", colorList)
    .active(false)
    .tooltip(false)
    .style({
      stroke: fontColor
    });
  dotHeight.guide().dataMarker({
    position: ["1638", 200],
    content: "1638\n400 books",
    style: {
      text: {
        textAlign: "center",
        stroke: fontColor,
        lineWidth: 2,
        fontSize: baseFontSize * 0.6,
        fill: color[0],
        fontWeight: "bold"
        // fontFamily: 'Optima',
      },
      point: {
        stroke: color[0],
        r: 6,
        lineWidth: 6
      }
    },
    fill: colorList[0],
    lineLength: baseFontSize * 0.5, //可选，line长度，default为30
    direction: "upwaard" //可选，朝向，默认为 upwaard
  });
  dotHeight.guide().dataMarker({
    position: ["1764", 404],
    content: "1764\nAll burned",
    style: {
      text: {
        textAlign: "center",
        stroke: fontColor,
        lineWidth: 2,
        fontSize: baseFontSize * 0.6,
        fill: color[1],
        fontWeight: "bold"
        // fontFamily: 'Optima',
      },
      point: {
        stroke: color[1],
        r: 6,
        lineWidth: 6
      }
    },
    lineLength: baseFontSize * 2, //可选，line长度，default为30
    direction: "downward" //可选，朝向，默认为upwaard
  });
  dotHeight.guide().dataMarker({
    position: ["2019", 50000],
    content: "Now \n15,000,000+",
    style: {
      text: {
        textAlign: "center",
        stroke: fontColor,
        lineWidth: 2,
        fontSize: baseFontSize * 0.8,
        fill: color[2],
        fontWeight: "bold"
        // fontFamily: 'Optima',
      },
      point: {
        stroke: color[2],
        r: 12,
        lineWidth: 6
      }
    },
    lineLength: baseFontSize * 0.5, //可选，line长度，default为30
    direction: "downward" //可选，朝向，默认为upwaard
  });
}
