/**
 * 定义可视化动画效果
 * @author aHugh
 * @param {Object} chart 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @param {Array}  colorList 可视化颜色集合
 * @param {String} fontColor 可视化字体颜色
 * @param {String} titleText 可视化标题
 * @return
 */
export default function histogram(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const transformedData = data.map(dataItem => {
    return {
      name: dataItem.name,
      value: Number(dataItem.value)
    };
  });
  chart.data(transformedData);
  chart.axis("name", {
    title: null,
    tickLine: null,
    line: null
  });

  chart.axis("value", {
    label: null,
    title: null,
    grid: null
  });
  chart.legend(false);
  chart.annotation().text({
    content: titleText,
    position: ["20%", "5%"]
  });
  chart.coordinate().transpose();
  chart
    .interval()
    .position("name*value")
    .color(colorList[0])
    .size(baseFontSize)
    .label("value", {
      style: {
        fill: fontColor
      },
      offset: baseFontSize * 0.2
    })
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        duration: leaveDuration
      }
    });
}
