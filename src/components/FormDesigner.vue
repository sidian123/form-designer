<template>
    <div class="form-designer">
        <div class="func-bar"></div>
        <div class="form-editor">
            <div class="cell"
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
            this.editorCells=this.refreshEditorCells();
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
            refreshEditorCells(){
                let cells=[];
                for(let i=0;i<this.rowNum;i++){//对于每一行
                    for(let j=0;j<this.columnNum;j++){//对于行中这一列
                        cells.push({
                            row:i,column:j
                        })
                    }
                }
                return cells;
            },
            initDragStatus(){
                this.dragStart=null;
                this.dragEnd=null;
            },
            onCellMouseMove(event){
                if(this.isDrag){
                    let array=event.target.getAttribute("id").split(',');
                    this.dragEnd={
                        row:parseInt(array[0]),
                        column:parseInt(array[1])
                    };
                    console.log(event.target.getAttribute("id"));
                }
            },
            onCellMouseUp(event){
                this.initDragStatus();

                console.log(event.target.getAttribute("id"));
            },
            onCellMouseDown(event){
                this.isDrag=true;
                let array=event.target.getAttribute("id");
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
        .form-editor{
            display: grid;
            grid-template-columns:repeat(4,minmax(200px,1fr));
            user-select: none;

            .cell{
                line-height: 2rem;
                &:hover{
                    background-color: black;
                    color: white;
                }
            }
        }
    }
</style>