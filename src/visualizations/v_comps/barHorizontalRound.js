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
export default function barHorizontalRound(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const barHorizontalRound = chart.view();

  let dataNew1 = [];
  data.forEach(item => {
    const data1 = {
      name: item.name,
      value: Number(item.value)
    };
    dataNew1.push(data1);
  });

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
          x: path[3][1], // 矩形起始点为左上角
          y: path[3][2],
          width: path[1][1] - path[0][1],
          height: path[1][2] - path[2][2],
          fill: cfg.color,
          radius: (path[1][2] - path[2][2]) / 2
        }
      });
    }
  });

  let maxValue = 0;
  let minValue = Infinity;
  for (let i = 0; i < data.length; i++) {
    if (maxValue < dataNew1[i]["value"]) maxValue = dataNew1[i]["value"];
    if (minValue > dataNew1[i]["value"]) minValue = dataNew1[i]["value"];
  }

  barHorizontalRound.source(dataNew1, {
    value: {
      max: maxValue * 1.2,
      min: 0
    },
    name: {
      tickCount: 4,
      tickInterval: 500
    }
  });
  barHorizontalRound.guide().text({
    position: ["26%", "-10%"],
    content: titleText,
    style: {
      fill: fontColor,
      textAlign: "center",
      fontSize: baseFontSize * 0.9,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  barHorizontalRound.axis("name", {
    label: {
      textStyle: {
        fill: fontColor,
        fontSize: baseFontSize * 0.8
        // fontFamily: 'Optima',
      }
    },
    tickLine: {
      alignWithLabel: false,
      length: 0
    },
    line: {
      lineWidth: 0
    }
  });
  barHorizontalRound.axis("value", {
    label: null,
    title: false,
    grid: {
      lineStyle: {
        lineWidth: 0
      }
    }
  });
  barHorizontalRound.coord().transpose();
  barHorizontalRound
    .interval()
    .position("name*value")
    .shape("borderRadius")
    .color(colorList)
    .size(baseFontSize * 0.7)
    .opacity(1)
    .label("name", name => {
      return {
        position: "end",
        offset: baseFontSize * 0.1,
        textStyle: {
          textAlign: "start",
          fontSize: baseFontSize * 0.7,
          // fontFamily: 'Optima',
          fill: fontColor,
          fontWeight: "bold"
        },
        formatter: (text, item) => {
          return item.point.value;
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
