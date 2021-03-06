<template>
  <div id="video-renderer">
    <div id="g2-container"></div>
    <canvas id="preview" />
    <video id="video-player" ref="video" controls muted />
    <div
      id="btn-play"
      :style="btnPlayStyle"
      @mousedown="changeBtnStyle"
      @click="startRendering"
    >
      Click Me
    </div>
    <div id="hidden-bar">
      <textarea id="textarea-json"></textarea>
      <textarea id="textarea-upload"></textarea>
    </div>
  </div>
</template>

<script>
import renderVisComp from "../visualizations/renderVisComp";
import { saveFile, uploadFile } from "../utils/fileIO";
import { transformData } from "../utils/protoc";

import JSZip from "jszip";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "VisRenderer",

  data() {
    return {
      outputFormat: "mp4",
      isDownloadZIP: false,
      btnPlayStyle: {
        "box-shadow": "2px 2px 2px #888",
      },
    };
  },

  computed: {
    ...mapGetters(["renderJson", "configData"]),
  },

  methods: {
    changeBtnStyle: function () {
      this.btnPlayStyle = { "box-shadow": "none" };
    },

    restoreBtnStyle: function () {
      this.btnPlayStyle = { "box-shadow": "2px 2px 2px #888" };
    },

    clearG2Container: function () {
      const containerDOM = document.getElementById("g2-container");
      if (containerDOM) {
        const children = containerDOM.childNodes;
        for (const child of children) {
          containerDOM.removeChild(child);
        }
      }
    },

    startRendering: async function () {
      this.restoreBtnStyle();
      const zip = new JSZip();
      // Interactive mode or command mode
      const backendRenderJson = document.getElementById("textarea-json")
        .innerHTML;
      const isInteractiveMode = backendRenderJson.length === 0;
      const vConfig = transformData(
        isInteractiveMode ? this.renderJson : JSON.parse(backendRenderJson)
      );
      // Setup visualization config
      this.$refs.video.src = vConfig.videoSrc;
      const blobs = await this.playOnCanvas(vConfig);
      blobs.forEach((blob, j) => {
        const filename = `${vConfig.name}.${this.outputFormat}`;
        zip.file(filename, blob, { binary: true });
      });
      // Generate output files
      const zipFile = await zip.generateAsync({ type: "blob" });
      if (isInteractiveMode) {
        if (this.isDownloadZIP) {
          saveFile(zipFile, "img.zip");
        }
      } else {
        await uploadFile(zipFile, "img.zip");
      }
    },

    playOnCanvas: async function (vConfig) {
      this.clearG2Container();
      const FPS = this.configData.fps || 30;
      return await renderVisComp(
        "g2-container",
        vConfig,
        FPS,
        this.outputFormat
      );
    },
  },
};
</script>

<style scoped>
#video-renderer {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#g2-container {
  position: absolute;
  top: -5000px;
  left: 0;
  background: white;
  border-radius: 2px;
  box-shadow: 2px 2px 2px #888;
  margin: auto;
  align-self: center;
}

#preview {
  box-shadow: 2px 2px 2px #888;
  background: white;
  border-radius: 2px;
}

video {
  position: absolute;
  top: -500px;
  left: 0;
  width: 500px;
  height: 500px;
}

#hidden-bar {
  position: absolute;
  top: -10000px;
  left: -10000px;
  background: #c4c4c4;
  opacity: 0;
}

#btn-play {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  line-height: 80px;
  color: white;
  font-weight: bold;
  background: #3883fa;
}
</style>
