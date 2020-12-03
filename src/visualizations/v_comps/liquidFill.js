import G2 from "@antv/g2";
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
export default function liquidFill(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const liquidFill = chart;

  // process data.value from string to int
  data.forEach(item => {
    item.value = parseFloat(item.value);
    liquidFill.guide().text({
      top: true,
      position: {
        name: item.name,
        value: 5.3 - 0.6
      },
      content: item.name + "\n" + item.value + "分",
      style: {
        opacity: 1,
        fontSize: baseFontSize * 0.6,
        textAlign: "center"
      }
    });
  });

  liquidFill.legend(false).axis(false);

  liquidFill.source(data, {
    value: {
      min: 4 - 0.6,
      max: 5 - 0.6
    }
  });

  liquidFill
    .interval()
    .position("name*value")
    .color("#F4A460")
    .shape("path", path => ["liquid-fill-gauge", path])
    .style({
      fill: "#F4A460" + "62",
      opacity: 1,
      lineWidth: 90,
      stroke: "#F4A460"
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
