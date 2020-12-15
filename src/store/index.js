import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  jsonEditor: undefined,
  configData: {
    browserPath: "/mnt/d/Google/Chrome/Application/chrome.exe",
    outputPath: "web_renderer/output",
    targetUrl: "http://localhost:5000",
    timeout: 500000,
    fps: 30,
    port: 5000,
    launchOptions: {
      width: 1280,
      height: 720,
      headless: false,
    },
    renderJson: [
      {
        name: "Increases in Leaf Area (10^11 m2)",
        data: [
          {
            name: "Croplands",
            value: 17.85,
          },
          {
            name: "Forests",
            value: 16.72,
          },
          {
            name: "Grasslands",
            value: 7.85,
          },
          {
            name: "Others",
            value: 11.5,
          },
        ],
        vis_type: "ShapeShiftingHistogram",
        vis_duration: 10,
        vis_position_x: 100,
        vis_position_y: 100,
        vis_size_w: 1200,
        vis_size_h: 600,
        vis_colors: ["#e0b25a"],
        font_size: 16,
        font_color: "#ffffff",
        background_fill: "#703434",
        background_opacity: 0.4,
        background_src: null, // support video or image background
        background_size_w: 960, // only valid when background_src exist
        background_size_h: 540,
      },
    ],
    screenHeight: 540,
    screenWidth: 960,
  },
};

const getters = {
  configData: (state) => state.configData,
  renderList: (state) => state.configData.renderJson,
  jsonEditor: (state) => state.jsonEditor,
};

const actions = {
  updateRenderList({ state }, updateList) {
    state.configData.renderJson = updateList;
  },

  updateJsonEditor({ state }, editor) {
    state.jsonEditor = editor;
  },

  setJsonEditor({ state }) {
    console.log(state.configData.renderJson[0]);
    state.jsonEditor.set(state.configData.renderJson[0]);
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
});
