import {formDesignerConfig} from "../../assets/config";


export default {
    data(){
        let columnWidths=formDesignerConfig.columnWidths();
        let columnWidthsReactive={};
        for(let i=0;i<columnWidths.length;i++){
            columnWidthsReactive[i]=columnWidths[i];
        }
        return {
            //每列比重
            columnWidths,
            columnWidthsReactive
        }
    },
    watch:{
        columnNum(val,oldVal){
            console.log(`${val},${oldVal}`);
            if(val>oldVal){//增加
                for(let i=oldVal+1;i<=val;i++){
                    //按照默认规则添加比重
                    this.columnWidths.push(val%2!==0?1:2);
                }
            }else{//减少
                let time=oldVal-val;
                while(time--){
                    //直接删掉
                    this.columnWidths.pop();
                }
            }
        }
    },
    computed:{
        /**
         * 每列百分比
         */
        columnPercentages(){
            let res=[];
            //总比例和
            let sum = this.columnWidths.reduce((acc, cur)=>acc+cur);
            //计算每列比例
            this.columnWidths.forEach(item=>{
                res.push((item/sum)*100);
            });
            return res;
        },
    },
    methods:{
        onColumnWidthChange(){
            for(let i=0;i<this.columnWidths.length;i++){
                this.$set(this.columnWidths,i,this.columnWidthsReactive[i]);
            }
        },
        /**
         * 计算cell宽度的百分比
         * @param cell
         */
        getCellWidth(cell){
            let res=0;
            for(let i=cell.column;i<cell.column+cell.width;i++){
                res+=this.columnPercentages[i];
            }
            return res;
        }
    }
}