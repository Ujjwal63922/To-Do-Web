//for 
import React,  { useEffect } from 'react'
import Home from './pages/Home'
import AllTodo from'./pages/AllTodo'
import {Route,Routes, useNavigate } from 'react-router-dom'
import ImportantTodo from './pages/ImportantTodo'
import CompletedTodo from './pages/CompletedTodo'
import IncompletedTodo from './pages/IncompletedTodo'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
//import store from './store'
const App = () => {
 const navigate= useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("id")&& localStorage.getItem("token")){
      dispatch(authActions.login());
    }
   else if(isLoggedIn===false){
      navigate("/signup");
    }
  },[]);

  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
   
        <Routes>
          <Route exact path="/" element={<Home/>}>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route index  element={<AllTodo/>}/>
          <Route path="/importanttodo"  element={<ImportantTodo/>}/>
         <Route path="/completedtodo"  element={<CompletedTodo/>}/>
          <Route path="/incompletedtodo"  element={<IncompletedTodo/>}/>
          </Route>
          
        </Routes>
 
      
    </div>
  )
}

export default App

