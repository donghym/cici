# cici
## 便捷对象解析器
项目表单具有通用的属性，一般就是字段的写入，读取
或者change事件影响其他字段值的变化
// 具体表现
base 字段的属性包括 bRequired、bMustSelect、bShow、bHidden、disabled、readonly、label、className、value、order、style:{
    notes:[
        {
            placement:"right/bottom",
            type:"success/info/error/warning",
            content:"一段提示信息"
        }
    ],
    tips:[ //短信息
        {
            icon:"QuestionCircleOutlined",// Popover
            placement:"top/left/right/bottom/topLeft/topRight/bottomLeft/bottomRight/leftTop/leftBottom/rightTop/rightBottom",
            type:"success/info/error/warning",
        }
    ]
}
后缀、底部提示等信息,
input、inputArea :length 属性
inputNumber:  包含 小数位数、格式、min、max、四舍五入方式等
select、refer、upload、checkbox、radio

