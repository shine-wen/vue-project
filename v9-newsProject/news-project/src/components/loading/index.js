import  LoadingComponent from './Loading'
// const LoadingComponent = require('./Loading.vue')
const loading = {
  install:function(Vue) {
    Vue.component('loading',LoadingComponent)
  }
}
export  default  loading
// module.exports = loading
//用上面的导出方法 会报下面的错
// vue.esm.js?efeb:628 [Vue warn]: Failed to mount component: template or render function not defined.