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
export default function studentNationHist(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const studentNationHist = chart;
  console.log(data);
  let dataNew = [];
  data.forEach(item => {
    let dataTemp = {
      name: item.name,
      value: parseFloat(parseFloat(item.value).toFixed(2))
    };
    dataNew.push(dataTemp);
  });
  studentNationHist.axis("name", {
    title: {
      textStyle: {
        fontSize: baseFontSize,
        textAlign: "center",
        fill: "#999"
      }
    },
    line: {
      lineWidth: 0
    },
    label: null,
    tickLine: {
      alignWithLabel: false,
      length: 0
    }
  });
  studentNationHist.axis("value", {
    label: null,
    line: {
      lineWidth: 0
    },
    grid: {
      lineStyle: {
        lineWidth: 1
      }
    }
  });

  studentNationHist.source(dataNew);
  studentNationHist
    .interval()
    .position("name*value")
    .color("name", "#ECB75F-#D2691E")
    .label("name*value", function(name, value) {
      return {
        offset: baseFontSize * 0.8, // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
          fontFamily: "Optima",
          textAlign: "center", // 文本对齐方向，可取值为： start center end
          fill: "#7D382C", // 文本的颜色
          fontSize: `${baseFontSize * 0.45}`, // 文本大小
          textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
        },
        formatter: (text, item, index) => {
          const point = item.point; // 每个弧度对应的点
          let percent = point["value"];
          percent = percent + "%";
          // 一个单词换行
          let textNew = "";
          for (let i = 0; i < text.length; i++) {
            if (text[i] == " ") textNew += "\n";
            else textNew += text[i];
          }
          textNew += "\n";
          return textNew + value;
        }
      };
    })
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
