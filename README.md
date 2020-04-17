# form-designer

## 表单建模
```jsonc
//表单元数据
[   
    //表单
    form:[
        //表单元素
        {
            //占用列, 多个列以','分隔
            cols:'1,2',
            //占用行, 多个行以',',分隔
            rows:'1',
            //标签
            label:'性别',
            //属性或字段
            field:'sex',
            //表单类型, 如input,select,date...
            type:'select',
            //select类型时的可选值,来自基础数据
            options:'男|女',
        }
        {...},
        ...
    ],
    //关联的流程定义
    processDefId:'xfawdfwesdfsadfw',
    ...
]
```

* 表单元素

    不同类型的元素的字段都会不同
