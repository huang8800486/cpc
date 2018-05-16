import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from "./actions"
import * as getters from "./getters"
import * as pageTitle from '../common/js/title';
Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态

var state = {
    "headerTitle": "彩摄汇摄影俱乐部",
    "menuShow": false,
    "FixedClass": false,
    "fetchLoading": false,
    "activityList": false,
    "activityNumber": 0,
    "dataIndex": Number(window.location.href.split("?item=")[1]) || 0
};

const mutations = {
    UPDATE_TITLE(state, title){
        state.headerTitle = title;
    },

    UPDATE_MENUSHOW(state){
        state.menuShow = !state.menuShow;
    },

    UPDATE_FETCHLOADING(state){
        state.fetchLoading = !state.fetchLoading;
    },

    UPDATE_ACTIVITYLIST(state, isBoolean){
        state.activityList = isBoolean;
    },

    UPDATE_ACTIVITYNUMBER(state, num){
        state.activityNumber = num;
    },

    UPDATE_DATAINDEX(state, num){
        state.dataIndex = num;
    },

    UPDATE_FIXEDCLASS(state, title){
        if(title === pageTitle.NAME_TITILE[2]){
            state.FixedClass = true;
        }else{
            state.FixedClass = false;
        }
    }
};

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});