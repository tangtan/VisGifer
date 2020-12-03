import G2 from "@antv/g2";
/**
 * 定义可视化动画效果
 * @author aHugh
 * @param {Object} chart 初始图表
 * @param {Object} data 图表数据
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @return
 */
export default function numberIncreasing(
  chart,
  data,
  enterDuration,
  leaveDuration
) {
  const numberIncreasing = chart;

  // 定义坐标轴
  numberIncreasing.coord().transpose();
  numberIncreasing.axis(false);

  // 定义几何标记
  numberIncreasing
    .intervalStack()
    .position("x*y")
    .label("value", {
      offset: -10, // 设置坐标轴文本 label 距离坐标轴线的距离
      textStyle: {
        textAlign: "end", // 文本对齐方向，可取值为： start middle end
        fill: "#404040", // 文本的颜色
        fontSize: "22", // 文本大小
        fontWeight: "bold", // 文本粗细
        textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
      },
      formatter: (text, item, index) => {
        return "热销" + text + "件";
      }
    })
    .active(false)
    .tooltip(false)
    .opacity(0);
  numberIncreasing.source(data); // enter data
  const i = setInterval(() => {
    numberIncreasing.changeData(dataIncreasing());
  }, 100);

  let increasingData = 0;
  function dataIncreasing() {
    let data_ = [];
    if (increasingData < data[0].value) {
      increasingData = increasingData + 500;
    } else {
      increasingData = data[0].value;
      clearInterval(i);
    }
    data_.push({
      name: "销量",
      value: increasingData
    });
    return data_;
  }
}
