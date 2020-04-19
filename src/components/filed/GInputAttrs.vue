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
            <div class="attr-key">类型</div>
            <div class="attr-value">
                <el-select v-model="field.inputType">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GInputAttrs",
        props:['field'],
        data(){
            return{
                options:[
                    {label:'text',value:'text'},
                    {label:'textarea',value:'textarea'}
                ]
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