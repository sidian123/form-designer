<template>
    <div class="label">
        {{value}}
    </div>
</template>

<script>
    export default {
        name: "Label",
        props:{
            value:{
                default:"name"
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>