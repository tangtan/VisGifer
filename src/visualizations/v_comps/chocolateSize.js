import G2 from "@antv/g2";

/**
 * 定义可视化动画效果
 * @author yan1
 * @param {Object} chart 初始图表
 * @param {Array} size 可视化尺寸[x, y]
 * @param {Number} enterDuration 入场动效持续时长
 * @param {Number} leaveDuration 出场动效持续时长
 * @param {Number} baseFontSize 可视化效果基础字体高度
 * @return
 */
export default function chocolateSize(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize
) {
  let dataX = [
    {
      name: data[0]["name"],
      maxvalue: data[0]["value"],
      minvalue: 0,
      range: [0, data[0]["value"]]
    }
  ];
  let dataY = [
    {
      name: data[1]["name"],
      maxvalue: data[1]["value"],
      minvalue: 0,
      range: [0, data[1]["value"]]
    }
  ];

  const shadowX = chart.view({
    start: {
      x: 0.153,
      y: 0.047
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 0.583,
      y: 0.197
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const chocolateSizeX = chart.view({
    start: {
      x: 0.15,
      y: 0.05
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 0.58,
      y: 0.2
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const shadowY = chart.view({
    start: {
      x: 0.203,
      y: 0.117
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 1.003,
      y: 0.947
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  const chocolateSizeY = chart.view({
    start: {
      x: 0.2,
      y: 0.12
    }, // 视图绘图区域的起始点，x、y 数值在 0 - 1 范围内
    end: {
      x: 1,
      y: 0.95
    } // 视图绘图区域的结束点，x、y 数值在 0 - 1 范围内
  });
  G2.Shape.registerShape("point", "triangle-left", {
    getPoints(cfg) {
      const x = cfg.x;
      const y = cfg.y;
      const y0 = cfg.y0;
      const width = cfg.size;
      return [
        { x: x - y / 3, y: y },
        { x: x, y: y + y / 9 },
        { x: x + y / 3, y: y }
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
  G2.Shape.registerShape("point", "triangle-right", {
    getPoints(cfg) {
      const x = cfg.x;
      const y = cfg.y;
      const y0 = cfg.y0;
      console.log(cfg);
      return [
        { x: x - x * 0.6, y: y + x * 0.1 },
        { x: x, y: y - x * 0.1 },
        { x: x + x * 0.6, y: y + x * 0.1 }
      ];
    },
    draw(cfg, group) {
      // 自定义最终绘制
      const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
      console.log(cfg.points, points);
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
  let view = [shadowX, shadowY, chocolateSizeX, chocolateSizeY];
  chocolateSizeX.coord().transpose();
  shadowX.coord().transpose();
  let pos = [["45%", "0%"], ["65%", "55%"]];
  let color = ["#adadad", "#ffd800"];
  let triangle_shape = [
    "triangle-right",
    "triangle-left",
    "triangle-down",
    "triangle"
  ];
  let count = 0;
  view.forEach(v => {
    v.tooltip(false);
    v.source(dataX, {
      maxvalue: {
        max: 9,
        min: 0
      }
    });
    v.axis(false);
    v.interval()
      .position("name*range")
      .size(baseFontSize * 0.3)
      .color(color[Math.round((count - 1) / 2)]);
    v.point()
      .position("name*minvalue")
      .shape(triangle_shape[(count * 2) % 4])
      .size(baseFontSize * 0.5)
      .color(color[Math.round((count - 1) / 2)]);
    v.point()
      .position("name*maxvalue")
      .shape(triangle_shape[(count * 2 + 1) % 4])
      .size(baseFontSize * 0.5)
      .color(color[Math.round((count - 1) / 2)]);
    v.guide().text({
      position: pos[count % 2],
      content: dataX[0]["maxvalue"] + " inches",
      style: {
        textAlign: "center",
        fontSize: baseFontSize,
        fill: color[Math.round((count - 1) / 2)],
        fontWeight: "bold"
      }
      // offsetX: baseFontSize * 1.5
    });
    count++;
  });
}
