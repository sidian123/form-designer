import GLabel from "./g-lable/GLabel";
import GLabelAttrs from "./g-lable/GLabelAttrs";
import GInput from "./g-input/GInput";
import GInputAttrs from "./g-input/GInputAttrs";
import GTable from "./g-table/GTable";
import GTableAttrs from "./g-table/GTableAttrs";

//组件导出
export default {
    [GLabel.name]:GLabel,
    [GLabelAttrs.name]:GLabelAttrs,
    [GInput.name]:GInput,
    [GInputAttrs.name]:GInputAttrs,
    [GTable.name]:GTable,
    [GTableAttrs.name]:GTableAttrs,
}

const labelField={type:"label",name:"标签",value:"label"};
const inputField={
    type:"input",
    name:"输入框",
    inputType:"text",//输入框类型, 默认text,可选值:text|textarea
};
const inputNumberFiled={type:"inputNumber",name:"计数器"};
const radioGroupField={type:"radioGroup",name:"单选框组"};
const checkboxGroupField={type:"checkboxGroup",name:"多选框组"};
const dateTimePickerField={type:"dateTimePicker",name:"日期时间选择器"};
const customField={type:"custom",name:"自定义区域"};
const fileField={type:"file",name:"文件"};
const lineField={type:"line",name:"分割线"};
const tabField={type:"tab",name:"标签页"};
const tableField={
    type:"table",
    name:"表格布局",
    row:10,
    column:8,
    cells:[],//表格的所有单元格, 二维
};

//所有字段导出
export const fieldItems={
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
            tabField,
            tableField
        ]
    }
};