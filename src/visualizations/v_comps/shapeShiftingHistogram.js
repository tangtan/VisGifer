import VisCompBase from "../visCompBase";

//data and data2 => test
const data = [
  [
    { income: [10, 20], num: 5 },
    { income: [20, 30], num: 7 },
    { income: [30, 40], num: 6 }
  ],
  [
    { income: [10, 20], num: 2 },
    { income: [20, 30], num: 8 },
    { income: [30, 40], num: 6.5 },
    { income: [40, 50], num: 0.5 }
  ],
  [
    { income: [10, 20], num: 1 },
    { income: [20, 30], num: 7.5 },
    { income: [30, 40], num: 5.5 },
    { income: [40, 50], num: 3 }
  ]
];
const data2 = [
  { income: 15, num: 5 },
  { income: 25, num: 7 },
  { income: 35, num: 6 },
  { income: 65, num: 3 },
  { income: 85, num: 4 },
  { income: 105, num: 2 },
  { income: 125, num: 3.5 },
  { income: 145, num: 1.8 },
  { income: 165, num: 1 },
  { income: 185, num: 0.2 }
];
const data3 = [
  [{ income: [20, 60], num: 8 }],
  [{ income: [30, 80], num: 8 }],
  [{ income: [35, 90], num: 8 }]
];
const dataText = [1998, 1999, 2000];

export default class ShapeShiftingHistogram extends VisCompBase {
  constructor(chart) {
    super(chart);
    this.name = "ShapeShiftingHistogram";
  }

  create(vConfig) {
    const chart = this.chart;
    // const chart = new G2.Chart({
    //   container: "container",
    //   autoFit: false,
    //   height: 600,
    //   width: 1200,
    //   syncViewPadding: true
    // });

    // #fff1e0
    chart.theme({
      styleSheet: {
        backgroundColor: "rgba(100,10,100,0.1)"
      }
    });

    chart.scale("income", {
      min: 0,
      max: 200,
      tickCount: 5,
      range: [0.05, 0.95],
      sync: true
    });
    chart.scale("num", {
      min: 0,
      max: 8,
      tickCount: 5,
      sync: true
    });

    chart.axis("income", {
      line: null,
      tickLine: {
        length: 10,
        style: {
          lineWidth: 3,
          lineCap: "round"
        }
        //can't offset 'tickLine' -no api
      },
      label: {
        style: {
          fontSize: 24,
          fontWeight: "bold"
        },
        offset: 13,
        formatter: val => `$${val}K`
      }
    });
    chart.axis("num", {
      position: "right",
      label: {
        style: {
          fontSize: 24,
          fontWeight: "bold",
          fill: "#19100e"
        }
      },
      grid: {
        line: {
          type: "line",
          style: {
            lineWidth: 3,
            lineDash: [3]
          }
        }
      }
    });

    chart.tooltip({
      showMarkers: false
    });
  }

  render() {
    const chart = this.chart;
    const view1 = chart.createView({ padding: [100, 50, 100, 10] });
    const view2 = chart.createView();
    const view3 = chart.createView();
    let count = 0;
    let timeOut;
    function runGif() {
      if (count == 0) {
        view1.data(data[count]);
        view1.interaction("active-region");
        view1
          .interval()
          .position("income*num")
          .color("#c58e9d")
          .style({ stroke: "#fff" })
          .animate({
            appear: null,
            update: {
              duration: 600,
              easing: "easeLinear"
            }
          });
        view1.annotation().text({
          position: ["5%", "13%"],
          content: dataText[count],
          style: {
            fontSize: 48,
            fontWeight: "bold",
            fill: "#a35f78",
            textAlign: "center"
          },
          animate: false
        });

        view2.data(data2);
        view2.tooltip(false);
        view2
          .line()
          .position("income*num")
          .style({ stroke: "#536b90", lineWidth: 5, lineJoin: "round" })
          .animate({
            appear: {
              duration: 1000,
              delay: 1000,
              easing: "easeQuadIn"
            }
          });

        view2.annotation().dataMarker({
          point: null,
          text: {
            content: dataText[0],
            style: {
              fontSize: 32,
              fontWeight: "bold",
              fill: "#536b90",
              textAlign: "center",
              opacity: 1
            },
            background: {
              padding: 5,
              style: {
                stroke: "#536b90",
                lineWidth: 5,
                lineJoin: "round"
              }
            }
          },
          position: ["80%", "88%"],
          line: {
            length: 50,
            style: {
              stroke: "#536b90",
              lineWidth: 5
            }
          },
          animate: true,
          animateOption: {
            appear: {
              animation: "fade-in",
              easing: "easeQuadIn",
              delay: 2000,
              duration: 500
            }
          }
        });

        view3.data(data3[count]);
        view3.tooltip(false);
        view3
          .interval()
          .position("income*num")
          .style({ fill: "#536b90", fillOpacity: 0.15 })
          .animate({
            appear: {
              animation: "fade-in",
              easing: "easeQuadIn",
              delay: 500,
              duration: 500
            }
            // update: {
            //     // animation: 'scale-in-x',
            //     duration: 600,
            //     easing: 'easeLinear',
            // }
          });
        count++;
        chart.render();
        timeOut = setTimeout(runGif, 3500); //自定义间隔时间
      } else if (count < data.length) {
        view1.annotation().clear(true);
        view1.annotation().text({
          position: ["5%", "13%"],
          content: dataText[count],
          style: {
            fontSize: 48,
            fontWeight: "bold",
            fill: "#a35f78",
            textAlign: "center"
          },
          animate: false
        });
        // failed => redraw
        // view3.data(data3[count]);
        // view1.data(data[count++]);
        // chart.render();

        // failed => overlap
        // view3.changeData(data3[count]);
        // view1.changeData(data[count++]);

        // failed => unChange
        view3.data(data3[count]);
        view1.changeData(data[count++]);

        timeOut = setTimeout(runGif, 1500);
      } else {
        clearInterval(timeOut);
      }
    }
    runGif();
  }
}
