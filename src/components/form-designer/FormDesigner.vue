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
                <el-button size="mini" @click="switchGridLine">显/隐网格</el-button>
                <el-button size="mini" @click="mergeCells" :disabled="!canMergeCells">单元格合并</el-button>
            </div>
            <div class="form-editor">
                <div class="cell-container">
                    <div class="cell-row"
                         v-for="(row,index) in editorCells"
                         :key="index"
                    >
                        <div class="cell"
                             v-for="(item,index) in row"
                             :class="{isSelected:item.isSelected && item.field==null,'show-grid':isShowGrid}"
                             :style="{width:getCellWidth(item)+'%'}"
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
                </div>
                <div class="attributes-panel">
                    <el-tabs v-model="activeAttrsPanel">
                        <el-tab-pane label="字段属性" name="cell">
                            <component
                                    v-if="selectedCells.length>0 && selectedCells[0].field!=null"
                                    :is="'g-'+selectedCells[0].field.type+'-attrs'"
                                    :field.sync="selectedCells[0].field"
                            ></component>
                        </el-tab-pane>
                        <el-tab-pane label="设计器属性" name="designer" class="designer-attrs-panel">
                            <div class="attr-item">
                                <div class="attr-key">行</div>
                                <div class="attr-value">
                                    <el-input-number size="mini" :min="0" v-model="rowNum"></el-input-number>
                                </div>
                            </div>
                            <div class="attr-item">
                                <div class="attr-key">列</div>
                                <div class="attr-value">
                                    <el-input-number size="mini" :min="0" v-model="columnNum"></el-input-number>
                                </div>
                            </div>
                            <hr>
                            <div class="attr-item" v-for="(item,index) in columnWidths" :key="index">
                                <div class="attr-key">{{`第${index+1}列`}}</div>
                                <div class="attr-value">
                                    <el-input-number size="mini"
                                                     :min="0"
                                                     v-model="columnWidthsReactive[index]"
                                                     @change="onColumnWidthChange"
                                    ></el-input-number>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fieldsCom, {fieldItems} from "../filed";
    import RenderEditorCells from "./mixins/RenderEditorCells";
    import MergeCells from "./mixins/MergeCells";
    import Common from "./mixins/Common";
    import SelectCells from "./mixins/SelectCells";
    import DynaicColumnWidth from "./mixins/DynaicColumnWidth";
    import FieldBuild from "./mixins/FieldBuild";


    export default {
        name: "FormDesigner",
        mixins:[RenderEditorCells,MergeCells,Common,SelectCells,DynaicColumnWidth,FieldBuild],
        components:fieldsCom,
        data(){
            return{
                activeAttrsPanel:"cell",
                isShowGrid:true,
                //所有的可用字段
                fieldItems,
                //单元格中的字段
                cellFields:[],
            }
        },
        computed:{
            /**
             * 被选中的单元格
             */
            selectedCells(){
                let cells=[];
                this.editorCells.forEach(rowCells=>rowCells.forEach(cell=>{
                    if(cell.isSelected){
                        cells.push(cell)
                    }
                }));
                return cells;
            }
        },
        methods:{
            switchGridLine(){
                this.isShowGrid=!this.isShowGrid;
            },
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
                let index = this.cellFields.findIndex(item=>this.posEqual(item.pos,pos));
                if(index!==-1){//已存在
                    //更新
                    this.cellFields.splice(index,1,cellField);
                }else{//不存在
                    //新增
                    this.cellFields.push(cellField);
                }
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
    @import "src/assets/utils";

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
                    flex-grow: 1;
                    padding:1rem;
                    .cell-row{
                        display: flex;
                        .cell{
                            min-height: 2rem;
                            display: flex;
                            align-items: center;
                            *{
                                width:100%
                            }
                            &.isSelected{
                                background-color: #eff9ef;
                            }
                        }
                    }
                    .show-grid{
                        border:solid 1px #f2f2f2;
                    }
                }
                .attributes-panel{
                    flex-shrink: 0;
                    flex-basis: 250px;
                    border-left: solid 1px gray;
                    padding: 0 0.2rem;

                    .designer-attrs-panel{
                        .attr-item{
                            display: flex;
                            align-items: center;
                            margin:1rem 0;
                            padding: 0 1rem;

                            .attr-key{
                                flex-basis: 6rem;
                                flex-shrink: 0;
                                padding-right: 2rem;
                            }
                            .attr-value{
                                flex-grow: 1;
                            }
                        }
                    }
                }
            }
        }

    }
</style>