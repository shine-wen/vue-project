import getters from './getters'
const  state={
    header:true,
    loading:false,
    hideFooter:true
}

const  mutations={
     showHeader(state){
         state.header=true
     },
    hideHeader(state){
        state.header=false
    },
    hideFooter(state){
        state.hideFooter=false
    },
    showFooter(state){
        state.hideFooter=true
    },
    showLoading(state){
        state.loading=true
    },
    hideLoading(state){
        state.loading=false
    }

}

export  default {
    state,
    mutations,
    getters
}
