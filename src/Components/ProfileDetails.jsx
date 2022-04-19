import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../Redux/Login/Action"
import todos from "../Redux/Todos/Reducer"

export default function  ProfileDetails () {

    const dispatch = useDispatch()
    const [userData, setUserData] = useState({})
    const userName = useSelector((store) => store.login.userName)
    const token = useSelector((store) => store.login.token);
    useEffect(() =>{
        fetch (`https://masai-api-mocker.herokuapp.com/user/${userName}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((res) => setUserData(res))
        .catch((err) => console.log(err))
    },[]);
    const handleLogout = () => {
 
        dispatch(logout())
    }

const {todos} = useSelector((state) => state.todos);
    console.log("todos",todos)
  return (
   <>
    <div>
      <div>
      <h3>Name: {userData.name}</h3>
      <h4>Email: {userData.email}</h4>
      <h4>Mobile: {userData.mobile}</h4>
      <h4>Username: {userData.username}</h4>
      <h4>Description: {userData.description}</h4>
      </div>

      <br /><br />

      <div id='todoscountProfile'>
        <div>All - {todos.filter((items)=> items.tags.official && items.tags.personal && items.tags.others).length} </div>
        <div>Personal - {todos.filter((items) => items.tags.personal).length}</div>
        <div>Official - {todos.filter((items) => items.tags.official).length}</div>
        <div>Others - {todos.filter((items) => items.tags.others).length}</div>
      </div>

      <br /><br />

      
      <button onClick={handleLogout}>Logout</button>
    </div>

    
   </>
  )
}
