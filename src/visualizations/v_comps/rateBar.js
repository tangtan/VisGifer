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
export default function rateBar(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const background = chart.view();
  const rateBar = chart.view();

  let dataNew1 = [];
  data.forEach(item => {
    const data1 = {
      name: item.name,
      value: parseFloat(item.value)
    };
    dataNew1.push(data1);
  });
  let title = {
    name: " ",
    value: 5
  };
  dataNew1.push(title);

  let dataNew2 = [];
  data.forEach(item => {
    const data2 = {
      name: item.name,
      value: 5
    };
    dataNew2.push(data2);
  });
  dataNew2.push(title);
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
      console.log(path);
      console.log("x y: ", path[3]);
      console.log("width: ", path[1][1] - path[0][1]);
      console.log("height: ", path[1][2] - path[2][2]);
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

  background.source(dataNew2, {
    value: {
      max: 5,
      min: 0.0
    }
  });
  background.coord().transpose();
  background.axis(false);
  background
    .interval()
    .position("name*value")
    .shape("borderRadius")
    .color("#77748e")
    .color("name", name => {
      if (name == " ") {
        return "#ffffff00";
      } else {
        return "#77748e";
      }
    })
    .size(baseFontSize * 0.85)
    .opacity(1)
    .animate(false)
    .tooltip(false)
    .active(false);

  rateBar.source(dataNew1, {
    value: {
      max: 5,
      min: 0.0
    },
    name: {
      tickCount: 4,
      tickInterval: 500
    }
  });
  rateBar.guide().text({
    position: ["32%", "5%"],
    content: "REVIEWS",
    style: {
      fill: "#ffffff",
      textAlign: "center",
      fontSize: baseFontSize * 1.5,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  rateBar.axis("name", {
    label: {
      textStyle: {
        fill: "#ffffff",
        fontSize: baseFontSize * 0.9
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
  rateBar.axis("value", {
    label: null,
    title: false,
    grid: {
      lineStyle: {
        lineWidth: 0
      }
    }
  });
  rateBar.coord().transpose();
  rateBar
    .interval()
    .position("name*value")
    .shape("borderRadius")
    // .color('type*name', (type, name) => {
    //   var color = void 0;
    //   if (type === 'score') color = '#7e8379	';
    //   if (type === 'bg') color = '#cdcdc8';
    //   return color;
    // })
    .color("#819df7")
    .color("name", name => {
      if (name == " ") {
        return "#ffffff00";
      } else {
        return "#819df7";
      }
    })
    .size(baseFontSize * 0.8)
    .opacity(1)
    .label("name", name => {
      let color = "#ffffff";
      if (name == " ") {
        color += "00";
      }
      return {
        position: "end",
        offset: -10,
        textStyle: {
          fontSize: baseFontSize * 0.8,
          // fontFamily: 'Optima',
          fill: color,
          fontWeight: "bold"
        },
        formatter: (text, item) => {
          if (item.point.type === "bg") {
            return "";
          } else {
            return parseFloat(item.point.value).toFixed(1);
          }
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
