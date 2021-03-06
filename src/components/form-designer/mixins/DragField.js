import utils from "../../../assets/utils";

/**
 * 与拖拽字段相关的功能
 */
export default {
    data(){
        return{
            //单元格中的字段
            cellFields:[],
        }
    },
    methods:{
        /**
         * 拖拽到
         * @param cell
         * @param event
         */
        onCellDrop(cell,event){
            //获取拖拽的字段
            let fieldObj=JSON.parse(event.dataTransfer.getData("text/json"));
            //构建单元格中的字段
            let cellField=this.buildCellField(fieldObj,{row:cell.row,column:cell.column});
            //记录
            let index = this.cellFields.findIndex(item=>utils.posEqual(item.pos,cell));
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
        /**
         * 根据字段对象, 构建单元格中的字段
         * @param fieldObj 字段
         * @param pos 坐标
         * @return {object} 单元格中的字段对象
         */
        buildCellField(fieldObj, pos) {
            switch (fieldObj.type) {
                case "label":
                case "input":
                case "table":
                    return {...fieldObj, pos};
                default:
                    return {pos};
            }
        }
    }
}