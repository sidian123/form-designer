/**
 * 字段构建相关的功能
 */
export default {
    methods: {
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