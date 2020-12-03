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
export default function priceLineArc(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const priceLineArc = chart;
  data = data[2];
  console.log(data);
  let dataNew = [];
  data.forEach(item => {
    let dataTemp = {
      name: item.name,
      value: parseFloat(parseFloat(item.value).toFixed(2))
    };
    dataNew.push(dataTemp);
  });
  console.log(dataNew);

  priceLineArc.source(dataNew, {
    count: {
      max: 30
    }
  });
  priceLineArc.coord("theta", {
    innerRadius: 0.2,
    endAngle: Math.PI * 0.125
  });
  priceLineArc
    .interval()
    .position("name*value")
    .color("#8543e0")
    .shape("line")
    .select(false)
    .style({
      lineAppendWidth: 3
    }); // 线状柱状图
  priceLineArc
    .point()
    .position("name*value")
    .color("#8543e0")
    .shape("circle")
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
  for (var i = 0, l = data.length; i < l; i++) {
    var obj = data[i];
    priceLineArc.guide().text({
      position: [obj.name, 0],
      content: obj.name + " ",
      style: {
        textAlign: "right"
      }
    });
  }
  priceLineArc.guide().text({
    position: ["20%", "60%"],
    content: "Price",
    style: {
      textAlign: "center",
      fontSize: 24,
      fill: "#8543e0"
    }
  });
}
