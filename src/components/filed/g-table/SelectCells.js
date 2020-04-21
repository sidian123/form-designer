/**
 * 和选中相关的功能
 */
import utils from "../../../assets/utils";

export default {
    data(){
        return{
            /**
             * 选择起始点
             */
            dragStart:null,
            /**
             * 选择终点
             */
            dragEnd:null,
            /**
             * 是否处于拖拽状态
             */
            isDrag:false,
        }
    },
    computed:{
        /**
         * 被选中的cells
         */
        selectedCells(){
            let cells=[];
            this.field.cells.forEach(rowCells=>rowCells.forEach(cell=>{
                if(this.inRect(cell)){
                    cells.push(cell);
                }
            }));
            return cells;
        }
    },
    methods:{
        /**
         * 是否为方形选择区域
         */
        isRectSelection(){
            //参数校验
            if(this.selectedCells.length===0){//无元素
                return false;
            }
            if(this.selectedCells.length===1){//只有一个元素
                return true;
            }
            //遍历
            let widths=[];//每行宽度的集合
            let rowNum=this.selectedCells[0].row;//当前行索引
            let index=0;//集合索引
            for(let i=0;i<this.selectedCells.length;i++){
                let cell=this.selectedCells[i];
                if(rowNum!==cell.row){//下一行了
                    rowNum=cell.row;
                    index+=this.selectedCells[i-1].height;
                }
                //同行累加宽度
                for(let j=0;j<cell.height;j++){
                    if(widths[index+j]==null){//初始化
                        widths[index+j]=0;
                    }
                    widths[index+j]+=cell.width;
                }
            }
            //每一行宽度都相等才是方形
            let firstWidth=widths[0];
            for(let width of widths){
                if(width===0){//肯定到最后一行了.
                    break;
                }
                if(firstWidth!==width){
                    return false;
                }
            }
            return true;
        },
        /**
         * 获取极值
         */
        getExtremum(){
            //记录极值的变量
            let extre={
                minCol:Number.MAX_VALUE,
                maxCol:0,
                minRow:Number.MAX_VALUE,
                maxRow:0
            };
            //遍历
            this.selectedCells.forEach(cell=>{
                //更新极值
                if(cell.row <= extre.minRow){
                    extre.minRow=cell.row;
                }
                if(cell.column <= extre.minCol){
                    extre.minCol=cell.column;
                }
                if(cell.row+cell.height-1 >= extre.maxRow){
                    extre.maxRow=cell.row+cell.height-1;
                }
                if(cell.column+cell.width-1 >= extre.maxCol){
                    extre.maxCol=cell.column+cell.width-1;
                }
            });
            return extre;
        },
        /**
         * 开始拖拽
         * @param item
         */
        onCellMouseMove(item){
            if(this.isDrag){//处于拖拽状态
                //更新dragEnd状态
                this.dragEnd={row:item.row,column:item.column};
            }
        },
        /**
         * 拖拽中
         * @param item
         */
        onCellMouseUp(item){
            //更新dragEnd状态
            this.dragEnd={row:item.row,column:item.column};
            //退出拖拽状态,处于选中状态
            this.isDrag=false;
        },
        /**
         * 拖拽中
         * @param item
         */
        onCellMouseDown(item){
            this.isDrag=true;
            this.dragStart={row:item.row,column:item.column};
        },
        /**
         * 是否被选中
         */
        isSelected(cell){
            return this.selectedCells.findIndex(value => utils.posEqual(value,cell))!==-1;
        },
        /**
         * 在方形内. 方形由start,end确定
         * @param cell 单元格,必须有坐标{row,column}
         * @return {boolean}
         */
        inRect(cell){
            if(this.dragStart==null || this.dragEnd==null){
                return false;
            }
            return utils.isBetween(this.dragStart.row,this.dragEnd.row,cell.row) && utils.isBetween(this.dragStart.column,this.dragEnd.column,cell.column);
        },
        /**
         * 清空拖拽状态
         */
        initDragStatus(){
            this.dragStart=null;
            this.dragEnd=null;
        },
    }
}