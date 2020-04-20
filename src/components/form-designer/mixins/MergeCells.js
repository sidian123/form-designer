/**
 * 合并单元格相关的功能
 */
export default {
    computed:{
        /**
         * 是否能够合并单元格
         */
        canMergeCells(){
            return this.selectedCells.length>1;
        },
    },
    methods:{
        /**
         * 合并单元格
         */
        mergeCells(){
            //校验
            if(this.selectedCells.findIndex(cell =>this.selectedCells[0].row!==cell.row )!==-1){
                this.$message.error('暂不支持多行单元格合并');
            }
            //合并
            this.doMergeCells();

        },
        doMergeCells(){
            //找出第一个被选中的cell
            let cell=this.selectedCells[0];
            //计算其宽度
            cell.width=this.selectedCells
                .map(value => value.width)
                .reduce((previousValue, currentValue) => previousValue+currentValue);
            //标注为特殊单元格
            this.markSpecialCell(cell);
            //取消选中状态
            this.initDragStatus();
        },
        /**
         * 标注cell为特殊cell
         * 需要考虑一行中多个特殊cell要合并的问题
         * @param cell
         */
        markSpecialCell(cell){
            //找到需要合并的cell
            let cells = this.specialCells
                .filter(item => item.row===cell.row)//找到同行的cell
                .filter(item=>cell.column+cell.width>item.column);//找到有交织的特殊cell
            //删除这些cells
            cells.forEach(item=>{
                let index = this.specialCells.findIndex(value => this.posEqual(value,item));
                if(index!==-1){
                    this.specialCells.splice(index,-1);
                }
            });
            //标注cell
            this.specialCells.push(cell);
        }
    }
}