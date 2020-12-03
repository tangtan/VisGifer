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
export default function graduateEmployedBar(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  const graduateEmployedBar = chart;
  let dataNew = [];
  data.forEach(item => {
    const data = {
      name: item.name,
      value: parseFloat(item.value / 100)
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
  graduateEmployedBar.source(dataNew);
  graduateEmployedBar.coord("polar", {
    startAngle: (-10 / 8) * Math.PI,
    endAngle: (2 / 8) * Math.PI,
    radius: 0.75
  });
  graduateEmployedBar.scale("value", {
    min: 0,
    max: 1,
    tickInterval: 1,
    nice: false
  });
  graduateEmployedBar.axis(false);
  graduateEmployedBar.facet("rect", {
    fields: ["name"],
    showTitle: false,
    eachView: function eachView(view, facet) {
      var data = facet.data[0];
      var color = ["#e5a03e"];
      //指针
      view
        .point()
        .position("value*1")
        .shape("pointer")
        .color(color[0])
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
      //仪表盘背景
      view.guide().arc({
        zIndex: 0,
        top: false,
        start: [0, 1],
        end: [1, 1],
        style: {
          stroke: color[0],
          lineWidth: 10
        }
      });
      //仪表盘前景
      view.guide().arc({
        zIndex: 1,
        start: [0, 1],
        end: [data.value, 1],
        style: {
          stroke: "#a84e21",
          lineWidth: 10
        }
      });
      //文本信息
      view.guide().text({
        position: ["50%", "75%"],
        content: data.name,
        style: {
          fill: "#75675f",
          textAlign: "center",
          fontSize: baseFontSize * 0.5,
          fontFamily: "Optima"
        },
        offsetY: baseFontSize * 0.3
      });
      view.guide().text({
        position: ["50%", "100%"],
        content: data.value * 100 + "%",
        style: {
          fill: "#a84e21",
          textAlign: "center",
          fontSize: baseFontSize * 0.6,
          fontFamily: "Optima"
        }
      });
    }
  });
  graduateEmployedBar.guide().text({
    position: ["50%", "5%"],
    content: '"Employed at Graduation" Rate',
    style: {
      fill: "#5f371f",
      textAlign: "center",
      fontSize: baseFontSize * 0.7,
      fontFamily: "Optima"
      // fontWeight:'bold',
    }
  });
}
