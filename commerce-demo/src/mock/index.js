import  Mock from 'mockjs'
import interfaceData from './interfacedata'

Mock.mock('http://localhost:8085/getimageinfo',interfaceData.detailData)
Mock.mock('http://localhost:8085/getthumimages',interfaceData.thumImages);
Mock.mock(RegExp('http://localhost:8085/getcomments' + ".*"),(options)=>{
    console.log("------------获取--评论分页数据：")
    console.log(options);
    return Mock.mock(interfaceData.commentTxt)
});

Mock.mock(RegExp('http://localhost:8085/postcomments' + ".*"),(options)=>{
    console.log("------------提交--评论数据：")
    console.log(options);
    return Mock.mock(interfaceData.postCommentTxt)
});

//商品列表
Mock.mock(RegExp('http://localhost:8085/getgoods' + ".*"),(options)=>{
    console.log("------------商品列表数据：")
    console.log(options);
    return Mock.mock(interfaceData.goodsList)
});



//商品轮播图
Mock.mock(RegExp('/goodsLunBo' + ".*"),(options)=>{
    console.log("------------商品轮播图数据：")
    console.log(options);
    return Mock.mock(interfaceData.goodsLunBo)
});

//主页轮播图
Mock.mock(RegExp('/getlunbo' + ".*"),(options)=>{
    console.log("------------主页轮播图数据：")
    console.log(options);
    return Mock.mock(interfaceData.homeLunBo)
});

//商品详情里，获取 价格库存 j接口
Mock.mock(RegExp('goods/getinfo' + ".*"),(options)=>{
    console.log("------------商品详情数据：")
    console.log(options);
    return Mock.mock(interfaceData.goodsInfo)
});

//点击购物车，根据id获取购物信息
Mock.mock(RegExp('goods/shopCarList' + ".*"),(options)=>{
    console.log("------------购物车详情数据：")
    console.log(options);
    return Mock.mock(interfaceData.shopCarList())
});


///http:\/\/localhost:8085\/getcomments\/.*/
// RegExp('http://localhost:8085/getcomments' + ".*")  这个正则也可以
export  default  Mock;
