import GLabel from "./GLabel";
import GLabelAttrs from "./GLabelAttrs";
import GInput from "./GInput";
import GInputAttrs from "./GInputAttrs";

export default {
    [GLabel.name]:GLabel,
    [GLabelAttrs.name]:GLabelAttrs,
    [GInput.name]:GInput,
    [GInputAttrs.name]:GInputAttrs
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
const tableField={type:"table",name:"表格布局"};

export {
    labelField,
    inputField,
    inputNumberFiled,
    radioGroupField,
    checkboxGroupField,
    dateTimePickerField,
    customField,
    fileField,
    lineField,
    tabField,
    tableField,
}

/**
 * 根据字段对象, 构建单元格中的字段
 * @param fieldObj 字段
 * @param pos 坐标
 * @return {object} 单元格中的字段对象
 */
function buildCellField(fieldObj,pos){
    switch (fieldObj.type) {
        case "label":
        case "input":
            return {...fieldObj, pos};
        default:
            return {pos};
    }
}

export {
    buildCellField
}