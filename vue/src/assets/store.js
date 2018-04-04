import Vue from "Vue"
import Vuex from "Vuex"

Vue.use(Vuex)

const state = {
    count: 0
};

// 使用 export default 封装，让外部可以访问

const mutations={
        add(state){
            state.count+=1;
        },
        reduce(state){
            state.count-=1;
        }
    }


export default new Vuex.Store({
    state,
    mutations
});