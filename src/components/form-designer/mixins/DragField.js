import utils from "../../../assets/utils";

export default {
    methods:{
        /**
         * 拖拽到
         * @param item
         * @param event
         */
        onCellDrop(item,event){
            let pos = {row:item.row,column:item.column};
            //获取拖拽的字段
            let fieldObj=JSON.parse(event.dataTransfer.getData("text/json"));
            //构建单元格中的字段
            let cellField=this.buildCellField(fieldObj,pos);
            //记录
            let index = this.cellFields.findIndex(item=>utils.posEqual(item.pos,pos));
            if(index!==-1){//已存在
                //更新
                this.cellFields.splice(index,1,cellField);
            }else{//不存在
                //新增
                this.cellFields.push(cellField);
            }
        },
        /**
         * 拖拽中
         * @param event
         */
        onCellDragOver(event){
            event.dataTransfer.dropEffect = "copy";
        },
    }
}