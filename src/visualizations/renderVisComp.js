import { Chart } from "@antv/g2";
import visCompFactorySelector from "./visCompFactory";

// https://github.com/webrtc/samples/blob/gh-pages/src/content/capture/canvas-record/js/main.js
const mediaSource = new MediaSource();
mediaSource.addEventListener("sourceopen", handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;
let g2Canvas; // g2 renderer
let canvas; // preview renderer
let video; // background media renderer

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

const initVisComp = (elId, vConfig) => {
  const [visW, visH] = vConfig.size;
  const bgColor = vConfig.backgroundFill;
  const bgOpacity = vConfig.backgroundOpacity;
  // Create G2 chart
  const chart = new Chart({
    container: elId,
    autoFit: true,
    width: visW,
    height: visH
  });
  // Set up G2 chart
  chart.theme({
    styleSheet: {
      backgroundColor: hexToRgba(bgColor, bgOpacity)
    }
  });
  return chart;
};

const initPaintingEnv = vConfig => {
  // Clearn recording buffer
  recordedBlobs = [];
  // Set up renderers
  g2Canvas = document.querySelector(`canvas`);
  canvas = document.querySelector(`#preview`); // preview canvas
  video = document.querySelector(`video`);
  if (vConfig.videoSrc !== null) {
    const [bgW, bgH] = vConfig.videoSize;
    video.load();
    g2Canvas.height = canvas.height = video.height = bgH;
    g2Canvas.width = canvas.width = video.width = bgW;
  } else {
    const [visW, visH] = vConfig.size;
    g2Canvas.height = canvas.height = video.height = visH;
    g2Canvas.width = canvas.width = video.width = visW;
  }
  // Return preview canvas context
  return canvas.getContext("2d");
};
/**
 * 可视化动画渲染函数
 * @author yan1
 * @param {String} elId Dom container
 * @param {Object} vConfig Visualization config
 * @param {Number} fps fps
 * @param {String} format "video/webm" | "video/mp4"
 * @return 生成可视化动画图片序列
 */
export default function renderVisComp(
  elId,
  vConfig,
  fps = 30,
  format = "webm"
) {
  // Init visualization component
  const chart = initVisComp(elId, vConfig);
  // Configure visualization component
  const VisCompFactory = visCompFactorySelector(vConfig);
  const visComp = new VisCompFactory(chart);
  visComp.create(vConfig);
  // Init recording environment
  const ctx = initPaintingEnv(vConfig);
  // Render visualization component
  return new Promise(async (res, rej) => {
    const isBackgroundSrcExist = vConfig.videoSrc !== null;
    let isStopRecording = false;
    const computeFrame = () => {
      if (isBackgroundSrcExist) {
        const [posX, posY] = vConfig.position;
        ctx.drawImage(video, 0, 0);
        ctx.drawImage(g2Canvas, posX, posY);
      } else {
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
    const enterDuration = 1000 * vConfig.enterDuration; // mileseconds
    const duration = 1000 * vConfig.duration;
    const leaveDuration = 1000 * vConfig.leaveDuration;
    const delayTime = enterDuration + duration + leaveDuration;
    setTimeout(() => {
      onEnd();
    }, delayTime);
    // Start recording
    if (isBackgroundSrcExist) {
      await video.play();
    }
    visComp.render();
    onStart();
  });
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
