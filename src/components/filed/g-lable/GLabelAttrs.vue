<template>
    <div class="attrs">
        <div class="attr-item">
            <div class="attr-key">行</div>
            <div class="attr-value"><el-input-number size="mini" v-model="field.pos.row"></el-input-number></div>
        </div>
        <div class="attr-item">
            <div class="attr-key">列</div>
            <div class="attr-value"><el-input-number size="mini" v-model="field.pos.column"></el-input-number></div>
        </div>
        <div class="attr-item">
            <div class="attr-key">值</div>
            <div class="attr-value"><el-input size="mini" v-model="field.value"></el-input></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GLabelAttrs",
        props:['field']
    }
</script>

<style lang="scss" scoped>
    .attrs{
        .attr-item{
            display: flex;
            align-items: center;
            margin:1rem 0;
            padding: 0 1rem;

            .attr-key{
                flex-basis: 6rem;
                flex-shrink: 0;
                padding-right: 2rem;
            }
            .attr-value{
                flex-grow: 1;
            }
        }
    }
</style>