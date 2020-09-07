import Mock from 'mockjs';
const random=Mock.Random;

export default {
//     图文详情数据
       detailData:function () {
           var msg= Mock.mock({
               // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
               'list': [{
                   'id|0-100':0,
                   'click|1-100':0,
                   'title': '@ctitle(25)',
                   'content':'@cword(100)',
                    'time': '@date("yyyy-MM-dd")',
               }]
           })
           return msg;
       },
      thumImages:function(){
          // var ret= Mock.mock({
          //     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
          //     // 'list|5': [{
          //     //     'image': random.image('200x200', random.color(), random.color(), 'Mock.js'),
          //     // }]
          // })
          var ret={list:[]};
          for(var i=0;i<5;i++){
              ret.list.push(Mock.mock({
                     'h':400,
                     'w':600,
                     'src':random.image('500x500', random.color(), random.color(), 'Mock.js'),
                     'msrc':random.image('200x200', random.color(), random.color(), 'Mock.js'),
              }))
          }
          return ret;
    },
       commentTxt:function () {
           var msg= Mock.mock({
               // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
               'list|10': [{
                   'canme': '@cname()',//中文名
                   'content':'@cword(10,15)',
                   'time': '@date("yyyy-MM-dd")'
               }]
           })
           return msg;
       },
    postCommentTxt:function () {
        var msg= Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1': [{
                'canme': '@cname()',//中文名
                'content':'@cword(10, 15)',
                'time':random.now('second'),
                'status':'@boolean'
            }]
        })
        return msg;
    },
    goodsList:function () {
        var ret={list:[]};
        for(var i=0;i<8;i++){
            ret.list.push(Mock.mock({
                'id|0-9999':0,
                'click|1-100':0,
                'time':random.now('second'),
                'title': '@ctitle(10,20)',
                'content':'@cword(15)',
                'src':random.image('150x200', random.color(), random.color(), 'Mock.js'),
                'sell_price': '@integer(250,400)',//随机价格
                'or_price': '@integer(400,1000)',//随机原价格
                'img': '@image()',//随机图片
                'stock':'@integer(3,50)',//库存
            }))
        }
        return ret;
    },

//    主页轮播图数据
      homeLunBo:function () {

          var msg= Mock.mock({
              // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
              'list|3': [{
                  'src':random.image('750x360', random.color(), random.color(), '@cword(5)'),
              }]
          })
          return msg;
      },
    goodsLunBo:function () {
        var msg= Mock.mock({
            'list|3': [{
                'src':random.image('750x360', random.color(), random.color(), '商品@cword(3)'),
            }]
        })
        return msg;
    },
//    商品详情数据 库存 价格..
    goodsInfo:function () {
        var msg= Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1': [{
                'id|0-9999':0,
                // 'time':random.now('second'),
                'time':'@date("T")',
                'title': '@ctitle(10,16)',
                'coed':'@natural()',
                'sell_price': '@integer(250,400)',//随机价格
                'or_price': '@integer(400,1000)',//随机原价格
                'stock':'@integer(3,10)',//库存

            }]
        })
        return msg;
    },
    shopCarList:function () {
        var msg= Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|3': [{
                'id|0-9999':0,
                'time':'@date("T")',
                'title': '@ctitle(10,16)',
                'coed':'@natural()',
                'sell_price': '@integer(250,400)',//随机价格
                'or_price': '@integer(400,1000)',//随机原价格
                'stock':'@integer(3,10)',//库存
                'src':random.image('80x80', random.color(), random.color(), '商品@cword(3)')
            }]
        })
        return msg;
    }


}