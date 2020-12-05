<template>
  <div class="json-console-container">
    <resize-box :move="resizeBoxMove" :max="resizeBoxMax" :min="resizeBoxMin">
      <div id="editor"></div>
    </resize-box>
  </div>
</template>

<script>
import ResizeBox from "./ResizeBox";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "JsonConsole",

  data() {
    return {
      editor: null,
      resizeBoxMove: {
        t: false,
        l: false,
        r: true,
        b: false,
        tl: false,
        tr: false,
        bl: false,
        br: false
      },
      resizeBoxMax: {
        width: 600,
        height: 0
      },
      resizeBoxMin: {
        width: 335,
        height: 0
      }
    };
  },

  computed: {
    ...mapGetters(["renderList"])
  },

  methods: {
    ...mapActions(["updateRenderList"])
  },

  components: {
    ResizeBox
  },

  mounted() {
    if (!this.editor) {
      const container = document.getElementById("editor");
      if (container) {
        const options = {
          onChangeJSON: json => {
            this.$store.dispatch("updateRenderList", [json]);
          }
        };
        this.editor = new JSONEditor(container, options);
        this.$store.dispatch("updateJsonEditor", this.editor);
      }
    }
    this.editor.set(this.renderList[0]);
  }
};
</script>

<style scoped>
.json-console-container {
  position: relative;
}

#editor {
  width: 100%;
  height: 100vh;
  background: white;
  box-shadow: 2px 2px 2px #888;
}
</style>
