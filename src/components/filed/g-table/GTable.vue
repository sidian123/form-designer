<template>
    <div class="table">
        <table class="inner-table">
            <colgroup>
                <col :style="`width:${(1/field.column)*100}%`"
                     v-for="(item,index) in columnArrayForIterate"
                     :key="index"
                />
            </colgroup>
            <tbody>
                <tr v-for="(row,index) in field.cells"
                    :key="index"
                    class="row"
                >
                    <td v-for="(cell,index) in row"
                        :key="index"
                        class="cell"
                        :colspan="cell.width"
                        :rowspan="cell.height"
                    >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import utils from "../../../assets/utils";

    export default {
        name: "GTable",
        props:['field'],
        computed:{
            /**
             * 仅用于遍历的数据
             * @return {[]}
             */
            columnArrayForIterate(){
                return utils.fillArray(this.field.column,1);
            }
        },
        created() {
            //初始化所有单元格
            this.init();
        },
        methods:{
            init(){
                let cells=[];
                for(let i=0;i<this.field.row;i++){
                    let rowCells=[];
                    for(let j=0;j<this.field.column;j++){
                        rowCells.push({
                            row:i,column:j,width:1,height:1
                        })
                    }
                    cells.push(rowCells);
                }
                this.field.cells=cells;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .table{
        width: 100%;
        .inner-table{
            width: 100%;
            border-collapse: collapse;
            .row{
                .cell{
                    height: 2rem;
                    border:solid 1px black;
                }
            }
        }
    }
</style>