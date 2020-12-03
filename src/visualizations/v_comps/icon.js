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
export default function icon(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const icon = chart;
  data = [data[0]];
  var Shape = G2.Shape;
  Shape.registerShape("point", "icon", {
    drawShape: function drawShape(cfg, container) {
      cfg.points = this.parsePoints(cfg.points);
      return container.addShape("icon", {
        attrs: {
          x: cfg.points[0].x - cfg.size / 2,
          y: cfg.points[0].y - cfg.size,
          width: cfg.size,
          height: cfg.size,
          img: cfg.shape[1]
        }
      });
    }
  });

  // 自定义icon， 放在static文件夹下
  const imageMap = {
    like: "./static/icon/like.png",
    collect: "./static/icon/collect.png",
    heart: "./static/icon/heart.png",
    originalPrice: "./static/icon/originalPrice.png",
    currentPrice: "./static/icon/currentPrice.png"
  };

  // 定义坐标轴
  icon.source(data);

  icon.legend(false).axis(false);
  icon
    .point()
    .position("name*value")
    .size(baseFontSize * 3)
    .shape("name", function(name) {
      return ["image", imageMap[name]];
    })
    .label("value", {
      offset: -30,
      textStyle: {
        fontSize: baseFontSize,
        fontWeight: "bold"
      }
    })
    .active(false)
    .tooltip(false)
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    })
    .active(false);
}
