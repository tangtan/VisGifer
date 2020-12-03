import G2 from "@antv/g2";

export default function barVerticalRect(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const shadow = chart.view();
  const barVerticalRect = chart.view();

  data = transferValue2Number(data);

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
  // console.log(dataNew);

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
      max: maxvalue * 1.27
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

  barVerticalRect.source(dataNew, {
    value: {
      max: maxvalue * 1.27
    }
  }); // enter data
  barVerticalRect.axis("value", false);
  // 定义几何标记
  barVerticalRect.axis("name", {
    label: {
      textStyle: {
        fill: fontColor,
        fontSize: baseFontSize * 0.5,
        textAlign: "center",
        fontWeight: 500
      }
    },
    line: {
      lineWidth: 0,
      stroke: fontColor
    },
    tickLine: {
      alignWithLabel: false,
      length: 0
    }
  });
  barVerticalRect.guide().text({
    position: ["50%", "1%"],
    content: titleText,
    style: {
      fill: fontColor,
      textAlign: "center",
      fontSize: baseFontSize * 0.9,
      fontWeight: 500
    }
  });
  barVerticalRect
    .interval()
    .position("name*value")
    .label("value", function(value) {
      return {
        offset: baseFontSize * 0.8, // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
          textAlign: "center", // 文本对齐方向，可取值为： start center end
          fill: fontColor, // 文本的颜色
          fontSize: `${baseFontSize * 0.8}`, // 文本大小
          fontWeight: 450,
          textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
        }
      };
    })
    .active(false)
    .tooltip(false)
    .shape("borderRadius")
    .color("name", colorList)
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

function transferValue2Number(list) {
  let result = list;
  result.forEach((element, i) => {
    element.value = Number(element.value);
  });
  return result;
}
