
const state = {
    boards : [
        { id : 0, name : 'Main board', default : 1 }        
    ],
   
}

const getters = {
    boards : state => {
        return state.boards;
    },
    count : state => {
        return state.boards.length;
    }
}

const mutations = {
    ADD_BOARD(state, data){
        state.boards.push(data);
    },
    UPDATE_BOARD(state, data) {
        state.boards = data;
    }
}

const actions = {
    addBoard({commit, getters}, data){      
        const board = {id : getters.count, name: data, default : 0 }
        commit('ADD_BOARD', board);
    },
    deleteBoard({commit, getters}, payload){
       const boards = getters.boards;
       const data = boards.filter(board => {
            return board.id != payload;
       })
       commit('UPDATE_BOARD', data);
    },
    updateBoard({commit, getters}, params) {
        const boards = getters.boards;
        const data = boards.filter(board => {
                if(board.id == params.id){
                    board.name = params.name;
                }
                return board;
        })
        console.log(data)
        commit('UPDATE_BOARD', data);
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}