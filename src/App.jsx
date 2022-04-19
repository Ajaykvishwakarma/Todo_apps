import logo from './logo.svg';
import './App.css';
import {Route, Routes, Link, Navigate, useNavigate} from "react-router-dom";
import Home  from "./Components/Home";
// import {LoginPg} from "./Components/LoginPg";
import Login from "./Components/Login"
import TodosCreate from "./Components/TodosCreate";
import { useSelector } from 'react-redux';
import TodosEdit from './Components/TodosEdit';


const PrivateRoute = ({isAuthenticate, children}) => {
  return isAuthenticate ? children : <Navigate to={"/login"}/> 
}
 
function App() {
  const navigate = useNavigate()
  const isAuthenticate = useSelector((store) => store.login.isAuthenticate)


  return (
    <div className="App">
     <h1>Todo Application</h1>
     <div style={{ margin:"auto", display:"flex", gap:"10px", width:"200px"}}>
       <button onClick={() => {navigate("/login")}}>Login</button>
       <button onClick={() => {navigate("/")}}>Home</button>
       <button onClick={() => {navigate("/todos-create")}}>Todos</button>
     
     </div>

      <Routes>
        <Route path='/login' element={<Login/>}></Route>

        <Route path='/' element={
          <PrivateRoute isAuthenticate={isAuthenticate}><Home/></PrivateRoute>
        }></Route>


        <Route path='/todos-create' element={
          <PrivateRoute isAuthenticate={isAuthenticate}><TodosCreate/></PrivateRoute>
        }></Route>


        <Route path='/todos/:id/edit' element={
          <PrivateRoute isAuthenticate={isAuthenticate}><TodosEdit/></PrivateRoute>
        }></Route>

      </Routes>

    </div>
  );
}

export default App;
