import G2 from "@antv/g2";

/**
 * 定义可视化动画效果
 * @author yan1
 * @param {Object} chart 初始图表
 * @param {Array} size 可视化尺寸[x, y]
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @return
 */
export default function studentGenderGuide(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const studentGenderGuide = chart;
  // 处理数据
  let dataNew = [];
  let color = ["#fdbe85", "#e6550d"];
  data.forEach(item => {
    let dataTemp1 = {
      name: parseInt(item.name),
      key: "female",
      value: parseFloat(item.value),
      range: [parseFloat(item.value), 100 - parseFloat(item.value)]
    };
    let dataTemp2 = {
      name: parseInt(item.name),
      key: "male",
      value: 100 - parseFloat(item.value),
      range: [parseFloat(item.value), 100 - parseFloat(item.value)]
    };
    dataNew.push(dataTemp1);
    dataNew.push(dataTemp2);
  });
  studentGenderGuide.source(dataNew, {
    value: {
      min: 46,
      max: 54
    },
    range: {
      min: 46,
      max: 54
    }
  });
  studentGenderGuide.axis("value", {
    label: null,
    grid: {
      lineStyle: {
        lineWidth: baseFontSize * 0.03,
        stroke: "#a4a3a3"
      }
    }
  });
  studentGenderGuide.axis("range", false);
  studentGenderGuide.axis("name", {
    label: {
      textStyle: {
        fill: "#595959",
        fontSize: baseFontSize * 0.43,
        fontFamily: "Optima"
      }
    }
  });
  studentGenderGuide.tooltip(false);
  studentGenderGuide
    .line()
    .position("name*value")
    .color("key", color)
    .size(2.5)
    .shape("smooth");
  studentGenderGuide
    .area()
    .position("name*range")
    .color("#ffffff")
    .shape("smooth");
  studentGenderGuide.guide().regionFilter({
    top: true,
    start: [2014, "max"],
    end: [2014.6, "min"],
    color: color[0],
    apply: ["area"]
  });
  studentGenderGuide.guide().regionFilter({
    top: true,
    start: [2014.6, "min"],
    end: [2015.57, "max"],
    color: color[1],
    apply: ["area"]
  });
  studentGenderGuide.guide().regionFilter({
    top: true,
    start: [2015.57, "max"],
    end: [2016.27, "min"],
    color: color[0],
    apply: ["area"]
  });
  studentGenderGuide.guide().regionFilter({
    top: true,
    start: [2016.27, "max"],
    end: [2018, "min"],
    color: color[1],
    apply: ["area"]
  });
  //title
  studentGenderGuide.guide().text({
    position: ["40%", "5%"],
    content: "Gender Rate",
    style: {
      fill: "#7f2704",
      textAlign: "center",
      fontSize: baseFontSize * 0.7,
      fontFamily: "Optima"
    }
  });
  //male的注释
  studentGenderGuide.guide().text({
    position: ["75%", "80%"],
    content: "Male",
    style: {
      fill: "#ffffff",
      textAlign: "center",
      fontSize: baseFontSize * 0.45,
      fontFamily: "Optima"
    }
  });
  studentGenderGuide.guide().text({
    position: ["75%", "22%"],
    content: "Female",
    style: {
      fill: "#ffffff",
      textAlign: "center",
      fontSize: baseFontSize * 0.45,
      fontFamily: "Optima"
    }
  });
}
