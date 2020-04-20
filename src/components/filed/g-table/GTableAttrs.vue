<template>
    <div class="attrs">
        <div class="attr-item">
            <div class="attr-key"></div>
            <div class="attr-value">
                <el-button size="mini" @click="mergeCells">合并单元格</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GTableAttrs",
        props:['field'],
        methods:{
            /**
             * 合并单元格
             */
            mergeCells(){
                this.field.msg={
                    action:"mergeCells",//动作, 合并单元格
                }
            }
        }
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