import {createStore,applyMiddleware} from 'redux'
import allReducers from './reducers/index'
//引入redux-thunk用于支持异步action
import thunk from 'redux-thunk'

//创建store，同时指定好为store所服务的reducer,随后暴露
export default createStore(allReducers,applyMiddleware(thunk))