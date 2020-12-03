/**
 * 定义可视化动画效果
 * @author aHugh
 * @param {Object} studentNumScrollBar 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @return
 */
export default function studentNumScrollBar(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const studentNumScrollBar = chart;
  let dataNew = [];
  data.forEach(item => {
    let v = item.value.split(" ");
    let dataTemp1 = {
      name: item.name.slice(0, 4),
      StudentNum: "college",
      value: parseInt(v[0])
    };
    let dataTemp2 = {
      name: item.name.slice(0, 4),
      StudentNum: "graduate",
      value: parseInt(v[1]) - parseInt(v[0])
    };
    // console.log(dataTemp);
    dataNew.push(dataTemp1);
    dataNew.push(dataTemp2);
  });
  console.log(dataNew);
  studentNumScrollBar.source(dataNew, {
    value: {
      max: 20000,
      min: 0.0
    }
  });
  studentNumScrollBar.coord("polar", {
    radius: baseFontSize * 2.5
  });
  studentNumScrollBar.axis("value", {
    label: null,
    title: null
  });
  studentNumScrollBar.axis("name", {
    label: {
      textStyle: {
        fill: "#ffffff",
        fontSize: baseFontSize * 0.4,
        fontFamily: "Optima"
      }
    }
  });
  studentNumScrollBar
    .intervalStack()
    .position("name*value")
    .color("StudentNum", "#a6bddb-#1c9099")
    .style({
      lineWidth: 1,
      stroke: "#fff"
    })
    .tooltip(false)
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        duration: leaveDuration
      }
    })
    .active(false);
  studentNumScrollBar.legend({
    title: {
      fontSize: baseFontSize * 0.5
    },
    marker: "square",
    position: "right",
    offsetX: -25
  });
  console.log(studentNumScrollBar.legend());
}
