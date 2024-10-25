//For Side bar It is like a Navbar

import React, { useEffect, useState } from 'react'
import {CgNotes} from "react-icons/cg";
import {MdLabelImportant} from "react-icons/md";
import {FaCheckDouble} from "react-icons/fa6";
import {TbNotebookOff} from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
const Sidebar = () => {
    const history=useNavigate();
    const dispatch=useDispatch();
    const data=[
        {
            title:"All Todo",
            icon:<CgNotes/>,
            link:"/",
        },{
            title:"Important Todo",
            icon:<MdLabelImportant/>,
            link:"/importanttodo",
        },
        {
            title:"Completed Todo",
            icon:<FaCheckDouble/>,
            link:"/completedtodo",
        },{
            title:"InCompleted Todo",
            icon:<TbNotebookOff/>,
            link:"/incompletedtodo",
        },
    ];
    const[Data,setData]= useState();
    const logout=()=>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/signin");
    };
    const headers={id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
useEffect(()=>{
  const fetch=async()=>{
    const response=await axios.get("http://localhost:1000/api/v2/get-all-todo",{headers});
    setData(response.data.data);
  };
  if(localStorage.getItem("id")&& localStorage.getItem("token")){
    fetch();}
    })
  return (
   <>
        {Data && (<div>
            <h2 className='text-xl font-semibold'>
            {Data.username}
            </h2 >
            <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
            <hr />
            </div>
        )}
        <div>
            {data.map((items,i)=>(
                <Link to={items.link} 
                key={i}
                className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300'>{items.icon}{items.title}</Link>
            )
            )}
        </div>
        <div>
            <button className='bg-gray-500 w-full p-2 rounded ' onClick={logout}>Logout</button>
        </div>
   </>
  )
}

export default Sidebar
