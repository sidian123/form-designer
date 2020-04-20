import {formDesignerConfig} from "../../../assets/config";

/**
 * 表单编辑器渲染相关的功能
 */
export default {
    data(){
        return {
            /**
             * 表单的列数
             */
            columnNum:formDesignerConfig.columnNum,
            /**
             * 表单的行数
             */
            rowNum:formDesignerConfig.rowNum,
            /**
             * 被特殊处理过的单元格, 如合并后的单元格
             */
            specialCells:[],
        }
    },
    computed:{
        /**
         * 表单编辑器的所有单元格, 二维数据
         */
        editorCells(){
            let cells=[];
            for(let i=0;i<this.rowNum;i++){//对于每一行
                let rowCells=[];
                for(let j=0;j<this.columnNum;){//对于行中这一列
                    //构建cell的基本骨架
                    let cell={row:i,column:j};
                    //是否为特殊单元格
                    let isSpecial=false;
                    let specialCell=this.isSpecialCell(cell);
                    if(specialCell!=null){//是
                        cell=specialCell;
                        isSpecial=true;
                    }
                    //填充单元格
                    this.fillCell(cell,isSpecial);
                    rowCells.push(cell);
                    //准备填充下一单元格
                    if(isSpecial){
                        j+=cell.width;
                    }else{
                        j++;
                    }
                }
                cells.push(rowCells);
            }
            return cells;
        },
    },
    methods:{
        /**
         * 是否为特殊单元格
         * @return {object} 若存在, 返回该cell,否则undefined
         */
        isSpecialCell(cell){
            return this.specialCells.find(value => this.posEqual(value,cell));
        },
        /**
         * 填充单元格对象
         * @param cell 待填充的对象
         * @param isSpecial 是否为特殊cell
         */
        fillCell(cell,isSpecial){
            //更新字段信息
            cell.field=this.cellFields.find(item=>this.posEqual(item.pos,cell));
            //更新isSelected字段
            let isSelected=false;
            if(this.dragStart!=null && this.dragEnd!=null){//处于拖拽或选中状态
                if(this.inRect(cell)){//该单元格在拖拽范围内
                    isSelected=true;
                }
            }
            cell.isSelected=isSelected;
            //更新width,height
            if(!isSpecial){//不是特殊cell,才使用默认值
                cell.width=1;
                cell.height=1;
            }
        },
    }
}