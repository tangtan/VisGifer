import G2 from "@antv/g2";

// https://github.com/webrtc/samples/blob/gh-pages/src/content/capture/canvas-record/js/main.js
const mediaSource = new MediaSource();
mediaSource.addEventListener("sourceopen", handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

const recordMimeType = "video/webm;codecs=vp9";

function handleSourceOpen(event) {
  console.log("MediaSource opened");
  sourceBuffer = mediaSource.addSourceBuffer(recordMimeType);
  console.log("Source buffer: ", sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log("Recorder stopped: ", event, recordedBlobs);
}

function startRecording(stream) {
  let options = { mimeType: recordMimeType };
  if (!MediaRecorder.isTypeSupported(recordMimeType)) {
    alert(
      "MediaRecorder is not supported by this browser.\n\n" +
        "Try Firefox 29 or later, or Chrome 47 or later, " +
        "with Enable experimental Web Platform features enabled from chrome://flags."
    );
    console.error("Exception while creating MediaRecorder:", recordMimeType);
    return;
  }
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e2) {
    alert(
      "MediaRecorder is not supported by this browser.\n\n" +
        "Try Firefox 29 or later, or Chrome 47 or later, " +
        "with Enable experimental Web Platform features enabled from chrome://flags."
    );
    console.error("Exception while creating MediaRecorder:", e2);
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  // TODO: calculate read time
  mediaRecorder.start(35); // collect 35ms per frame, magic number...
  console.log("MediaRecorder started", mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log("Recorded Blobs: ", recordedBlobs);
}

const initPaintingEnv = () => {
  recordedBlobs = [];
};
/**
 * 可视化动画渲染函数
 * @author yan1
 * @param {String} elId 画布容器
 * @param {Object} vConfig 可视化效果配置
 * @param {Function} effectFunc 可视化效果函数
 * @param {Number} fps fps
 * @param {String} format "video/webm" | "video/mp4"
 * @return 生成可视化动画图片序列
 */
export default function renderVisComp(
  elId,
  vConfig,
  effectFunc,
  fps = 30,
  format = "video/webm"
) {
  // check vConfig
  initPaintingEnv();
  let data;
  if (vConfig.hasOwnProperty("data")) {
    data = vConfig.data;
  } else {
    console.error("Invalid vConfig (no data)");
  }
  let size, w, h;
  if (vConfig.hasOwnProperty("size")) {
    size = vConfig.size;
    w = size[0];
    h = size[1];
  } else {
    console.error("Invalid vConfig (no size)");
  }
  // seconds to mileseconds
  let enterDuration;
  if (vConfig.hasOwnProperty("enter_duration")) {
    enterDuration = 1000 * vConfig.enter_duration;
  } else {
    console.error("Invalid vConfig (no enter duration)");
  }
  let duration;
  if (vConfig.hasOwnProperty("duration")) {
    duration = 1000 * vConfig.duration;
  } else {
    console.error("Invalid vConfig (no duration)");
  }
  let leaveDuration;
  if (vConfig.hasOwnProperty("leave_duration")) {
    leaveDuration = 1000 * vConfig.leave_duration;
  } else {
    console.error("Invalid vConfig (no leave duration)");
  }
  let baseFontSize, pt, pr, pb, pl;
  if (vConfig.hasOwnProperty("font_size")) {
    baseFontSize = vConfig.font_size;
    pt = baseFontSize * 1.5;
    pr = baseFontSize * 0.5;
    pb = baseFontSize * 0.5;
    pl = baseFontSize * 0.5;
  } else {
    console.error("Invalid vConfig (no base fontSize)");
  }
  let backgroundFill;
  if (vConfig.hasOwnProperty("background_fill")) {
    backgroundFill = vConfig.background_fill;
  } else {
    console.error("Invalid vConfig (no background fill)");
  }
  let backgroundOpacity;
  if (vConfig.hasOwnProperty("background_opacity")) {
    backgroundOpacity = vConfig.background_opacity;
  } else {
    console.error("Invalid vConfig (no background opacity)");
  }
  let backgroundStroke;
  if (vConfig.hasOwnProperty("background_stroke")) {
    backgroundStroke = vConfig.background_stroke;
  } else {
    console.error("Invalid vConfig (no background stroke)");
  }
  let backgroundStrokeOpacity;
  if (vConfig.hasOwnProperty("background_stroke_opacity")) {
    backgroundStrokeOpacity = vConfig.background_stroke_opacity;
  } else {
    console.error("Invalid vConfig (no background stroke opacity)");
  }
  let backgroundLineWidth;
  if (vConfig.hasOwnProperty("background_line_width")) {
    backgroundLineWidth = vConfig.background_line_width;
  } else {
    console.error("Invalid vConfig (no background line width)");
  }
  let backgroundRadius;
  if (vConfig.hasOwnProperty("background_radius")) {
    backgroundRadius = vConfig.background_radius;
  } else {
    console.error("Invalid vConfig (no background radius)");
  }
  let colorList;
  if (vConfig.hasOwnProperty("color")) {
    colorList = vConfig.color;
  } else {
    console.error("Invalid vConfig (no color)");
  }
  let fontColor;
  if (vConfig.hasOwnProperty("font_color")) {
    fontColor = vConfig.font_color;
  } else {
    console.error("Invalid vConfig (no font_color)");
  }
  let titleText;
  if (vConfig.hasOwnProperty("data_name")) {
    titleText = vConfig.data_name;
  } else {
    console.error("Invalid vConfig (no data_name)");
  }

  // construct chart
  const chart = new G2.Chart({
    container: elId,
    width: w,
    height: h,
    padding: [pt, pr, pb, pl],
    background: {
      fill: backgroundFill,
      fillOpacity: backgroundOpacity,
      stroke: backgroundStroke,
      strokeOpacity: backgroundStrokeOpacity,
      lineWidth: backgroundLineWidth,
      radius: backgroundRadius
    }
  }).legend(false);
  w = vConfig.video_size[0];
  h = vConfig.video_size[1];
  // define vis effect
  effectFunc(
    chart,
    data,
    enterDuration,
    leaveDuration,
    baseFontSize,
    colorList,
    fontColor,
    titleText
  );
  const delayTime = enterDuration + duration + leaveDuration;
  const g2Canvas = document.querySelector(`canvas`);
  const canvas = document.querySelector(`#preview`);
  const video = document.querySelector(`video`);
  video.load();
  g2Canvas.height = canvas.height = video.height = h;
  g2Canvas.width = canvas.width = video.width = w;
  const ctx = canvas.getContext("2d");
  return new Promise(async (res, rej) => {
    const computeFrame = () => {
      ctx.drawImage(video, 0, 0);
      ctx.drawImage(g2Canvas, vConfig.position[0], vConfig.position[1]);
    };
    const timerCb = () => {
      if (video.paused || video.ended) {
        return;
      }
      computeFrame();
      setTimeout(timerCb, 0);
    };
    // video.videoWidth
    video.onplay = () => {
      try {
        // 30fps by default
        const stream = canvas.captureStream(fps);
        startRecording(stream);
        timerCb();
      } catch (e) {
        rej(e);
      }
    };
    const onEnd = () => {
      try {
        video.pause();
        stopRecording();
        setTimeout(() => {
          console.log(`Record done!`);
          const blob = new Blob(recordedBlobs, { type: format });
          res([blob]);
        }, 500);
      } catch (e) {
        rej(e);
      }
    };
    // video.onended = onEnd
    setTimeout(() => {
      onEnd();
    }, delayTime);
    // render
    await video.play();
    chart.render();
  });
}