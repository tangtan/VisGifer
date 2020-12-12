export default class VisCompBase {
  constructor(chart) {
    this.name = "visCompBase";
    this.chart = chart;
  }

  create(vConfig) {
    // Setup visualization
  }

  render() {
    this.chart.render();
  }
}
