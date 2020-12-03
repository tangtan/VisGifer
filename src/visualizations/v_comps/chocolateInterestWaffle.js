import { off } from "rsvp";
import DataSet from "@antv/data-set";
import { assign } from "lodash";
import G2 from "@antv/g2";
/**
 * 定义可视化动画效果
 * @author aHugh
 * @param {Object} chocolateInterestWaffle 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @return
 */
export default function chocolateInterestWaffle(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
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
  console.log(dataNew);
  var dv = new DataSet.View().source(dataNew).transform({
    type: "waffle",
    rows: 3
  });
  var imageMap = {
    Gourmet: "../static/icon/4.8.png",
    Cookies: "../static/icon/4.5.png",
    "Gift Ideas": "../static/icon/4.2.png",
    Others: "../static/icon/star.png"
  };
  info.guide().text({
    position: ["53.3%", "0%"],
    content: "Customer Interests",
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
    content: "Customer Interests",
    offsetY: -baseFontSize * 0.5,
    style: {
      textAlign: "center",
      fill: "#ffffff",
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
      position: ["0.3%", pos - 0.4 + "%"],
      content: obj.name + " ",
      style: {
        textAlign: "left",
        fontSize: baseFontSize * 1.2,
        fill: "#999999"
        // fontWeight: 'bold',
      },
      offsetY: baseFontSize * 0.25
    });
    info.guide().text({
      position: ["0%", pos + "%"],
      content: obj.name + " ",
      style: {
        textAlign: "left",
        fontSize: baseFontSize * 1.2,
        fill: "#ffffff"
        // fontWeight: 'bold',
      },
      offsetY: baseFontSize * 0.25
    });

    //value
    info.guide().text({
      position: ["90.4%", pos - 0.6 + "%"],
      content: obj.value + " ",
      style: {
        textAlign: "right",
        fontSize: baseFontSize * 1.3,
        fill: "#999999",
        fontWeight: "bold"
      },
      offsetX: baseFontSize * 2.2,
      offsetY: baseFontSize * 0.25
    });
    info.guide().text({
      position: ["90%", pos + "%"],
      content: obj.value + " ",
      style: {
        textAlign: "right",
        fontSize: baseFontSize * 1.3,
        fill: "#ffffff",
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
    .color("name", "#ffba01")
    .shape("circle")
    .shape("name", function(name) {
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
