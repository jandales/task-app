const state = {
    boards : [], 
    board : null,  
}

const getters = {
    boards : (state) => {        
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
    SET_BOARD(state, data){
        state.board = data;
    },
    SET_BOARDS(state, data){
        state.boards = data;  
    }
}

const actions = {

    addBoard({commit,getters, dispatch}, data){ 

        let id = parseInt(getters.maxID) + 1     
        const board = {id : id, name: data, default : 0, list : [] }       

        dispatch('getBoards')       
        let boards = getters.boards;

        boards = [...boards, board]              
        dispatch('updateBoards', boards); 

        dispatch('getBoard', board.id)

        commit('SET_BOARDS', boards);
    },

    deleteBoard({commit,dispatch}, payload){
       const boards = JSON.parse(localStorage.getItem('boards'))    
       const data = boards.filter(board => {
            return board.id != payload;
       })
       commit('SET_BOARDS', data); 
       dispatch('updateBoards', data); 
    },

    renameBoard({commit, getters, dispatch}, params) {  
        const boards = getters.boards;
        const data = boards.filter(board => {
                if(board.id == params.id)   board.name = params.name;
                return board;
        })          
        commit('SET_BOARDS', data);
        dispatch('updateBoards', data)
    },

    getBoards({commit}) {       
        const boards = JSON.parse(localStorage.getItem('boards')) 
        if(boards == null) return;       
        commit('SET_BOARDS', boards);        
    },

    getBoard({commit}, id) { 
        const boards = JSON.parse(localStorage.getItem('boards'))  
        if(boards == null) return;
        let data  = null;  
        boards.forEach(board => {
            if(board.id == id) return data = board; 
        }) 
        commit('SET_BOARD', data);
    },

    updateBoardList({commit, getters, dispatch}, list){         
      

        dispatch('getBoards');
        let board = getters.board;  
        let boards = getters.boards;
      
        boards = boards.filter(item => {           
            if(item.id == board.id){ 
                item.list = list;
            }            
            return item;
        })  
     
        commit('SET_BOARDS', boards) 
        dispatch('updateBoards', boards)
    },

    search({commit, getters, dispatch}, name){
   
        dispatch('getBoard', getters.selectedBoard)
        let board = getters.board;
       
        let list  = board.list;
        let newList = [];

        for (let i = 0; i < list.length; i++) {            
            if( list[i].name.toLowerCase() == name.toLowerCase()){              
                newList.push(list[i])              
            }             
            for(let j = 0; j < list[i].tasks.length; j++){          
                if(list[i].tasks[j].name.toLowerCase() == name.toLowerCase()){
                    newList.push(list[i])
                }
            }            
        }

        board.list = newList;
        commit('SET_BOARD',board)
       
    },

    selectedBaord({commit}, id){   
        localStorage.setItem('selectedBoard', id)
    }, 

    updateBoards({commit}, boards){
      
        localStorage.setItem('boards', JSON.stringify(boards));
    }
        

}

export default {
    state,
    getters,
    mutations,
    actions,
}