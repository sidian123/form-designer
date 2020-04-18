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
                         @mousedown="onCellMouseDown"
                         @mousemove="onCellMouseMove"
                         @mouseup="onCellMouseUp"
                    >
                        {{`${item.row},${item.column}`}}
                    </div>
                </div>
                <div class="cell-attributes-panel">
                    <div class="panel-title">字段属性</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from "../assets/utils";

    export default {
        name: "FormDesigner",
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
                            {type:"label",name:"标签"},
                            {type:"input",name:"输入框"},
                            {type:"inputNumber",name:"输入框"},
                            {type:"radioGroup",name:"单选框组"},
                            {type:"checkboxGroup",name:"多选框组"},
                            {type:"dataTimePicker",name:"日期时间选择器"},
                        ]
                    },
                    advanced:{
                        title:"高级字段",
                        list:[
                            {type:"custom",name:"自定义区域"},
                            {type:"file",name:"文件"}
                        ]
                    },
                    layout:{
                        title:"布局字段",
                        list:[
                            {type:"line",name:"分割线"},
                            {type:"tab",name:"标签页"}
                        ]
                    }
                }
            }
        },
        computed:{
            cellContainerStyle(){
                return {
                    gridTemplateColumns:`repeat(${this.columnNum},minmax(200px,1fr))`
                }
            },
            //表格编辑器的单元格
            editorCells(){
                let cells=[];
                for(let i=0;i<this.rowNum;i++){//对于每一行
                    for(let j=0;j<this.columnNum;j++){//对于行中这一列
                        cells.push(this.fillCell(i,j));
                    }
                }
                return cells;
            }
        },
        methods:{
            /**
             * 填充单元格对象
             * @param row 行号
             * @param column 列号
             */
            fillCell(row,column){
                //更新isSelected字段
                let isSelected=false;
                if(this.dragEnd!=null){//处于拖拽或选中状态
                    if(
                        utils.isBetween(this.dragStart.row,this.dragEnd.row,row) &&
                        utils.isBetween(this.dragStart.column,this.dragEnd.column,column)
                    ){//该单元格在拖拽范围内
                        isSelected=true;
                    }
                }
                //构建并返回对象
                return {
                    row,column,isSelected
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
             * @param event
             */
            onCellMouseMove(event){
                if(this.isDrag){//处于拖拽状态
                    //更新dragEnd状态
                    let array=event.target.getAttribute("id").split(',');
                    this.dragEnd={
                        row:parseInt(array[0]),
                        column:parseInt(array[1])
                    };
                }
            },
            /**
             * 拖拽中
             * @param event
             */
            onCellMouseUp(event){
                //更新dragEnd状态
                let array=event.target.getAttribute("id").split(',');
                this.dragEnd={
                    row:parseInt(array[0]),
                    column:parseInt(array[1])
                };
                //退出拖拽状态
                this.isDrag=false;
            },
            /**
             * 拖拽中
             * @param event
             */
            onCellMouseDown(event){
                this.isDrag=true;
                let array=event.target.getAttribute("id").split(',');
                this.dragStart={
                    row:parseInt(array[0]),
                    column:parseInt(array[1])
                };
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