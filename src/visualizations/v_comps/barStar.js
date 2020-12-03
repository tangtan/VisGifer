import DataSet from "@antv/data-set";
export default function d(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const chocolateInterestWaffle = chart.view({
    start: {
      x: 0.3,
      y: 0.3
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 0.9,
      y: 1
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const info = chart.view();
  let dataNew = [];
  const base = {
    name: "Others",
    value: 12
  };
  dataNew.push(base);
  data.forEach(item => {
    const data1 = {
      name: item.name,
      value: 1
    };
    dataNew.push(data1);
  });
  console.log("dataNew", dataNew);
  var dv = new DataSet.View().source(dataNew).transform({
    type: "waffle",
    rows: 3
  });
  var imageMap = {
    // 'Gourmet': '../static/icon/star.png',
    // 'Cookies': '../static/icon/star.png',
    "Gift Ideas": "../static/icon/star.png",
    Others: "../static/icon/star.png"
  };
  info.guide().text({
    position: ["53.3%", "0%"],
    content: titleText,
    offsetY: -baseFontSize * 0.51,
    style: {
      textAlign: "center",
      fill: "#999999",
      fontSize: baseFontSize * 1.5,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  info.guide().text({
    position: ["53%", "0%"],
    content: titleText,
    offsetY: -baseFontSize * 0.5,
    style: {
      textAlign: "center",
      fill: fontColor,
      fontSize: baseFontSize * 1.5,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    var pos = 30 * i + 23;
    //name
    info.guide().text({
      position: ["-0.8%", pos - 0.4 + "%"],
      content: obj.name + " ",
      style: {
        textAlign: "left",
        fontSize: baseFontSize * 0.9,
        fill: "#999999"
        // fontWeight: 'bold',
      },
      offsetY: baseFontSize * 0.25
    });
    info.guide().text({
      position: ["-1.1%", pos + "%"],
      content: obj.name + " ",
      style: {
        textAlign: "left",
        fontSize: baseFontSize * 0.9,
        fill: fontColor
        // fontWeight: 'bold',
      },
      offsetY: baseFontSize * 0.25
    });

    //value
    info.guide().text({
      position: ["78.4%", pos - 0.6 + "%"],
      content: obj.value + " ",
      style: {
        textAlign: "start",
        fontSize: baseFontSize * 1.3,
        fill: "#999999",
        fontWeight: "bold"
      },
      offsetX: baseFontSize * 2.2,
      offsetY: baseFontSize * 0.25
    });
    info.guide().text({
      position: ["78%", pos + "%"],
      content: obj.value + " ",
      style: {
        textAlign: "start",
        fontSize: baseFontSize * 1.3,
        fill: fontColor,
        fontWeight: "bold"
      },
      offsetX: baseFontSize * 2.2,
      offsetY: baseFontSize * 0.25
    });
  }
  chocolateInterestWaffle.source(dv);
  chocolateInterestWaffle.axis(false);
  chocolateInterestWaffle.tooltip(false);
  chocolateInterestWaffle
    .point()
    .position("x*y")
    .size(baseFontSize * 1.5)
    .color("name", colorList)
    .shape("circle")
    .shape("name", function(name) {
      console.log(name);
      return ["image", imageMap[name]];
    }) // 根据具体的字段指定 shape
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
}
