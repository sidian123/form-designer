<template>
    <div class="input">
        <el-input :type="field.inputType" placeholder="请输入内容"></el-input>
    </div>
</template>

<script>
    export default {
        name: "GInput",
        props:['field']
    }
</script>

<style lang="scss" scoped>
    .input{
        padding: 0 0.5rem;
    }
</style>