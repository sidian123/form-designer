<template>
    <el-input size="mini"
              :type="field.inputType"
              placeholder="请输入内容"
    ></el-input>
</template>

<script>
    export default {
        name: "GInput",
        props:['field']
    }
</script>

<style lang="scss" scoped>

</style>