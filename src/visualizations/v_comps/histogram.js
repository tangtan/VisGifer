import VisCompBase from "../visCompBase";

export default class Histogram extends VisCompBase {
  constructor(chart) {
    super(chart);
    this.name = "Histogram";
  }

  create(vConfig) {
    const data = vConfig.data;
    const enterDuration = 1000 * vConfig.enterDuration; // mileseconds
    const leaveDuration = 1000 * vConfig.leaveDuration;
    const baseFontSize = vConfig.fontSize;
    const colorList = vConfig.colors;
    const fontColor = vConfig.fontColor;
    const titleText = vConfig.dataName;
    const chart = this.chart;
    const transformedData = data.map(dataItem => {
      return { name: dataItem.name, value: Number(dataItem.value) };
    });
    chart.data(transformedData);
    chart.axis("name", { title: null, tickLine: null, line: null });

    chart.axis("value", { label: null, title: null, grid: null });
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
}
