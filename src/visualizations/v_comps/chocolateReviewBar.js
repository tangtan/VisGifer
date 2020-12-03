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
export default function chocolateReviewBar(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const background = chart.view({
    start: {
      x: 0.2,
      y: 0
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 0.8,
      y: 1
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const chocolateReviewBar = chart.view({
    start: {
      x: 0.2,
      y: 0
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 0.8,
      y: 1
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const shadow = chart.view({
    start: {
      x: 0.004,
      y: 0
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 1,
      y: 0.996
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const title = chart.view({
    start: {
      x: 0,
      y: 0.004
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 0.996,
      y: 1
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });

  let dataNew = [];
  data.forEach(item => {
    const data2 = {
      name: item.name,
      value: 90
    };
    dataNew.push(data2);
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
          radius: (path[1][2] - path[2][2]) / 6
        }
      });
    }
  });

  background.source(dataNew, {
    value: {
      max: 85,
      min: 0.0
    }
  });
  background.coord().transpose();
  background.axis(false);
  background
    .interval()
    .position("name*value")
    .shape("borderRadius")
    .color("#ffffff99")
    .size(baseFontSize)
    .animate(false)
    .tooltip(false)
    .active(false);

  chocolateReviewBar.source(data, {
    value: {
      max: 85,
      min: 0.0
    }
  });
  chocolateReviewBar.axis(false);
  chocolateReviewBar.coord().transpose();
  chocolateReviewBar
    .interval()
    .position("name*value")
    .shape("borderRadius")
    .color("#ffd800")
    .size(baseFontSize)
    .opacity(1)
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

  let view = [title, shadow];
  view.forEach(v => {
    // for(let i in view_) {
    //标题
    let color = "#ffffff";
    if (v == shadow) color = "#999999";
    v.guide().text({
      position: ["0%", "0%"],
      content: "Customer Reviews",
      style: {
        fill: color,
        textAlign: "left",
        fontSize: baseFontSize * 1.6,
        fontWeight: "bold"
      },
      offsetY: -baseFontSize * 0.7
    });
    //其他信息
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      var pos = 90 - 20 * i;
      //name
      v.guide().text({
        position: ["0%", pos + "%"],
        content: obj.name + " star",
        style: {
          textAlign: "left",
          fontSize: baseFontSize * 1.2,
          fill: color
          // fontWeight: 'bold',
        }
      });
      //value
      v.guide().text({
        position: ["65%", pos + "%"],
        content: obj.value + " %",
        style: {
          textAlign: "left",
          fontSize: baseFontSize * 1.2,
          fill: color,
          fontWeight: "bold"
        },
        offsetX: baseFontSize * 1.8
      });
    }
  });
}
