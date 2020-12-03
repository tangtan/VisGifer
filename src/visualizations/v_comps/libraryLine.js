/**
 * 定义可视化动画效果
 * @author aHugh
 * @param {Object} libraryLine 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @return
 */
export default function libraryLine(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const libraryLine = chart;
  let dataNew = [];
  data.forEach(item => {
    let dataTemp = {
      name: parseInt(item.name),
      value: item.value
    };
    dataNew.push(dataTemp);
  });
  console.log(dataNew);
  libraryLine.source(dataNew);
  libraryLine.axis("name", {
    title: null,
    line: {
      lineWidth: 0
    },
    tickLine: {
      length: 6,
      lineWidth: 0,
      stroke: "#bfbfbf"
    },
    label: null
  });
  libraryLine.axis("value", {
    label: null,
    line: {
      lineWidth: 0
    },
    grid: {
      lineStyle: {
        lineWidth: 0,
        stroke: "#a4a3a3"
      }
    }
  });
  let color = ["#733101", "#b34b00", "#eb6300", "#945f58"];
  libraryLine.guide().text({
    position: ["30%", "0%"],
    content: "Library History",
    style: {
      fill: "#000",
      textAlign: "center",
      fontSize: baseFontSize * 1,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  libraryLine
    .point()
    .size(0)
    .position("name*value")
    .active(false)
    .tooltip(false)
    .style({
      stroke: "#e19a34"
    });
  libraryLine.guide().dataMarker({
    position: ["1638", 200],
    content: "1638\n400 books",
    style: {
      text: {
        textAlign: "center",
        stroke: "#fff",
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
    fill: "#497878",
    lineLength: baseFontSize * 0.5, //可选，line长度，default为30
    direction: "upwaard" //可选，朝向，默认为 upwaard
  });
  libraryLine.guide().dataMarker({
    position: ["1764", 404],
    content: "1764\nAll burned",
    style: {
      text: {
        textAlign: "center",
        stroke: "#fff",
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
  libraryLine.guide().dataMarker({
    position: ["2019", 50000],
    content: "Now \n15,000,000+",
    style: {
      text: {
        textAlign: "center",
        stroke: "#fff",
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
