import {GET_TODOS, GET_TODOS_LOADING, GET_TODOS_ERROR } from "./Actions"

const initState = {
    loading : false,
    error: false,
    todos: []
};

export const todosReducer = (store = initState, {type , payload}) => {
    
    switch (type){
        case GET_TODOS_LOADING: 
        return{...store, loading: true};

        case GET_TODOS:
            return{...store, loading:false, todos: [...payload], error:false};

        case GET_TODOS_ERROR:
            return{...store, loading:false, error:true, todos:[]};

        default :
        return store;   
    }
}