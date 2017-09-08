import { combineReducers } from 'redux'

import IndexReducer from './indexReducer.js'

export default combineReducers({
    index: IndexReducer
})