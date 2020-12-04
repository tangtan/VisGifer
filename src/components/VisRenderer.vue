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
      render
    </div>
    <div id="hidden-bar">
      <textarea
        id="textarea-json"
        placeholder="Config JSON - visualization"
      ></textarea>
      <textarea id="textarea-upload" placeholder="Upload URL"></textarea>
      <textarea
        id="textarea-render"
        placeholder="Config JSON - video"
      ></textarea>
    </div>
  </div>
</template>

<script>
import renderVisComp from "../visualizations/renderVisComp";
import visTypeParser from "../visualizations/visTypeParser";
import { saveFile, uploadFile } from "../utils/fileIO";
import { transformData } from "../utils/protoc";

import JSZip from "jszip";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "VisRenderer",

  data() {
    return {
      btnPlayStyle: {
        "box-shadow": "2px 2px 2px #888"
      },
      vConfigList: [],
      isDownloadZIP: true,
      outputFormat: "video/mp4"
    };
  },

  computed: {
    ...mapGetters(["renderList", "configData"])
  },

  methods: {
    changeBtnStyle: function() {
      this.btnPlayStyle = { "box-shadow": "none" };
    },

    restoreBtnStyle: function() {
      this.btnPlayStyle = { "box-shadow": "2px 2px 2px #888" };
    },

    clearG2Container: function() {
      const containerDOM = document.getElementById("g2-container");
      if (containerDOM) {
        const children = containerDOM.childNodes;
        for (const child of children) {
          containerDOM.removeChild(child);
        }
      }
    },

    startRendering: async function() {
      this.restoreBtnStyle();
      const zip = new JSZip();
      console.log(this.renderList);
      this.vConfigList = this.renderList.map(json => transformData(json));
      for (let [i, vConfig] of this.vConfigList.entries()) {
        this.$refs.video.src = vConfig.video_src;
        const blobs = await this.playOnCanvas(vConfig);
        blobs.forEach((blob, j) => {
          const postfix = this.outputFormat === "video/webm" ? "webm" : "mp4";
          const filename = `${i}-${j}.${postfix}`;
          zip.file(filename, blob, { binary: true });
        });
      }
      const zipFile = await zip.generateAsync({ type: "blob" });
      if (this.isDownloadZIP) {
        saveFile(zipFile, "img.zip");
      } else {
        await uploadFile(zipFile, "img.zip");
      }
    },

    playOnCanvas: async function(vConfig) {
      this.clearG2Container();
      const visType = visTypeParser(vConfig);
      const FPS = this.configData.fps;
      return await renderVisComp(
        "g2-container",
        vConfig,
        visType,
        FPS,
        this.outputFormat
      );
    }
  }
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
  width: 120px;
  height: 30px;
  line-height: 30px;
}
</style>
