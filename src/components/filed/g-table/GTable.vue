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
                        :class="{isSelected:isSelected(cell)}"
                        :colspan="cell.width"
                        :rowspan="cell.height"
                        @mousedown="onCellMouseDown(cell)"
                        @mousemove="onCellMouseMove(cell)"
                        @mouseup="onCellMouseUp(cell)"
                    >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import utils from "../../../assets/utils";
    import SelectCells from "./SelectCells";

    export default {
        name: "GTable",
        mixins:[SelectCells],
        props:['field'],
        created() {
            //初始化所有单元格
            this.init();
        },
        computed:{
            /**
             * 仅用于遍历的数据
             * @return {[]}
             */
            columnArrayForIterate(){
                return utils.fillArray(this.field.column,1);
            },
        },
        watch:{
            'field.msg':function (value) {
                console.log(value.action);
                switch (value.action) {
                    case 'mergeCells':
                        this.mergeCells();
                        break;
                }
            },
        },
        methods:{
            /**
             * 合并单元格
             */
            mergeCells(){
                //校验
                if(this.selectedCells.length<=1){//必须多余1个
                    return;
                }
                //do
                this.doMergeCells();
            },
            doMergeCells(){
                let firstCell=null;//第一个被选中的cell
                let lastCell=null;//最后一个被删除的cell
                //遍历所有单元格
                this.field.cells.forEach(rowCells=>{
                    let t=[];//待删除元素索引
                    for(let i=0; i<rowCells.length;i++){//对于每一个cell
                        let cell=rowCells[i];
                        if(this.isSelected(cell)){//被选中
                            if(firstCell==null){//第一个被选中的
                                //标记
                                firstCell=cell;
                            }else{//其余的都删除
                                t.push(i);
                                lastCell=cell;
                            }
                        }
                    }
                    //删除
                    rowCells.splice(t[0],t.length);
                });
                //比对, 修改firstCell
                firstCell.width=lastCell.column-firstCell.column+1;
                firstCell.height=lastCell.row-firstCell.row+1;
                //取消选中状态
                this.initDragStatus();
            },
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
        .inner-table{
            width: 100%;
            border-collapse: collapse;
            .row{
                .cell{
                    height: 2rem;
                    border:solid 1px black;
                    &.isSelected{
                        background-color: #eff9ef;
                    }
                }
            }
        }
    }
</style>