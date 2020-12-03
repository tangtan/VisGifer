import G2 from "@antv/g2";
import { randomBytes } from "crypto";
/**
 * 定义可视化动画效果
 * @author yyl
 *
 * @param {Object} chart 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @return
 */
export default function NobelRadialBar(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const NobelRadialBar = chart;
  console.log(data);
  NobelRadialBar.source(data, {
    value: {
      max: 18
    }
  });
  NobelRadialBar.coord("theta", {
    innerRadius: 0.2,
    endAngle: Math.PI
  });

  NobelRadialBar.interval()
    .position("name*value")
    .color("name", "#4c3322-#fdae6b")
    .shape("line")
    .size(baseFontSize * 0.12)
    .select(false)
    .style({
      lineAppendWidth: 10
    })
    .active(false)
    .tooltip(false)
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    }); // 线状柱状图
  NobelRadialBar.point()
    .position("name*value")
    .color("name", "#4c3322-#fdae6b")
    .size(baseFontSize * 0.2)
    .shape("circle");
  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    NobelRadialBar.guide().text({
      position: [obj.name, 0],
      content: obj.name + " ",
      style: {
        textAlign: "right",
        fontSize: baseFontSize * 0.48,
        // fontFamily: 'Optima',
        fill: "#956643",
        fontWeight: "bold"
      }
    });
  }
  NobelRadialBar.guide().text({
    position: ["50%", "50%"],
    content: "Nobel",
    style: {
      textAlign: "center",
      fill: "#4c3322",
      fontSize: baseFontSize * 1.0,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
}
