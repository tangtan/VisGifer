export default function barDot(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const barDot = chart;
  let dataNew = [];
  data.forEach(item => {
    const data = {
      name: item.name,
      value: parseFloat(item.value)
    };
    dataNew.push(data);
  });
  console.log(dataNew);
  var Shape = G2.Shape;
  Shape.registerShape("point", "image", {
    drawShape: function drawShape(cfg, container) {
      cfg.points = this.parsePoints(cfg.points);
      var coord = this._coord;
      container.addShape("line", {
        attrs: {
          x1: cfg.points[0].x,
          y1: cfg.points[0].y,
          x2: cfg.points[0].x,
          y2: coord.start.y,
          stroke: colorList[0],
          lineWidth: baseFontSize * 0.1,
          lineDash: [4, 2]
        }
      });
      return container.addShape("image", {
        attrs: {
          x: cfg.points[0].x - (baseFontSize * 0.3 * cfg.size) / 2,
          y: cfg.points[0].y - baseFontSize * 0.3 * cfg.size,
          width: baseFontSize * 0.3 * cfg.size,
          height: baseFontSize * 0.3 * cfg.size,
          img: cfg.shape[1]
        }
      });
    }
  });
  barDot.guide().text({
    position: ["50%", "0%"],
    content: titleText,
    style: {
      fill: fontColor,
      textAlign: "center",
      fontSize: baseFontSize * 1,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    },
    offsetY: -baseFontSize * 2.8
  });
  barDot.source(dataNew, {
    value: {
      nice: false,
      max: 50,
      min: 0
    }
  });
  barDot.legend(false);
  barDot.axis("value", false);
  barDot.axis("name", {
    label: {
      textStyle: {
        fill: fontColor,
        fontSize: baseFontSize * 0.45,
        fontWeight: "bold"
        // fontFamily: 'Optima',
      }
    },
    label: null,
    line: {
      lineWidth: baseFontSize * 0.1, // 设置线的宽度
      stroke: fontColor // 设置线的颜色
    },
    tickLine: null
  });
  barDot
    .point()
    .position("name*value")
    .size("value")
    .color("name", colorList)
    // .shape('name', function(name) {
    //   return ['image', imageMap[name]]; // 根据具体的字段指定 shape
    // })
    .label("value", function(value) {
      return {
        offset: -baseFontSize * 0.4,
        textStyle: {
          fontSize: baseFontSize * 0.7, // 文本大小
          // fontFamily: 'Optima',
          fontWeight: "bold",
          fill: fontColor
        },
        formatter: (text, item, index) => {
          const point = item.point; // 每个弧度对应的点
          let percent = point["value"];
          return " " + percent + "%";
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
