<template>
    <div class="form-designer">
        <div class="field-sidebar">
            <div class="field-group"
                 v-for="(group,index) in fieldItems"
                 :key="index"
            >
                <div class="field-group-title">{{group.title}}</div>
                <div class="field-group-content">
                    <div class="field-item"
                         draggable="true"
                         v-for="(item,index) in group.list"
                         :key="index"
                         @dragstart="onFieldDragStart(item,$event)"
                    >
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="designer-body">
            <div class="tool-bar">
                <el-input-number v-model="rowNum"></el-input-number>
                <el-input-number v-model="columnNum"></el-input-number>
            </div>
            <div class="form-editor">
                <div class="cell-container" :style="cellContainerStyle">
                    <div class="cell"
                         :class="{isSelected:item.isSelected}"
                         v-for="(item,index) in editorCells"
                         :key="index"
                         :id="`${item.row},${item.column}`"
                         @mousedown="onCellMouseDown(item)"
                         @mousemove="onCellMouseMove(item)"
                         @mouseup="onCellMouseUp(item)"
                         @drop.prevent="onCellDrop(item,$event)"
                         @dragover.prevent="onCellDragOver"
                    >
                        <component
                                v-if="item.field!=null"
                                :is="'g-'+item.field.type"
                                :field="item.field"
                        ></component>
                    </div>
                </div>
                <div class="cell-attributes-panel">
                    <div class="panel-title">字段属性</div>
                    <component
                            v-if="selectedCells.length>0 && selectedCells[0].field!=null"
                            :is="'g-'+selectedCells[0].field.type+'-attrs'"
                            :field.sync="selectedCells[0].field"
                    ></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from "../assets/utils";
    import fieldsCom, {
        checkboxGroupField,
        customField,
        dateTimePickerField,
        fileField,
        inputField,
        inputNumberFiled,
        labelField,
        lineField,
        radioGroupField,
        tabField
    } from "./filed";


    export default {
        name: "FormDesigner",
        components:fieldsCom,
        data(){
            return{
                /**
                 * 表单的列数
                 */
                columnNum:2,
                /**
                 * 表单的行数
                 */
                rowNum:5,
                dragStart:null,
                dragEnd:null,
                isDrag:false,
                //所有的可用字段
                fieldItems:{
                    base:{
                        title:"基础字段",
                        list:[
                            labelField,
                            inputField,
                            inputNumberFiled,
                            radioGroupField,
                            checkboxGroupField,
                            dateTimePickerField,
                        ]
                    },
                    advanced:{
                        title:"高级字段",
                        list:[
                            customField,
                            fileField
                        ]
                    },
                    layout:{
                        title:"布局字段",
                        list:[
                            lineField,
                            tabField
                        ]
                    }
                },
                //单元格中的字段
                cellFields:[],
            }
        },
        computed:{
            /**
             * 编辑器样式
             */
            cellContainerStyle(){
                return {
                    gridTemplateColumns:`repeat(${this.columnNum},minmax(200px,1fr))`
                }
            },
            /**
             * 表格编辑器的单元格
             */
            editorCells(){
                let cells=[];
                for(let i=0;i<this.rowNum;i++){//对于每一行
                    for(let j=0;j<this.columnNum;j++){//对于行中这一列
                        cells.push(this.fillCell(i,j));
                    }
                }
                return cells;
            },
            /**
             * 被选中的单元格
             */
            selectedCells(){
                return this.editorCells.filter(cell=> cell.isSelected)
            }
        },
        methods:{
            onCellDragOver(event){
                event.dataTransfer.dropEffect = "copy";
            },
            onFieldDragStart(item,event){
                event.dataTransfer.setData("text/json",JSON.stringify(item));
            },
            onCellDrop(item,event){
                let pos = {row:item.row,column:item.column};
                //获取拖拽的字段
                let fieldObj=JSON.parse(event.dataTransfer.getData("text/json"));
                //构建单元格中的字段
                let cellField=this.buildCellField(fieldObj,pos);
                //记录
                let index = this.cellFields.findIndex(item=>this.posEqual(item,pos));
                if(index!==-1){//已存在
                    //更新
                    this.cellFields.splice(index,1,cellField);
                }else{//不存在
                    //新增
                    this.cellFields.push(cellField);
                }
            },
            posEqual(pos1,pos2){
                return pos1.row===pos2.row && pos1.column===pos2.column;
            },
            /**
             * 根据字段对象, 构建单元格中的字段
             * @param fieldObj 字段
             * @param pos 坐标
             * @return {object} 单元格中的字段对象
             */
            buildCellField(fieldObj,pos){
                switch (fieldObj.type) {
                    case "label":
                        return {...fieldObj, pos}
                }
            },
            /**
             * 填充单元格对象
             * @param row 行号
             * @param column 列号
             */
            fillCell(row,column){
                //更新isSelected字段
                let isSelected=false;
                if(this.dragStart!=null && this.dragEnd!=null){//处于拖拽或选中状态
                    if(utils.inRect(this.dragStart,this.dragEnd,{row,column})){//该单元格在拖拽范围内
                        isSelected=true;
                    }
                }
                //填充字段
                let cellField = this.cellFields.find(item=>this.posEqual(item.pos,{row,column}));
                //构建并返回对象
                return {
                    row,column,
                    isSelected,
                    field:cellField
                }
            },
            /**
             * 清空拖拽状态
             */
            initDragStatus(){
                this.dragStart=null;
                this.dragEnd=null;
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
</script>

<style lang="scss">
    .el-input{
        width: initial;
    }
</style>
<style lang="scss" scoped>
    @import "../assets/utils";

    .form-designer{
        display: flex;
        width: 100%;
        height: 100%;

        .field-sidebar{
            flex-basis: 150px;
            flex-shrink: 0;
            height: 100%;
            font-size: 0.8rem;
            border-right: solid 1px gray;

            .field-group{
                background-color: white;
                margin-bottom: 1rem;
                padding: 0.4rem;

                .field-group-title{
                    border-bottom: solid 1px gray;
                    margin-bottom: 0.5rem;
                }
                .field-group-content{
                    display: grid;
                    grid-template-columns:repeat(2,minmax(6rem,1fr));

                    .field-item{
                        background-color: #f4f6fc;
                        margin:0.2rem;
                        padding: 0.2rem;
                        cursor: pointer;
                    }
                }
            }
        }
        .designer-body{
            flex-grow: 1;
            padding: 1rem 0.5rem;
            display: flex;
            flex-direction: column;
            .tool-bar{
                border-bottom: solid 1px gray;
            }
            .form-editor{
                user-select: none;
                display: flex;
                flex-grow: 1;
                .cell-container{
                    flex: 1;
                    display: grid;
                    grid-auto-rows: 2rem;
                    padding:1rem;
                    .cell{
                        border:dashed 1px gray;
                        display: flex;
                        align-items: center;
                        &:hover{
                            background-color: #c8c8c8;
                            color: white;
                        }
                        &.isSelected{
                            background-color: #76ff78;
                        }
                    }
                }
                .cell-attributes-panel{
                    flex-shrink: 0;
                    flex-basis: 250px;
                    border-left: solid 1px gray;
                    .panel-title{
                        border-bottom: solid 1px gray;
                        padding:0.5rem 0.5rem;
                    }
                }
            }
        }

    }
</style>