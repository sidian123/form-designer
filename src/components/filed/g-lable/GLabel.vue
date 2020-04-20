<template>
    <div class="label">
        {{field.value}}
    </div>
</template>

<script>
    export default {
        name: "GLabel",
        props:["field"],
    }
</script>

<style lang="scss" scoped>
    .label{
        padding: 0 0.5rem;
    }
</style>