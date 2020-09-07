let obj={}

//{key:value}
//{商品id:商品数量}

//保存商品
obj.saveGoods=function (goodsList) {
      window.localStorage.setItem('goodsList',JSON.stringify(goodsList))
}

//获取所有商品
obj.getGoodsList=function () {
     return JSON.parse(window.localStorage.getItem('goodsList') || '{}')
}

//增加商品
obj.add=function (goods) {
     let goodsList=this.getGoodsList();
     if(goodsList[goods.id]){
         goodsList[goods.id]+=goods.num;
     }else {
         goodsList[goods.id]=goods.num;
     }

     this.saveGoods(goodsList);
}

//获取购物车的数量
obj.gtTotalCount=function () {
    let goodsList=this.getGoodsList();
    let values=Object.values(goodsList);
    let sum=0;
    values.forEach(val=>{
        sum+=parseInt(val);
    })
    return sum;
}

export  default obj