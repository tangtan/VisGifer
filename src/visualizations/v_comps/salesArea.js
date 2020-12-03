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
export default function salesArea(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const salesArea = chart;
  console.log(data);

  salesArea.source(data, {
    value: {
      ticks: [135, 170],
      min: 100
    }
  });
  salesArea.tooltip(false);
  salesArea.legend(false);
  salesArea.guide().text({
    top: true,
    content: "Sales",
    style: {
      fontSize: baseFontSize * 1.2,
      textAlign: "center",
      fontWeight: "bold",
      fill: "#ffffff"
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
        fill: "#ffffff",
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
        fill: "#ffffff",
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
    .color("#1b5795")
    .shape("smooth");
  salesArea
    .line()
    .position("name*value")
    .color("#1b5795")
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
