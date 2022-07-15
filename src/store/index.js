import { createStore } from 'vuex'
import boards from './module/boards'

export default createStore ({  

    modules : {
        boards : boards
    }
 })