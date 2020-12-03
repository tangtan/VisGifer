export default function donut(
  chart,
  data,
  enterDuration,
  leaveDuration,
  baseFontSize,
  colorList,
  fontColor,
  titleText
) {
  const donut = chart;
  // 处理数据

  if (data[0].value <= 1) {
    data.forEach((element, i) => {
      data[i].value = (element.value * 100).toFixed(2).toString() + "%";
    });
  }

  data.forEach(element => {
    element.value = parseFloat(element.value.split("%")[0]);
  });

  // 定义坐标轴
  donut.coord("theta", {
    innerRadius: 0.56,
    radius: 0.6
  });

  donut.source(data); // enter data

  const colorArray = colorList;
  donut.guide().text({
    position: ["50%", "-30%"],
    content: titleText,
    style: {
      fill: fontColor,
      textAlign: "center",
      fontSize: baseFontSize * 1,
      // fontFamily: 'Optima',
      fontWeight: "bold"
    }
  });
  // 定义几何标记
  const pie = donut
    .intervalStack()
    .position("value")
    .color("name", colorArray.slice(1))
    .select(true, {
      style: {
        opacity: 1,
        fill: colorArray[0]
      }
    })
    .animate({
      appear: {
        duration: enterDuration
      },
      leave: {
        animation: "zoomOut",
        easing: "easeQuadOut",
        duration: leaveDuration
      }
    })
    // .active(false)
    .label("name", {
      formatter: (text, item, index) => {
        const point = item.point; // 每个弧度对应的点
        let percent = point["value"];
        percent = percent + "%";
        // 一个单词换行
        let textNew = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] == " ") textNew += "\n";
          else textNew += text[i];
        }
        textNew += "\n";
        // 分隔字符串
        // let textArray = [];
        // const n = 6;
        // let str = text;
        // const len = Math.ceil(text.length/n);
        // for (let i = 0; i < len; i++) {
        //   if (str.length >= n) {
        //     const textCut = str.substring(0, n);
        //     textArray.push(textCut);
        //     str = str.substring(n);
        //   } else {
        //     str = str;
        //     textArray.push(str);
        //   }
        // }
        // let textNew = ''
        // for (const textA of textArray) {
        //   textNew = textNew + textA + '\n';
        // }
        return textNew + percent;
      },
      offset: baseFontSize * 1.6,
      textStyle: {
        fontSize: baseFontSize * 0.7,
        // fontFamily: 'Optima',
        fill: fontColor
      }
    })
    .tooltip(false);
  donut.on("afterpaint", function() {
    pie.setSelected(data[0]);
  });
}
