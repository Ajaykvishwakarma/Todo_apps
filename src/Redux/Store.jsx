import {createStore, combineReducers, applyMiddleware, compose} from "redux";

import {loginReducer} from "./Login/Reducer.jsx"

import {todosReducer} from "./Todos/Reducer.jsx"

import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
     
    }) : compose;


const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),

);

const rootReducer = combineReducers({
    login : loginReducer,
    todos : todosReducer
});

export const store = createStore(rootReducer, enhancer);