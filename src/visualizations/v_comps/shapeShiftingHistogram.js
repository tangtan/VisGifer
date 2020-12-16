import VisCompBase from "../visCompBase";

//intervalData + maskData + lineData
const originData = [
  [
    {
      income: [10, 20],
      num: 5,
      year: 1998,
      income2: [20, 40],
      num2: 8,
      income3: 15,
      num3: 5,
    },
    { income: [20, 30], num: 7, year: 1998, income3: 25, num3: 7 },
    { income: [30, 40], num: 6, year: 1998, income3: 35, num3: 6 },
    { income: [40, 50], num: 5, year: 1998, income3: 45, num3: 5 },
    { income: [50, 60], num: 2, year: 1998, income3: 55, num3: 2 },
  ],
  [
    {
      income: [10, 20],
      num: 4,
      year: 1999,
      income2: [20, 50],
      num2: 8,
      income3: 15,
      num3: 5,
    },
    { income: [20, 30], num: 5, year: 1999, income3: 25, num3: 7 },
    { income: [30, 40], num: 5, year: 1999, income3: 35, num3: 6 },
    { income: [40, 50], num: 6, year: 1999, income3: 45, num3: 5 },
    { income: [50, 60], num: 4, year: 1999, income3: 55, num3: 2 },
    { income: [60, 70], num: 1, year: 1999 },
  ],
  [
    {
      income: [10, 20],
      num: 2,
      year: 2000,
      income2: [30, 70],
      num2: 8,
      income3: 15,
      num3: 5,
    },
    { income: [20, 30], num: 3, year: 2000, income3: 25, num3: 7 },
    { income: [30, 40], num: 4, year: 2000, income3: 35, num3: 6 },
    { income: [40, 50], num: 4, year: 2000, income3: 45, num3: 5 },
    { income: [50, 60], num: 4, year: 2000, income3: 55, num3: 2 },
    { income: [60, 70], num: 4, year: 2000 },
    { income: [70, 80], num: 3, year: 2000 },
  ],
];

export default class ShapeShiftingHistogram extends VisCompBase {
  constructor(chart) {
    super(chart);
    this.name = "ShapeShiftingHistogram";
  }

  create(vConfig) {
    const chart = this.chart;
    chart.syncViewPadding = true; //数据更新后就失效了 => why
    chart.theme({
      styleSheet: {
        backgroundColor: "#fff1e0",
      },
    });

    chart.scale("income", {
      min: 0,
      max: 200,
      tickCount: 5,
      range: [0.05, 0.95],
      sync: true,
    });
    chart.scale("num", {
      min: 0,
      max: 8,
      tickCount: 5,
      sync: true,
    });

    //'income'*'num'
    chart.axis("income", {
      line: null,
      tickLine: {
        length: 10,
        style: {
          lineWidth: 3,
          lineCap: "round",
        },
      },
      label: {
        style: {
          fontSize: 24,
          fontWeight: "bold",
        },
        offset: 13,
        formatter: (val) => `$${val}K`,
      },
    });
    chart.axis("num", {
      position: "right",
      label: {
        style: {
          fontSize: 24,
          fontWeight: "bold",
          fill: "#19100e",
        },
      },
      grid: {
        line: {
          type: "line",
          style: {
            lineWidth: 3,
            lineDash: [3],
          },
        },
      },
    });

    //'income2'*'num2'
    chart.scale("income2", {
      min: 0,
      max: 200,
      tickCount: 5,
      range: [0.05, 0.95],
    });
    chart.scale("num2", {
      min: 0,
      max: 8,
      tickCount: 5,
      key: true,
    });
    chart.axis("income2", {
      line: null,
      tickLine: {
        length: 10,
        style: {
          lineWidth: 3,
          lineCap: "round",
        },
      },
      label: {
        style: {
          fontSize: 24,
          fontWeight: "bold",
        },
        offset: 13,
        formatter: (val) => `$${val}K`,
      },
    });
    chart.axis("num2", {
      position: "right",
      label: {
        style: {
          fontSize: 24,
          fontWeight: "bold",
          fill: "#19100e",
        },
      },
      grid: {
        line: {
          type: "line",
          style: {
            lineWidth: 3,
            lineDash: [3],
          },
        },
      },
    });

    //'income3'*'num3'
    chart.scale("income3", {
      min: 0,
      max: 200,
      tickCount: 5,
      range: [0.05, 0.95],
    });
    chart.scale("num3", {
      min: 0,
      max: 8,
      tickCount: 5,
    });
    chart.axis("income3", {
      line: null,
      tickLine: {
        length: 10,
        style: {
          lineWidth: 3,
          lineCap: "round",
        },
      },
      label: {
        style: {
          fontSize: 24,
          fontWeight: "bold",
        },
        offset: 13,
        formatter: (val) => `$${val}K`,
      },
    });
    chart.axis("num3", {
      position: "right",
      label: {
        style: {
          fontSize: 24,
          fontWeight: "bold",
          fill: "#19100e",
        },
      },
      grid: {
        line: {
          type: "line",
          style: {
            lineWidth: 3,
            lineDash: [3],
          },
        },
      },
    });

    chart.tooltip({
      showMarkers: false,
    });
  }

  render() {
    const chart = this.chart;
    let count = 0;
    chart.data(originData[count]);
    const intervalView = chart.createView({ padding: [100, 50, 100, 10] });
    const lineView = chart.createView({ padding: [100, 50, 100, 10] });
    const maskView = chart.createView({ padding: [100, 50, 100, 10] });
    let timeOut;
    function runGif() {
      if (count == 0) {
        intervalView.interaction("active-region");
        intervalView
          .interval()
          .position("income*num")
          .color("#c58e9d")
          .style({ stroke: "#fff" })
          .animate({
            appear: null,
            update: {
              duration: 600,
              easing: "easeLinear",
            },
          });
        intervalView.annotation().text({
          position: ["5%", "13%"],
          content: originData[count][0].year,
          style: {
            fontSize: 48,
            fontWeight: "bold",
            fill: "#a35f78",
            textAlign: "center",
          },
          animate: false,
        });

        lineView.tooltip(false);
        lineView
          .line()
          .position("income3*num3")
          .style({ stroke: "#536b90", lineWidth: 5, lineJoin: "round" })
          .animate({
            appear: {
              duration: 1000,
              delay: 1000,
              easing: "easeQuadIn",
            },
          });

        lineView.annotation().dataMarker({
          point: null,
          text: {
            content: originData[0][0].year,
            style: {
              fontSize: 32,
              fontWeight: "bold",
              fill: "#536b90",
              textAlign: "center",
              opacity: 1,
            },
            background: {
              padding: 5,
              style: {
                stroke: "#536b90",
                lineWidth: 5,
                lineJoin: "round",
              },
            },
          },
          position: ["23.5%", "32%"],
          line: {
            length: 50,
            style: {
              stroke: "#536b90",
              lineWidth: 5,
            },
          },
          animate: true,
          animateOption: {
            appear: {
              animation: "fade-in",
              easing: "easeQuadIn",
              delay: 2000,
              duration: 500,
            },
          },
        });

        maskView.tooltip(false);
        maskView
          .interval()
          .position("income2*num2")
          .style({ fill: "#536b90", fillOpacity: 0.15 })
          .animate({
            appear: {
              animation: "fade-in",
              easing: "easeQuadIn",
              delay: 500,
              duration: 500,
            },
            update: {
              duration: 600,
              easing: "easeLinear",
            },
          });
        count++;
        chart.render();
        timeOut = setTimeout(runGif, 3500);
      } else if (count < originData.length) {
        intervalView.annotation().clear(true);
        intervalView.annotation().text({
          position: ["5%", "13%"],
          content: originData[count][0].year,
          style: {
            fontSize: 48,
            fontWeight: "bold",
            fill: "#a35f78",
            textAlign: "center",
          },
          animate: false,
        });
        chart.changeData(originData[count++]);
        timeOut = setTimeout(runGif, 1500);
      } else {
        clearInterval(timeOut);
      }
    }
    runGif();
  }
}
