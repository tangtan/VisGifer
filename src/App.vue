<template>
  <div id="app">
    <json-console></json-console>
    <vis-renderer></vis-renderer>
  </div>
</template>

<script>
import JsonConsole from "./components/JsonConsole";
import VisRenderer from "./components/VisRenderer";

export default {
  name: "App",

  components: {
    "json-console": JsonConsole,
    "vis-renderer": VisRenderer
  }
};
</script>

<style>
body {
  margin: 0;
  background: #ddd;
}

#app {
  display: flex;
  flex-direction: row;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#btn-play {
  background: pink;
}

div.jsoneditor {
  border: 0;
}
</style>
