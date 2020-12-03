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
export default function revGauge(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const revGauge = chart;
  let dataNew = [];
  data.forEach(item => {
    const data = {
      name: item.name,
      value: parseFloat(item.value / 2500)
    };
    dataNew.push(data);
  });
  console.log(dataNew);
  var Shape = G2.Shape;
  Shape.registerShape("point", "pointer", {
    drawShape: function drawShape(cfg, group) {
      var point = cfg.points[0];
      var center = this.parsePoint({
        x: 0,
        y: 0
      });
      var target = this.parsePoint({
        x: point.x,
        y: baseFontSize * 0.03
      });
      var dir_vec = {
        x: center.x - target.x,
        y: center.y - target.y
      };
      //normalize
      var length = Math.sqrt(dir_vec.x * dir_vec.x + dir_vec.y * dir_vec.y);
      dir_vec.x *= 1 / length;
      dir_vec.y *= 1 / length;
      //rotate dir_vector by -90 and scale
      var angle1 = -Math.PI / 2;
      var x_1 = Math.cos(angle1) * dir_vec.x - Math.sin(angle1) * dir_vec.y;
      var y_1 = Math.sin(angle1) * dir_vec.x + Math.cos(angle1) * dir_vec.y;
      //rotate dir_vector by 90 and scale
      var angle2 = Math.PI / 2;
      var x_2 = Math.cos(angle2) * dir_vec.x - Math.sin(angle2) * dir_vec.y;
      var y_2 = Math.sin(angle2) * dir_vec.x + Math.cos(angle2) * dir_vec.y;
      //polygon vertex
      var path = [
        ["M", target.x + x_1 * 1, target.y + y_1 * 1],
        ["L", center.x + x_1 * 3, center.y + y_1 * 3],
        ["L", center.x + x_2 * 3, center.y + y_2 * 3],
        ["L", target.x + x_2 * 1, target.y + y_2 * 1],
        ["Z"]
      ];
      var tick = group.addShape("path", {
        attrs: {
          path: path,
          fill: cfg.color
        }
      });
      return tick;
    }
  });
  revGauge.source(dataNew);
  revGauge.coord("polar", {
    startAngle: (-9 / 8) * Math.PI,
    endAngle: (1 / 8) * Math.PI,
    radius: 0.8
  });
  revGauge.scale("value", {
    min: 0,
    max: 1,
    tickInterval: 1,
    nice: false
  });
  revGauge.axis(false);
  revGauge.facet("rect", {
    fields: ["name"],
    showTitle: false,
    eachView: function eachView(view, facet) {
      var data = facet.data[0];
      var color = ["#ffffff", "#003963", "#591010"];
      //指针
      view
        .point()
        .position("value*1")
        .shape("pointer")
        .color(color[2])
        .active(false)
        .tooltip(false)
        .animate({
          appear: {
            animation: "clipIn",
            duration: enterDuration
          },
          leave: {
            duration: leaveDuration
          }
        });
      //仪表盘背景
      view.guide().arc({
        zIndex: 0,
        top: false,
        start: [0, 1],
        end: [1, 1],
        style: {
          stroke: color[0],
          lineWidth: 20
        }
      });
      //仪表盘前景
      view.guide().arc({
        zIndex: 1,
        start: [0, 1],
        end: [data.value, 1],
        style: {
          stroke: color[1],
          lineWidth: 20
        }
      });
      //文本信息
      view.guide().text({
        position: ["50%", "80%"],
        content: data.name,
        style: {
          fill: "#d8eeff",
          textAlign: "center",
          fontSize: baseFontSize * 0.7,
          // fontFamily: 'Optima',
          fontWeight: "bold"
        },
        offsetY: baseFontSize * 0.3
      });
      view.guide().text({
        position: ["50%", "100%"],
        content: data.value * 2500 + "r",
        style: {
          fill: "#ffffff",
          textAlign: "center",
          fontSize: baseFontSize * 0.8,
          fontWeight: "bold"
          // fontFamily: 'Optima',
        }
      });
    }
  });
  revGauge.guide().text({
    position: ["50%", "5%"],
    content: "Rev - per min",
    style: {
      fill: "#ffffff",
      textAlign: "center",
      fontSize: baseFontSize,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
}
