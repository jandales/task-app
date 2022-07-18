import store from ".."

const state = {
    list : [],
    item  : null,
}

const getters = {
    list : (state) => {
        return state.list
    },
    item : (state) => {
        return state.item
    },
    listCount : (state) => {
        return state.list.length;
    },
    lastItemID : (state) => {       
        const length = state.list.length;
        if(length == 0) return 0;
        return state.list[length - 1].id;

    }
}
const mutations = {
    SET_LIST(state, data){   
        state.list = data;
    },
    SET_ITEM(state, data){
        state.item = data;
    }
}

const actions = {
    getList({commit}){   
        store.dispatch('getBoard', store.getters.selectedBoard) 
        if(store.getters.board == null) return;     
        const list = store.getters.board.list; 
        commit('SET_LIST', list);          
    },   
    addList({commit, getters, dispatch}, name){   
        dispatch('getList');
        let count = parseInt(getters.lastItemID)
        let list = getters.list;    
        count = count + 1;
        list.push({id : count, name: name, tasks : []})              
        commit('SET_LIST', list);
        console.log(list);
        store.dispatch('updateBoardList', list);
    },
    deleteList({commit,getters}, id){
      
        let list = getters.list; 
        for (let i = 0; i < list.length; i++) {
            if(list[i].id == id){
                list.splice(i,1);
            }           
        }
        commit('SET_LIST', list);
        store.dispatch('updateBoardList', list);          

    },



    renameList({getters}, params){
        let list = getters.list; 
        list.forEach(item => {
            if(item.id == params.id){
                item.name = params.name;
            }
            return item;
        })
        store.dispatch('updateBoardList', list); 
        store.dispatch('getBoard', 0);  
    },

    duplicate({getters}, data){
        let count = parseInt(getters.lastItemID) 
        data.id = count + 1;
        let list = getters.list; 
        list.push(data);
        store.dispatch('updateBoardList', list); 
        store.dispatch('getBoard', 0);  
    },



}

export default {
    state, 
    getters,
    mutations,
    actions
}