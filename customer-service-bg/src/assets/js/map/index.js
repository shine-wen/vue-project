
//输入提示
var map = new AMap.Map("newOrder", {
    resizeEnable: true
});

var auto = new AMap.Autocomplete({
    // input: "start"
});

var  addressArr = [];
const getAdrressList= (position,keywords)=> {
    auto.search(keywords, (status, result)=> {
        // 搜索成功时，result即是对应的匹配数据
        if(status=="complete"){
            var dizhi_arr = result.tips;
            console.log(result)
            // addressArr = [];
            // dizhi_arr.forEach((values,index)=> {
            //     addressArr.push(values.district + values.address);
            // })
            // console.log(addressArr)
            return  dizhi_arr
        }
    })
}


export default getAdrressList