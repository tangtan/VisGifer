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
      headless: false
    },
    renderJson: [
      {
        name: "Increases in Leaf Area (10^11 m2)",
        data: [
          {
            name: "Croplands",
            value: 17.85
          },
          {
            name: "Forests",
            value: 16.72
          },
          {
            name: "Grasslands",
            value: 7.85
          },
          {
            name: "Others",
            value: 11.5
          }
        ],
        vis_type: "barHorizontalRound",
        vis_cfg: [
          "barHorizontalRound",
          "barHorizontalRect",
          "lineSmooth",
          "barVerticalRect",
          "dotHeight",
          "barTriangle",
          "barVerticalRound",
          "donut",
          "barDot",
          "barRadial",
          "pieFlower",
          "dotSize",
          "lineArea"
        ],
        start_time: 0,
        duration: 4,
        enter_duration: 2,
        leave_duration: 2,
        position: [520, 280],
        size: [418.5, 237.60000000000002],
        color_list: ["#e0b25a", "#ecd635", "#ffc766", "#eba15d", "#fbd920"],
        font_color: "#ffffff",
        background_fill: "#703434",
        background_opacity: 0.4,
        font_size: 27,
        video_src: "/static/u3.mp4",
        video_size: [960, 540]
      }
    ],
    screenHeight: 540,
    screenWidth: 960
  }
};

const getters = {
  configData: state => state.configData,
  renderList: state => state.configData.renderJson,
  jsonEditor: state => state.jsonEditor
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
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions
});
