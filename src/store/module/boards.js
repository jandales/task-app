const state = {
    boards : [], 
    board : null,  
}

const getters = {
    boards : (state) => { 
        state.boards = JSON.parse(localStorage.getItem('boards'))
        return state.boards;
    },
    board : (state) => {
        return state.board;
    },
    count : state => {
        return state.boards.length;
    },
    maxID : (state) => {   
        const length = state.boards.length;
        if(length == 0) return 0;                 
        return state.boards[length - 1].id; 
    },
    selectedBoard : () => {
        return localStorage.getItem('selectedBoard')
    }
}

const mutations = {
    ADD_BOARD(state, data){
        state.boards.push(data);
        localStorage.setItem('boards', JSON.stringify(state.boards));
    },
    UPDATE_BOARDS(state, data) {
        state.boards = data;
        localStorage.setItem('boards', JSON.stringify(state.boards));
    },
    UPDATE_BOARD(state, data) {
        state.board = data;
        localStorage.setItem('boards', JSON.stringify(state.boards));
    },
    SET_BOARD(state, data){
        state.board = data;
    }  
}

const actions = {

    addBoard({commit,getters, dispatch}, data){ 
        let id = parseInt(getters.maxID) + 1     
        const board = {id : id, name: data, default : 0, list : [] }
        commit('ADD_BOARD', board);
    },

    deleteBoard({commit, getters}, payload){
       const boards = getters.boards;
       const data = boards.filter(board => {
            return board.id != payload;
       })
       commit('UPDATE_BOARDS', data);
    },

    renameBoard({commit, getters}, params) {
        const boards = getters.boards;
        const data = boards.filter(board => {
                if(board.id == params.id)   board.name = params.name;
                return board;
        })  
        commit('UPDATE_BOARDS', data);
    },

    getBoard({commit, getters}, id) {       
        const boards = getters.boards;  
        if(boards == null) return;
        let data  = null;  
        boards.forEach(board => {
            if(board.id == id) return data = board; 
        }) 
        commit('SET_BOARD',data);
    },

    updateBoardList({commit, getters}, list){    
        let board = getters.board;  
        let boards = getters.boards;
    
      

        boards = boards.filter(item => {           
            if(item.id == board.id){ 
                item.list = list;
            }
            
            return item;
        })        
       
        commit('UPDATE_BOARDS', boards) 

    },
    selectedBaord({commit}, id){   
        localStorage.setItem('selectedBoard', id)
    }
        

}

export default {
    state,
    getters,
    mutations,
    actions,
}