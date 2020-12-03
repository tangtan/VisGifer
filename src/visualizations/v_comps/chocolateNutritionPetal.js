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
export default function chocolateNutritionPetal(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const shadow = chart.view({
    start: {
      x: 0.002,
      y: 0.2
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 1,
      y: 0.996
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const chocolateNutritionPetal = chart.view({
    start: {
      x: 0,
      y: 0.204
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 0.996,
      y: 1
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const title = chart.view();

  // 根据比例，获取两点之间的点
  function getPoint(p0, p1, ratio) {
    return {
      x: (1 - ratio) * p0.x + ratio * p1.x,
      y: (1 - ratio) * p0.y + ratio * p1.y
    };
  }

  var pointRatio = 0.6; // 设置开始变成圆弧的位置 0.7
  // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
  var sliceNumber = 0.005;

  // 自定义 other 的图形，增加两条线
  G2.Shape.registerShape("interval", "platelet", {
    draw: function draw(cfg, container) {
      cfg.points[1].y = cfg.points[1].y - sliceNumber;
      cfg.points[2].y = cfg.points[2].y - sliceNumber;
      var centerPoint = {
        x: cfg.points[3].x,
        y: (cfg.points[2].y + cfg.points[3].y) / 2
      };
      centerPoint = this.parsePoint(centerPoint);
      var points = this.parsePoints(cfg.points);
      var path = [];
      var tmpPoint1 = getPoint(points[0], points[3], pointRatio);
      var tmpPoint2 = getPoint(points[1], points[2], pointRatio);
      path.push(["M", points[0].x, points[0].y]);
      path.push(["L", tmpPoint1.x, tmpPoint1.y]);
      path.push(["Q", points[3].x, points[3].y, centerPoint.x, centerPoint.y]);
      path.push(["Q", points[2].x, points[2].y, tmpPoint2.x, tmpPoint2.y]);
      path.push(["L", points[1].x, points[1].y]);
      path.push(["z"]);
      return container.addShape("path", {
        attrs: {
          fill: cfg.color,
          path: path
        }
      });
    }
  });

  //标题
  title.guide().text({
    position: ["50.3%", "11.8%"],
    content: "Nutrition Facts",
    style: {
      textAlign: "center",
      fill: "#999999",
      fontSize: baseFontSize * 1.5,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  title.guide().text({
    position: ["50%", "12%"],
    content: "Nutrition Facts",
    style: {
      textAlign: "center",
      fill: "#ffffff",
      fontSize: baseFontSize * 1.5,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });

  chocolateNutritionPetal.source(data);
  chocolateNutritionPetal.coord("theta");
  chocolateNutritionPetal
    .intervalStack()
    .position("value")
    .color("name", "#ffd800-#ff7800")
    .shape("platelet")
    .label("name*value", function(name, value) {
      return {
        offset: baseFontSize * 0.5,
        textStyle: {
          fontSize: baseFontSize, // 文本大小
          // fontFamily: 'Optima',
          // fontWeight: 'bold',
          fill: "#ffffff"
        },
        formatter: (text, item, index) => {
          const point = item.point; // 每个弧度对应的点
          let value = point["value"];
          return point["name"] + " : " + point["value"] + "g";
        }
      };
    })
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        duration: leaveDuration
      }
    })
    .tooltip(false)
    .active(false);

  shadow.source(data);
  shadow.coord("theta");
  shadow
    .intervalStack()
    .position("value")
    .color("name", "#999999")
    .shape("platelet")
    .label("name*value", function(name, value) {
      return {
        offset: baseFontSize * 0.5,
        textStyle: {
          fontSize: baseFontSize, // 文本大小
          // fontFamily: 'Optima',
          // fontWeight: 'bold',
          fill: "#999999"
        },
        formatter: (text, item, index) => {
          const point = item.point; // 每个弧度对应的点
          let value = point["value"];
          return point["name"] + " : " + point["value"] + "g";
        }
      };
    })
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        duration: leaveDuration
      }
    })
    .tooltip(false)
    .active(false);
}
