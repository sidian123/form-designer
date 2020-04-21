export default {
    watch:{
        'field.row':function (val,oldVal) {
            if(val>oldVal){//新增
                let rowCells=[];
                for(let i=0;i<this.field.column;i++){
                    rowCells.push({
                        row:this.field.cells.length,
                        column:i,
                        width:1,
                        height:1
                    })
                }
                this.field.cells.push(rowCells);
            }else{//删除
                this.field.cells.pop();
            }
        },
        'field.column':function (val,oldVal) {
            let time=Math.abs(val-oldVal);//要操作的次数
            while(time--){
                if(val>oldVal){//新增
                    this.addColumn();
                }else{//删除
                    this.deleteColumn(val,oldVal);
                }
            }
        }
    },
    methods:{
        /**
         * 添加一列
         */
        addColumn(){
            for(let i=0;i<this.field.cells.length;i++){//对于每一行
                //新增一列
                let rowCells=this.field.cells[i];
                rowCells.push({
                    row:i,
                    column:rowCells.length,
                    width:1,
                    height:1
                })
            }
        },
        /**
         * 删除一列
         */
        deleteColumn(val,oldVal){
            for(let i=0;i<this.field.cells.length;i++){//对于每一行
                let rowCells=this.field.cells[i];
                //判断是否要删除一列
                let width = rowCells.map(cell=>cell.width).reduce((acc, cur)=>acc+cur);//当前行宽度
                if(width===oldVal){//需要减少一列的占用空间
                    let lastCell=rowCells[rowCells.length-1];//该行的最后一个cell
                    if(lastCell.width===1){//该单元格仅占一列
                        //删除
                        rowCells.pop();
                    }else{//该单元格占多列
                        //宽度减少一列
                        if(lastCell.width===1){//该单元格仅占一列
                            //删除
                            rowCells.pop();
                        }else{//该单元格占多列
                            //宽度减少一列
                            lastCell.width--;
                        }
                    }
                }
            }
        }
    }
}