import Mock from 'mockjs'
const random=Mock.Random;
export default{
    addOrder:function () {
         var msg=Mock.mock({
              "status":random.boolean(1, 9, true),
               "data|1":[{
                       'name':'@cname()',
                       'address':'@cword(10,15)',
                        "createtime":'@date("yyyy-MM-dd")'
               }]
         })
        return msg
    },
    deteleOrder:function () {
        var msg=Mock.mock({
            "status":random.boolean(1, 9, false),
            "data|1":[{
                'msg':'删除成功',
            }]
        })
        return msg
    },
    orderDetailList:function () {
        var msg=Mock.mock({
            "status":random.boolean(1, 9, false),
            "data|10":[{
                'id':'@id()',
                'mobile':'13760810892',
                'name':'@cname()',
                 'date':'@datetime()',
                'car_type':'奥迪',
                "service_type|1": [
                    "拖车",
                    "搭电",
                    "换胎",
                    "开锁",
                    "困境",
                ],
                'begin_adr':'广东省广州市天河区大观中路95号',
                'take_order':'是',
                'service_provider':'广州车旅救援公司',
                'ser_moblie':'18318555512',
                'rescue_cost':'200',
                'platform_fee':'180',
                'remarks': '我备注-车主',
                "status|1": [
                    "1",
                    "0"
                ],
            }]
        })
        return msg
    },
    getTotalOrder:function () {
        var msg=Mock.mock({
            "status":random.boolean(1, 9, false),
            "data|8":[{
                'id':'@id()',
                'mobile':'13760810892',
                'name':'@cname()',
                'date':'@datetime()',
                'car_type':'奥迪',
                "service_type|1": [
                    "拖车",
                    "搭电",
                    "换胎",
                    "开锁",
                    "困境",
                ],
                'begin_adr':'广东省广州市天河区大观中路95号',
                'take_order':'是',
                'service_provider':'广州车旅救援公司',
                'ser_moblie':'18318555512',
                'rescue_cost':'200',
                'platform_fee':'180',
                'remarks': '我备注-车主',
                "status|1": [
                    "1",
                    "0"
                ],
            }]
        })
        return msg
    },
}
