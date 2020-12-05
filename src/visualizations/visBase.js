export default class VisualizationBase {
  constructor() {
    this.name = "visualizationBase";
  }

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
    // Setup visualization
  }
}
