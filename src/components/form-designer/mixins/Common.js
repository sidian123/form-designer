/**
 * 通用功能
 */
export default {
    methods:{
        /**
         * 两个坐标是否相等
         * @deprecated 请用utils.posEqual
         * @param pos1
         * @param pos2
         * @return {boolean}
         */
        posEqual(pos1,pos2){
            return pos1.row===pos2.row && pos1.column===pos2.column;
        }
    }
}