import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../Redux/Login/Action"
import { Navigate } from 'react-router-dom';

export default function Login () {

    const [username, setUsername] = useState("");
    const [password , setPassword] = useState("");
    const dispatch = useDispatch()
    const {isAuthenticate} = useSelector((store)=> store.login)
 
    const handleLogin = () => {
      const payload = {
        username,
        password
      };
      dispatch(login({username,password}))
    }
  
    if(isAuthenticate){
      return <Navigate to={"/"}/>
    }
  
    return (
      <div style={{border:"2px solid green", width:"300px", height:"350px", margin:"auto", marginTop:"20px"}}>
        <h1>Login</h1>
        <label>Username</label>
        <input type="text" placeholder='Enter UserName...' onChange={(e) => {setUsername(e.target.value)}}/><br /><br />
        <br></br>
        <br></br>
        <label>Password</label>
        

        <input type="text" placeholder='Enter Password...' onChange={(e) => {setPassword(e.target.value)}} /><br /><br />
        <br></br>
        <br></br>
  
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
  