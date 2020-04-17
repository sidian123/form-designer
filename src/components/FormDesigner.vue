<template>
    <div class="form-designer">
        <div class="field-sidebar">
            <div class="field-group">
                <div class="field-group-title">基础字段</div>
                <div class="field-group-content">
                    <div class="field-item">单行文本</div>
                    <div class="field-item">多行文本</div>
                    <div class="field-item">计数器</div>
                    <div class="field-item">单选框组</div>
                    <div class="field-item">多选框组</div>
                    <div class="field-item">时间选择器</div>
                    <div class="field-item">日期选择器</div>
                    <div class="field-item">文本</div>
                </div>
            </div>
            <div class="field-group">
                <div class="field-group-title">高级字段</div>
                <div class="field-group-content">
                    <div class="field-item">自定义区域</div>
                    <div class="field-item">文件</div>
                </div>
            </div>
            <div class="field-group">
                <div class="field-group-title">布局字段</div>
                <div class="field-group-content">
                    <div class="field-item">分割线</div>
                    <div class="field-item">标签页</div>
                </div>
            </div>
        </div>
        <div class="designer-body">
            <div class="tool-bar">我是工具栏</div>
            <div class="form-editor">
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormDesigner",
        data(){
            return{
                /**
                 * 表单的列数
                 */
                columnNum:4,
                /**
                 * 表单的行数
                 */
                rowNum:5,
                dragStart:null,
                dragEnd:null,
                isDrag:false,
                editorCells:[],
            }
        },
        created() {
            this.refreshEditorCells();
        },
        watch:{
            dragStart(){
                this.refreshEditorCells();
            },
            dragEnd(){
                this.refreshEditorCells();
            }
        },
        methods:{
            /**
             * 刷新编辑器
             */
            refreshEditorCells(){
                let cells=[];
                for(let i=0;i<this.rowNum;i++){//对于每一行
                    for(let j=0;j<this.columnNum;j++){//对于行中这一列
                        cells.push(this.fillCell(i,j));
                    }
                }
                this.editorCells=cells;
            },
            /**
             * 填充单元格对象
             * @param row 行号
             * @param column 列号
             */
            fillCell(row,column){
                //更新isSelected字段
                let isSelected=false;
                if(this.dragEnd!=null){//处于拖拽或选中状态
                    if(row>=this.dragStart.row && row<=this.dragEnd.row &&
                        column>=this.dragStart.column && column<=this.dragEnd.column){//该单元格在拖拽范围内
                        isSelected=true;
                    }
                }

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
                    console.log(event.target.getAttribute("id"));
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
                console.log(event.target.getAttribute("id"));
            },
        }
    }
</script>

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
            .tool-bar{
                border-bottom: solid 1px gray;
                margin-bottom: 1rem;
            }
            .form-editor{
                display: grid;
                grid-template-columns:repeat(4,minmax(200px,1fr));
                user-select: none;

                .cell{
                    line-height: 2rem;
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
        }

    }
</style>