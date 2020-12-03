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
export default function powerStackRound(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const powerStackRound = chart;
  let _G = G2,
    Shape = _G.Shape,
    Util = _G.Util;

  function getFillAttrs(cfg) {
    var attrs = Util.mix(
      {
        fill: cfg.color,
        fillOpacity: cfg.opacity
      },
      cfg.style
    );
    return attrs;
  }

  function getRectPath(points) {
    var path = [];
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      if (point) {
        var action = i === 0 ? "M" : "L";
        path.push([action, point.x, point.y]);
      }
    }
    var first = points[0];
    path.push(["L", first.x, first.y]);
    path.push(["z"]);
    return path;
  }
  // 左边带圆角
  Shape.registerShape("interval", "left", {
    draw: function draw(cfg, container) {
      var attrs = getFillAttrs(cfg);
      var path = getRectPath(cfg.points);
      path = this.parsePath(path); // 将 0 - 1 的值转换为画布坐标
      var radius = (path[1][2] - path[2][2]) / 2;
      var temp = [];
      temp.push(["M", path[0][1] + radius, path[0][2]]);
      temp.push(["L", path[1][1], path[1][2]]);
      temp.push(["L", path[2][1], path[2][2]]);
      temp.push(["L", path[3][1] + radius, path[3][2]]);
      temp.push([
        "A",
        radius,
        radius,
        180,
        0,
        0,
        path[0][1] + radius,
        path[0][2]
      ]);
      temp.push(["Z"]);
      return container.addShape("path", {
        attrs: Util.mix(attrs, {
          path: temp,
          fill: "#003963"
        })
      });
    }
  });
  // 右边带圆角
  Shape.registerShape("interval", "right", {
    draw: function draw(cfg, container) {
      var attrs = getFillAttrs(cfg);
      var path = getRectPath(cfg.points);
      path = this.parsePath(path);
      var radius = (path[1][2] - path[2][2]) / 2;
      var temp = [];
      temp.push(["M", path[0][1], path[0][2]]);
      temp.push(["L", path[1][1] - radius, path[1][2]]);
      temp.push([
        "A",
        radius,
        radius,
        180,
        1,
        0,
        path[2][1] - radius,
        path[2][2]
      ]);
      temp.push(["L", path[3][1], path[3][2]]);
      temp.push(["Z"]);
      return container.addShape("path", {
        attrs: Util.mix(attrs, {
          path: temp,
          fill: "#591010"
        })
      });
    }
  });

  data.forEach(item => {
    item.value = parseFloat(item.value);
    item.title = "title";
  });

  powerStackRound.guide().text({
    top: true,
    position: {
      title: "title",
      value: 1.5
    },
    content: "Charging-3h",
    style: {
      opacity: 1,
      textAlign: "center",
      fontSize: baseFontSize * 0.6,
      fill: "#ffffff"
    }
  });

  powerStackRound.guide().text({
    top: true,
    position: {
      title: "title",
      value: 3.5
    },
    content: "Using-1h",
    style: {
      opacity: 1,
      textAlign: "center",
      fontSize: baseFontSize * 0.6,
      fill: "#ffffff"
    }
  });

  powerStackRound.guide().text({
    top: true,
    position: ["50%", "10%"],
    content: "Power",
    style: {
      opacity: 1,
      textAlign: "center",
      fontSize: baseFontSize,
      fill: "#ffffff"
    }
  });

  powerStackRound.source(data, {
    sales: {
      max: 4,
      tickInterval: 1
    }
  });
  powerStackRound.legend(false).axis(false);
  powerStackRound.coord().transpose();
  powerStackRound
    .intervalStack()
    .position("title*value")
    .color("name")
    .size(baseFontSize * 2)
    .shape("name", function(val) {
      if (val === "Using") {
        return "right";
      } else if (val === "Charging") {
        return "left";
      }
    })
    .style({
      stroke: "#ffffff",
      lineWidth: 2
    })
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    })
    .active(false);
}
