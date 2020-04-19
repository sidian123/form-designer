import GLabel from "./GLabel";
import GLabelAttrs from "./GLabelAttrs";

export default {
    [GLabel.name]:GLabel,
    [GLabelAttrs.name]:GLabelAttrs
}

const labelField={type:"label",name:"标签",value:"label"};
const inputField={type:"input",name:"输入框"};
const inputNumberFiled={type:"inputNumber",name:"输入框"};
const radioGroupField={type:"radioGroup",name:"单选框组"};
const checkboxGroupField={type:"checkboxGroup",name:"多选框组"};
const dateTimePickerField={type:"dateTimePicker",name:"日期时间选择器"};
const customField={type:"custom",name:"自定义区域"};
const fileField={type:"file",name:"文件"};
const lineField={type:"line",name:"分割线"};
const tabField={type:"tab",name:"标签页"};

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
    tabField
}