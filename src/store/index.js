
import { createStore } from 'vuex'
import boards from './module/boards'
import List from './module/List'


export default createStore ({  
    modules : {
        boards : boards,
        list  : List
    }
 })