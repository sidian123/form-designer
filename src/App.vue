<template>
  <div id="app">
    <form-designer></form-designer>
  </div>
</template>

<script>
  import FormDesigner from "./components/form-designer/FormDesigner";

  export default {
  name: 'App',
  components: {
    FormDesigner,
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html,body,#app{
    width: 100%;
    height: 100%;
    margin:0;
    padding: 0;
  }
  #app{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
