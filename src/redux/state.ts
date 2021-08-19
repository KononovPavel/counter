import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import {counterReducer} from "./reducers/counterReducer";


const rootReducer = combineReducers({
    counter:counterReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

export default store

// @ts-ignore
window.store = store
