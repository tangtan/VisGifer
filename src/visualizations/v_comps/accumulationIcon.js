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
export default function accumulationIcon(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const starPath =
    "M512 0c-27.733333 0-53.333333 14.933333-66.133333 42.666667l-96 206.933333c-12.8 25.6-36.266667 44.8-64 49.066667L64 330.666667c-59.733333 10.666667-85.333333 83.2-42.666667 125.866666l166.4 170.666667c19.2 19.2 27.733333 46.933333 23.466667 72.533333L170.666667 936.533333c-6.4 49.066667 29.866667 87.466667 72.533333 87.466667 12.8 0 23.466667-2.133333 36.266667-8.533333l196.266666-108.8c10.666667-6.4 23.466667-8.533333 36.266667-8.533334 12.8 0 25.6 2.133333 36.266667 8.533334l196.266666 108.8c10.666667 6.4 23.466667 8.533333 36.266667 8.533333 42.666667 0 81.066667-38.4 72.533333-87.466667l-38.4-236.8c-4.266667-25.6 4.266667-53.333333 23.466667-72.533333l166.4-170.666667c42.666667-42.666667 17.066667-115.2-42.666667-125.866666L740.266667 298.666667c-27.733333-4.266667-53.333333-23.466667-64-49.066667L578.133333 42.666667C565.333333 14.933333 539.733333 0 512 0z";
  const accumulationIcon = chart;

  // process data.value from string to int
  data.forEach(item => {
    item.value = parseFloat(item.value);
    accumulationIcon.guide().text({
      top: true,
      position: {
        name: item.name,
        value: 5.3 - 0.6
        // value: 0
      },
      content: item.name + "\n" + item.value + "分",
      style: {
        opacity: 1,
        fontSize: baseFontSize * 0.6,
        textAlign: "center"
      }
    });
  });

  accumulationIcon.legend(false).axis(false);

  accumulationIcon.source(data, {
    value: {
      min: 4 - 0.6,
      max: 5 - 0.6
    }
  });

  accumulationIcon
    .interval()
    .position("name*value")
    // .label('value', {
    //   // offset: - baseFontSize / 4,
    //   textStyle: {
    //     textAlign: 'center', // 文本对齐方向，可取值为： start center end
    //     fill: '#404040', // 文本的颜色
    //     fontSize: `${baseFontSize * 0.6}`, // 文本大小
    //     textBaseline: 'bottom', // 文本基准线，可取 top middle bottom，默认为middle
    //   },
    //   formatter: (text, item) => {
    //     return item._origin.name + '\n' + text + '分';
    //   }
    // })
    .opacity(0)
    .color("#F4A460")
    .shape("path", path => ["liquid-fill-mypath", starPath])
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
