import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  jsonEditor: undefined,
  configData: {
    browserPath: "/mnt/d/Google/Chrome/Application/chrome.exe",
    outputPath: "./",
    targetUrl: "http://localhost",
    headless: false,
    timeout: 5000,
    port: 5000,
    fps: 30,
    launchWidth: 1280,
    launchHeight: 720,
    renderJson: {
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
      background_src: null,
      background_size_w: 960,
      background_size_h: 540,
    },
  },
};

const getters = {
  jsonEditor: (state) => state.jsonEditor,
  configData: (state) => state.configData,
  renderJson: (state) => state.configData.renderJson,
};

const actions = {
  setRenderJson({ state }, renderJson) {
    state.configData.renderJson = renderJson;
  },

  updateRenderJson({ state }, updatedJson) {
    state.configData.renderJson = updatedJson;
  },

  updateJsonEditor({ state }, editor) {
    state.jsonEditor = editor;
  },

  setJsonEditor({ state }) {
    state.jsonEditor.set(state.configData.renderJson);
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
});
