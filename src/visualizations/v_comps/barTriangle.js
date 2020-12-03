import G2 from "@antv/g2";

export default function barTriangle(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  var Shape = G2.Shape;
  Shape.registerShape("interval", "triangle", {
    getPoints(cfg) {
      const x = cfg.x;
      const y = cfg.y;
      const y0 = cfg.y0;
      const width = cfg.size;
      return [
        { x: x - width / 2, y: y0 },
        { x: x, y: y },
        { x: x + width / 2, y: y0 }
      ];
    },
    draw(cfg, group) {
      // 自定义最终绘制
      const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
      const polygon = group.addShape("polygon", {
        attrs: {
          points: [
            [points[0].x, points[0].y],
            [points[1].x, points[1].y],
            [points[2].x, points[2].y]
          ],
          fill: cfg.color
        }
      });
      return polygon; // !必须返回 shape
    }
  });

  Shape.registerShape("interval", "triangleShadow", {
    getPoints(cfg) {
      const x = cfg.x + 0.009;
      const y = cfg.y + 0.005;
      const y0 = cfg.y0;
      const width = cfg.size;
      return [
        { x: x - width / 2, y: y0 },
        { x: x, y: y },
        { x: x + width / 2, y: y0 }
      ];
    },
    draw(cfg, group) {
      // 自定义最终绘制
      const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
      const polygon = group.addShape("polygon", {
        attrs: {
          points: [
            [points[0].x, points[0].y],
            [points[1].x, points[1].y],
            [points[2].x, points[2].y]
          ],
          fill: cfg.color
        }
      });
      return polygon; // !必须返回 shape
    }
  });

  const shadow = chart.view();
  const barTriangle = chart.view();

  data = transferValue2Number(data);

  let maxValue = 0;
  let minValue = Infinity;
  for (let i = 0; i < data.length; i++) {
    if (maxValue < data[i]["value"]) maxValue = data[i]["value"];
    if (minValue > data[i]["value"]) minValue = data[i]["value"];
  }
  let dataNew = [];
  data.forEach(item => {
    dataNew.push(item);
  });

  shadow.source(dataNew, {
    value: {
      max: maxValue * 1.27
    }
  }); // enter data
  shadow.axis(false);
  shadow
    .interval()
    .position("name*value")
    .active(false)
    .tooltip(false)
    .shape("triangleShadow")
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
  shadow
    .point()
    .position("name*value")
    .size(11)
    .shape("circle")
    .color("name", "#fafafa")
    .active(false)
    .tooltip(false);

  barTriangle.source(dataNew, {
    value: {
      max: maxValue * 1.27
    }
  }); // enter data
  barTriangle.axis("value", false);
  // 定义几何标记
  barTriangle.axis("name", {
    label: {
      textStyle: {
        fill: fontColor,
        fontSize: baseFontSize * 0.7,
        textAlign: "center",
        fontWeight: 500
      },
      autoRotate: false
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
  barTriangle.guide().text({
    position: ["50%", "-5%"],
    content: titleText,
    style: {
      fill: fontColor,
      textAlign: "center",
      fontSize: baseFontSize * 0.9,
      fontWeight: 500
    }
  });
  barTriangle
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
    .shape("triangle")
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

  barTriangle
    .point()
    .position("name*value")
    .size(8)
    .shape("circle")
    .color("name", colorList)
    .active(false)
    .tooltip(false);
}

function transferValue2Number(list) {
  let result = list;
  result.forEach((element, i) => {
    element.value = Number(element.value);
  });
  return result;
}
