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
export default function salesPunchCard(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const salesPunchCard = chart;

  data.forEach(item => {
    item.title = "sales";
    salesPunchCard.guide().text({
      top: true,
      position: {
        title: "sales",
        name: item.name
      },
      content: item.value,
      style: {
        opacity: 1,
        textAlign: "center",
        fontSize: baseFontSize * 0.7,
        fill: "#ffffff",
        fontWeight: "bold"
      }
    });
  });
  console.log(data);

  salesPunchCard.source(data);
  salesPunchCard.tooltip(false);
  salesPunchCard.legend(false);
  salesPunchCard.axis("title", {
    line: null,
    tickLine: null,
    grid: null,
    label: null
  });
  salesPunchCard.axis("name", {
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
      offsetY: -baseFontSize * 1.2
    },
    tickLine: {
      length: -baseFontSize * 0.2
    }
  });
  salesPunchCard.guide().text({
    top: true,
    content: "Sales",
    style: {
      fontSize: baseFontSize,
      textAlign: "center",
      fontWeight: "bold",
      fill: "#ffffff"
    },
    position: ["50%", "10%"]
  });
  salesPunchCard
    .point()
    .color("#1b5795")
    .position("name*title")
    .size("value", [baseFontSize * 0.6, baseFontSize * 1.35])
    .shape("circle")
    .style({
      fill: "#1b5795",
      opacity: 1,
      lineWidth: 3,
      stroke: "#1b5795"
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
