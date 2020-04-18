export default {
    /**
     * x 是否位于[start,end]之间
     * @param start
     * @param end
     * @param x
     */
    isBetween(start,end,x){
        //交换, start最小
        if(start>end){
            let t=start;
            start=end;
            end=t;
        }
        //判断
        return x>=start && x<=end;
    },
    /**
     * 在方形内. 方形由start,end确定
     * @param start
     * @param end
     * @param pos ({row,column})
     */
    inRect(start,end,pos){
        return this.isBetween(start.row,end.row,pos.row) && this.isBetween(start.column,end.column,pos.column);
    }
}