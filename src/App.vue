<template>
  <div id="app">
    <form-designer></form-designer>
  </div>
</template>

<script>
  import FormDesigner from "./components/FormDesigner";

  export default {
  name: 'App',
  components: {
    FormDesigner,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
