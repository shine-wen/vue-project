import Mock from 'mockjs'
import interfaceData from './interfaceData'


Mock.mock('/api-order/addOrder',interfaceData.addOrder);//添加新订单
Mock.mock('/api-order/deteleOrder',interfaceData.deteleOrder);//删除订单
Mock.mock('/api-order/orderDetailList',interfaceData.orderDetailList);//订单详情-每个客服单独
Mock.mock('/api-order/getTotalOrder',interfaceData.getTotalOrder);//管理员查看全部订单



//main.js 要引入时（import） 要暴露导出
// export default Mock

