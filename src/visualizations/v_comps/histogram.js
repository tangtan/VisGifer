import VisualizationBase from "../visBase";

export default class Histogram extends VisualizationBase {
  constructor() {
    super();
    this.name = "Histogram";
  }

  static visualization(
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
}
