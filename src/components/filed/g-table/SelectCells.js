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
    methods:{
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
    }
}