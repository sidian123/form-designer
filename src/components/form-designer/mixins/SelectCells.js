/**
 * 和选中相关的功能
 */
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
            //退出拖拽状态
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
    }
}