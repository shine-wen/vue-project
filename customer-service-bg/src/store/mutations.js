import getters from './getters'
const state={
     delid:null,
}
const mutations={
    delOrder(state,id){
        console.log(id)
        state.delid=id
    }
}

export  default {
    mutations,
    getters,
    state
}