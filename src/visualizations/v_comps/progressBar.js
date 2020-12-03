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
export default function progressBar(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const shadow = chart.view();
  const progressBar = chart.view();

  let maxvalue = 0;
  let minvalue = Infinity;
  for (let i = 0; i < data.length; i++) {
    if (maxvalue < data[i]["value"]) maxvalue = data[i]["value"];
    if (minvalue > data[i]["value"]) minvalue = data[i]["value"];
  }
  let dataNew = [];
  data.forEach(item => {
    dataNew.push(item);
  });
  console.log(dataNew);

  // 自定义 shape, 支持图片形式的气泡
  G2.Shape.registerShape("interval", "borderRadius", {
    draw: function draw(cfg, container) {
      var points = cfg.points;
      var path = [];
      path.push(["M", points[0].x, points[0].y]);
      path.push(["L", points[1].x, points[1].y]);
      path.push(["L", points[2].x, points[2].y]);
      path.push(["L", points[3].x, points[3].y]);
      path.push("Z");
      path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
      return container.addShape("rect", {
        attrs: {
          x: path[1][1], // 矩形起始点为左上角
          y: path[1][2],
          width: path[2][1] - path[1][1],
          height: path[0][2] - path[1][2],
          fill: cfg.color,
          radius: (path[2][1] - path[1][1]) / 4
        }
      });
    }
  });

  G2.Shape.registerShape("interval", "borderRadiusShadow", {
    draw: function draw(cfg, container) {
      var points = cfg.points;
      var path = [];
      path.push(["M", points[0].x, points[0].y]);
      path.push(["L", points[1].x, points[1].y]);
      path.push(["L", points[2].x, points[2].y]);
      path.push(["L", points[3].x, points[3].y]);
      path.push("Z");
      path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
      return container.addShape("rect", {
        attrs: {
          x: path[1][1] + baseFontSize * 0.25, // 矩形起始点为左上角
          y: path[1][2] - baseFontSize * 0.2,
          width: path[2][1] - path[1][1],
          height: path[0][2] - path[1][2] + baseFontSize * 0.05,
          fill: cfg.color,
          radius: (path[2][1] - path[1][1]) / 4
        }
      });
    }
  });

  shadow.source(dataNew, {
    value: {
      max: maxvalue * 1.37
    }
  }); // enter data
  shadow.axis(false);
  shadow
    .interval()
    .position("name*value")
    .active(false)
    .tooltip(false)
    .shape("borderRadiusShadow")
    .color("#fafafa")
    .size(baseFontSize * 1.8)
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    });

  progressBar.source(dataNew, {
    value: {
      max: maxvalue * 1.37
    }
  }); // enter data
  progressBar.axis("value", false);
  // 定义几何标记
  progressBar.axis("name", {
    label: {
      textStyle: {
        fill: "#ffffff",
        fontSize: baseFontSize * 1
      }
    },
    line: {
      lineWidth: 0,
      stroke: "#a4a3a3"
    },
    tickLine: {
      alignWithLabel: false,
      length: 0
    }
  });
  progressBar.guide().text({
    position: ["50%", "1%"],
    content: "SALES",
    style: {
      fill: "#ffffff",
      textAlign: "center",
      fontSize: baseFontSize * 1.5,
      fontWeight: "bold"
    }
  });
  progressBar
    .interval()
    .position("name*value")
    .label("value", function(value) {
      return {
        // offset: -baseFontSize * 5.5, // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
          textAlign: "center", // 文本对齐方向，可取值为： start center end
          fill: "#ffffff", // 文本的颜色
          fontSize: `${baseFontSize * 1.0}`, // 文本大小
          fontWeight: "bold",
          textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
        }
      };
    })
    .active(false)
    .tooltip(false)
    .shape("borderRadius")
    .color("name*value", (name, value) => {
      console.log(value);
      if (name === "Sales") {
        return "#ffffff00";
      } else if (value == maxvalue) {
        return "#b4b8af";
      } else if (value == minvalue) {
        return "#ffffff";
      }
      return "#cdcdc8";
    })
    .color("name", ["#67e8cd", "#e55681", "#819df7"])
    .size(baseFontSize * 1.8)
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    });
}
