
import store from ".."

const state = {
    tasks : [],    
}

const getters = {
    tasks : (state) => {
        return state.tasks;
    },  
    maxTaskID : (state) => {   
        const length = state.tasks.length;
        if(length == 0) return 0;                 
        return state.tasks[length - 1].id; 
    },  
}

const mutations = {
    SET_TASKS(state, data){
        state.tasks = data;
    },
}

const actions = {
    getTasks({commit}, id){       
        const list  = store.getters.board.list;
        let tasks = null;
        list.forEach(item => {
            if(item.id == id){
                tasks = item.tasks;
            }
        });

        commit('SET_TASKS', tasks);  

    },

    addTask({commit, getters, dispatch}, params) { 
        // get list of task
        dispatch('getTasks',params.id)             
        let task = params.task;
        task['id'] =  parseInt(getters.maxTaskID) + 1;       
    
        let tasks = getters.tasks;
        tasks = [...tasks, task]
        //commit tasks
        commit('SET_TASKS', tasks)  
        //update list       
        dispatch('updateList', params.id)
        
    },

    renameTask({commit,getters, dispatch}, params) { 
        dispatch('getTasks',params.id)
        let tasks = getters.tasks;   
        tasks.forEach(task => {
            if(task.id == params.taskId){
                task.name = params.name;
            }
        })
    
        commit('SET_TASKS', tasks)  
        //update list       
        dispatch('updateList', params.id)

    },

    changeStatusTask({commit,getters, dispatch}, params){       
        dispatch('getTasks',params.id)
        let tasks = getters.tasks;   
        tasks.forEach(task => {
            if (task.id == params.taskId) {
                task.status = 'completed';
            }
        })    
        commit('SET_TASKS', tasks)  
        //update list       
        dispatch('updateList', params.id)
    },

    removeTask({commit, dispatch, getters}, params) {
        dispatch('getTasks',params.id)
        let tasks = getters.tasks; 
        tasks = tasks.filter(task => {
            if (task.id != params.taskId) {
                return task;
            }
        })  
          
        commit('SET_TASKS', tasks)  
        //update list       
        dispatch('updateList', params.id)
    },

    updateList({getters}, id) {

        let board = store.getters.board;       

        const  list =  board.list.filter(item => {
            if (item.id == id) { 
                item.tasks = getters.tasks;
            } 
            return item;
        }); 

        store.dispatch('updateBoardList', list)

    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}