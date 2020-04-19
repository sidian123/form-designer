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

## 详细设计
* FormDesigner.vue

    有两种状态:
    
    * 拖拽状态: 正按住鼠标拖拽
    * 选中状态: 拖拽状态+`isDrag`不为`false`的状态.
    
## 代办
- [ ] 可设置编辑器列大小
- [ ] 补全其他字段实现
- [ ] 允许字段跨多列


## 参考
[表单设计器](http://form.xiaoyaoji.cn/#/zh-CN/)