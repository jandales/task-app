
import { createStore } from 'vuex'
import boards from './module/boards'
import List from './module/List'
import tasks from './module/task'


export default createStore ({  
    modules : {
        boards : boards,
        list  : List,
        tasks : tasks,
    }
 })