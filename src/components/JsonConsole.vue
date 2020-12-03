<template>
  <div id="editor"></div>
</template>

<script>
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "JsonConsole",

  data() {
    return {
      editor: null
    };
  },

  computed: {
    ...mapGetters(["renderList"])
  },

  methods: {
    ...mapActions(["updateRenderList"])
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
#editor {
  width: 35vw;
  height: 100vh;
  background: white;
  box-shadow: 2px 2px 2px #888;
}
</style>
