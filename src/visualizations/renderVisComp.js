import { Chart } from "@antv/g2";

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
 * @param {String} elId Dom container
 * @param {Object} vConfig Visualization config
 * @param {Function} effectFunc Visualization function
 * @param {Number} fps fps
 * @param {String} format "video/webm" | "video/mp4"
 * @return 生成可视化动画图片序列
 */
export default function renderVisComp(
  elId,
  vConfig,
  effectFunc,
  fps = 30,
  format = "webm"
) {
  // Init recording environment
  initPaintingEnv();
  // Get config parameters
  const data = vConfig.data;
  const [posX, posY] = vConfig.position;
  const [visW, visH] = vConfig.size;
  const [bgW, bgH] = vConfig.videoSize;
  const enterDuration = 1000 * vConfig.enterDuration; // mileseconds
  const duration = 1000 * vConfig.duration;
  const leaveDuration = 1000 * vConfig.leaveDuration;
  const baseFontSize = vConfig.fontSize;
  const colorList = vConfig.colors;
  const fontColor = vConfig.fontColor;
  const titleText = vConfig.dataName;
  const bgColor = vConfig.backgroundFill;
  const bgOpacity = vConfig.backgroundOpacity;
  // Construct chart
  const chart = new Chart({
    container: elId,
    autoFit: true,
    width: visW,
    height: visH
  });
  // Set up visualization
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
  const isBackgroundSrcExist = vConfig.videoSrc !== null;
  const delayTime = enterDuration + duration + leaveDuration;
  const g2Canvas = document.querySelector(`canvas`);
  const canvas = document.querySelector(`#preview`); // preview canvas
  const video = document.querySelector(`video`);
  const ctx = canvas.getContext("2d");
  if (isBackgroundSrcExist) {
    video.load();
    g2Canvas.height = canvas.height = video.height = bgH;
    g2Canvas.width = canvas.width = video.width = bgW;
  } else {
    g2Canvas.height = canvas.height = video.height = visH;
    g2Canvas.width = canvas.width = video.width = visW;
  }

  return new Promise(async (res, rej) => {
    let isStopRecording = false;
    const computeFrame = () => {
      if (isBackgroundSrcExist) {
        ctx.drawImage(video, 0, 0);
        drawBackground(ctx, bgColor, bgOpacity, visW, visH, posX, posY);
        ctx.drawImage(g2Canvas, posX, posY);
      } else {
        drawBackground(ctx, bgColor, bgOpacity, visW, visH);
        ctx.drawImage(g2Canvas, 0, 0);
      }
    };
    const timerCb = () => {
      if (isStopRecording) {
        return;
      }
      computeFrame();
      setTimeout(timerCb, 0);
    };
    const onStart = () => {
      try {
        const stream = canvas.captureStream(fps);
        startRecording(stream);
        timerCb();
      } catch (e) {
        rej(e);
      }
    };
    const onEnd = () => {
      try {
        isStopRecording = true;
        stopRecording();
        setTimeout(() => {
          console.log(`Record done!`);
          const blob = new Blob(recordedBlobs, { type: `video/${format}` });
          res([blob]);
        }, 500);
      } catch (e) {
        rej(e);
      }
    };
    // End recording after duration
    setTimeout(() => {
      onEnd();
    }, delayTime);
    // Start recording
    if (isBackgroundSrcExist) {
      await video.play();
    }
    chart.render();
    onStart();
  });
}

function drawBackground(ctx, bgColor, bgOpacity, w, h, x = 0, y = 0) {
  ctx.rect(x, y, w, h);
  ctx.fillStyle = hexToRgba(bgColor, bgOpacity);
  ctx.fill();
}

//hex -> rgba
function hexToRgba(hex, opacity) {
  return (
    "rgba(" +
    parseInt("0x" + hex.slice(1, 3)) +
    "," +
    parseInt("0x" + hex.slice(3, 5)) +
    "," +
    parseInt("0x" + hex.slice(5, 7)) +
    "," +
    opacity +
    ")"
  );
}
