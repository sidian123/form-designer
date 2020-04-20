//表单设计器的配置
export const formDesignerConfig={
    /**
     * 表单的列数
     */
    columnNum:4,
    /**
     * 表单的行数
     */
    rowNum:5,
    /**
     * 每列比重默认值,默认奇数列列是偶数列的两倍
     */
    columnWidths(){
        let array=[];
        for(let i=1;i<=this.columnNum;i++){
            array.push(i%2!==0?1:2)
        }
        return array;
    },
};