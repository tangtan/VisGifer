import { off } from "rsvp";

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
export default function donationFilletColumn(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const shadow = chart.view();
  const donationFilletColumn = chart.view();

  let dataNew = [];
  data.forEach(item => {
    const data = {
      name: item.name,
      value: parseInt(item.value)
    };
    dataNew.push(data);
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
      console.log(path);
      return container.addShape("rect", {
        attrs: {
          x: path[1][1] + baseFontSize / 7, // 矩形起始点为左上角
          y: path[1][2],
          width: (path[2][1] - path[1][1]) / 1.25,
          height: path[0][2] - path[1][2],
          fill: cfg.color,
          radius: (path[2][1] - path[1][1]) / 2.5
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
          x: path[1][1] + baseFontSize * 0.4, // 矩形起始点为左上角
          y: path[1][2] - baseFontSize * 0.2,
          width: (path[2][1] - path[1][1]) / 1.55,
          height: path[0][2] - path[1][2],
          fill: cfg.color,
          radius: (path[2][1] - path[1][1]) / 3
        }
      });
    }
  });

  shadow.source(dataNew, {
    value: {
      ticks: [0, 10, 20, 30, 40, 50]
    }
  });
  shadow.axis(false);
  shadow
    .interval()
    .position("name*value")
    .active(false)
    .tooltip(false)
    .shape("borderRadiusShadow")
    .color("#6f6f6f")
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

  donationFilletColumn.source(dataNew, {
    value: {
      ticks: [0, 10, 20, 30, 40, 50]
    }
  });
  donationFilletColumn.axis("name", {
    label: {
      textStyle: {
        fill: "#ffffff",
        fontSize: baseFontSize * 0.5,
        // fontFamily: 'Optima',
        fontWeight: "bold"
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
  donationFilletColumn.axis("value", {
    grid: {
      lineStyle: {
        lineWidth: 0,
        stroke: "#fdf2e2",
        lineDash: [2, 2]
      }
    },
    label: null
  });
  chart.legend(false);
  donationFilletColumn.guide().text({
    position: ["50%", "-5%"],
    content: "Fiscal Year 2018 \nSources of Operating Revenue",
    style: {
      fill: "#ffffff",
      textAlign: "center",
      fontSize: baseFontSize * 0.8,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  donationFilletColumn
    .interval()
    .position("name*value")
    .color("name", "#bd5847-#ECB75F")
    .shape("borderRadius")
    .label("name*value", function(name, value) {
      return {
        offset: baseFontSize * 0.5, // 设置坐标轴文本 label 距离坐标轴线的距离
        textStyle: {
          // fontFamily: 'Optima',
          textAlign: "center", // 文本对齐方向，可取值为： start center end
          fill: "#ffffff", // 文本的颜色
          fontWeight: "bold",
          fontSize: `${baseFontSize * 0.7}`, // 文本大小
          textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
        },
        formatter: (text, item, index) => {
          const point = item.point; // 每个弧度对应的点
          let percent = point["value"];
          percent = percent + "%";
          return percent;
        }
      };
    })
    .opacity(0.6)
    .active(false)
    .tooltip(false)
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        duration: leaveDuration
      }
    });
}
