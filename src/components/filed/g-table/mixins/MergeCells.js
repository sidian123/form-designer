import utils from "../../../../assets/utils";

export default {
    methods:{
        /**
         * 合并单元格
         */
        mergeCells(){
            //校验
            if(this.selectedCells.length<=1){//必须多余1个
                this.$message.info("必须选择多余一个单元格");
                return;
            }
            if(!this.isRectSelection()){//必须选择区域是方形
                this.$message.info("选择区域必须是方形");
                return;
            }
            //do
            this.doMergeCells();
        },
        doMergeCells(){
            //修正第一个被选中的cell
            let firstCell=this.selectedCells[0];//第一个被选中的cell
            let extremum = this.getExtremum();//获取极值
            firstCell.width=extremum.maxCol-extremum.minCol+1;//修正width
            firstCell.height=extremum.maxRow-extremum.minRow+1;//修正height
            //其余的都删除
            this.field.cells.forEach(rowCells=>{
                let t=[];//待删除元素索引
                for(let i=0; i<rowCells.length;i++){//对于每一个cell
                    let cell=rowCells[i];
                    if(this.isSelected(cell)){//被选中
                        if(!utils.posEqual(firstCell,cell)){//不是第一个被选中的
                            //标记待删除
                            t.push(i);
                        }
                    }
                }
                //删除
                rowCells.splice(t[0],t.length);
            });
            //取消选中状态
            this.initDragStatus();
        },
    }
}