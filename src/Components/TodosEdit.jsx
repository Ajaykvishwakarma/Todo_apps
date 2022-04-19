import { Action } from "history";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {getTodos, getTodosData} from "../Redux/Todos/Actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const initState = {
  title: "",
  description: "",
  subtasks: [],
  status: "",
  tags: { official: false, personal: false, others: false },
  date: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_TITLE":
      return { ...state, title: payload };

    case "UPDATE_DESCRIPTION":
      return { ...state, description: payload };

    case "UPDATE_STATUS":
      return { ...state, status: payload };

    case "UPDATE_TAGS":
      return { ...state, tags: { ...state.tags, ...payload } };

    case "CHANGE_DATE":
      return {...state, date:payload};

    case "UPDATE_SUBTASK":
      return {...state, subtasks: [...state.subtasks,payload]}

    case "TOGGLE_SUBTASK":
      const subtasksAfterToggle = state.subtasks.map((el) => 
      el.id === payload.id ? {...el , subtaskStatus: payload.status} : el);
      return {...state, subtasks: subtasksAfterToggle};

    case "DELETE_SUBTASK":
      const subatsksAfterDeletion = state.subtasks.filter((el) => el.id !== payload);
      return {...state, subtasks: subatsksAfterDeletion};

    case "RESET":
    return{...initState}

    case "UPDATE_STATE":
        return{...state, ...payload}

    default:
      return state;
  }
};

export default function  TodosEdit() {

  const [state, dispatch] = React.useReducer(reducer, initState);
  const reduxDispatch = useDispatch()

  const { title, description, subtasks, status, tags, date } = state;

  const [subTaskInput, setSubTaskInput] = useState("");
  const {id} = useParams()
  console.log("param", id)
  const navigate = useNavigate()

useEffect(()=>{
    fetch(`http://localhost:8080/todos/${id}`)
    .then((res) => res.json())
    .then((res) => {dispatch({
        type: "UPDATE_STATE",
        payload : res,
    })})
},[])

  const createNewTask = () => {
    const payload = { ...state};
    fetch('http://localhost:8080/todos' , {
      method : "POST",
      body: JSON.stringify(payload),
      headers: {"Content-Type" : "application/json"}
    }).then(() => reduxDispatch(getTodosData()))
    // make the input empty
    .then(() => dispatch({type: "RESET"}))

  }

  const EditTask =() =>{
    const payload = { ...state}
    fetch(`http://localhost:8080/todos/${id}`,{
        method:"PUT",
        body: JSON.stringify(payload),
        headers : {"Content-Type" : "application/json"}
    })
    .then(() => reduxDispatch(getTodosData()))
    .then(() => navigate("/"))
  };
 
  const{official, personal, others} = tags
 

  return (
    <div>
      <h1>Todos</h1>

      <input
        type="text"
        placeholder="TITLE"
        value={title}
        onChange={(e) => {
          dispatch({ type: "UPDATE_TITLE", payload: e.target.value });
        }}
      />
      <br />
      <br />

      <input
        type="text"
        placeholder="DESCRIPTION"
        value={description}
        onChange={(e) => {
          dispatch({ type: "UPDATE_DESCRIPTION", payload: e.target.value });
        }}
      />
      <br />
      <br />

      <div>
        <label>
          <input
            type="radio"
            checked={status === "Todo"}
            onChange={() =>
              dispatch({ type: "UPDATE_STATUS", payload: "Todo" })
            }
          />Todo
        </label><br />

        <label>
          <input
            type="radio"
            checked={status === "InProgress"}
            onChange={() =>
              dispatch({ type: "UPDATE_STATUS", payload: "InProgress" })
            }
          />In Progress
        </label><br />

        <label>
          <input
            type="radio"
            checked={status === "Done"}
            onChange={() =>
              dispatch({ type: "UPDATE_STATUS", payload: "Done" })
            }
          />Done
        </label><br />
      </div><br />

      <div>
        <label>
          <input type="checkbox" checked={official} onChange={(e) => {
            dispatch({
              type: "UPDATE_TAGS",
              payload: { official: e.target.checked }
            })
          }} /> OFFICIAL
        </label><br />

        <label>
          <input type="checkbox" checked={personal} onChange={(e) => {
            dispatch({
              type: "UPDATE_TAGS",
              payload: { personal: e.target.checked }
            })
          }} /> PERSONAL
        </label><br />

        <label>
          <input type="checkbox" checked={others} onChange={(e) => {
            dispatch({
              type: "UPDATE_TAGS",
              payload: { others: e.target.checked }
            })
          }} /> OTHERS
        </label><br />
      </div><br />

      <input type="date" 
      value={date}
      onChange = {(e) => {
        dispatch({
          type: "CHANGE_DATE",
          payload: e.target.value 
        })
      }}/> <br /> <br />

      <h1>Create sub task</h1>

      <input type="text" value={subTaskInput} onChange = {(e) => {
        setSubTaskInput(e.target.value)
      }} />

      <button onClick={ () => {
        const payload = {
          id : uuidv4(),
          subtaskTitle : subTaskInput,
          subtaskStatus: false
        }

        dispatch({type: "UPDATE_SUBTASK" , payload});
        
        setSubTaskInput("")
      }} > add sub task</button><br /><br />

      <div>
        {
          subtasks.map((subtask) => (
            <div key = {subtask.id}>
              <label>
              <input type="checkbox" 
              checked= {subtask.subtaskStatus}
              onChange ={(e) => {
                dispatch({type: "TOGGLE_SUBTASK" ,
                payload:{id: subtask.id, status: e.target.checked}})
              }}
              />{subtask.subtaskTitle}
            </label>

            <button onClick={() => {
              dispatch({
                type: "DELETE_SUBTASK",
                payload: subtask.id 
              })
            }}>delete subtask</button>
            </div>
          ))
        }
      </div>

      <button onClick={ EditTask}>Edit Task</button><br /><br /><br />

    </div>
  );
}
