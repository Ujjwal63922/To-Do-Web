import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
const Card = ({home,setInputDiv,data,setUpdatedData}) => {
    const headers={id:localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
//For Complete todo
    const handleCompleteTodo=async(id)=>{
        try {
        await axios.put(
                `http://localhost:1000/api/v2/update-complete-todo/${id}`,
                {},
                {headers});
 
        } catch (error) {
            console.log(error);
        }
    };
//For Handling Important
    const handleImportant=async(id)=>{
        try {
        await axios.put(
                `http://localhost:1000/api/v2/update-imp-todo/${id}`,{},{headers});
 
        } catch (error) {
            console.log(error);
        }
    };
    //For Handling Update Todo
    const handleUpdate= async(id,title,desc)=>{
      setInputDiv("fixed");

      setUpdatedData({id:id,title:title,desc:desc});
    }
    const deleteTodo=async(id)=>{
        try {
     const response= await axios.delete(
                `http://localhost:1000/api/v2/delete-todo/${id}`,{headers});
                console.log(response.data.message);
 
        } catch (error) {
            console.log(error);
        }
    };



   return (<div className="grid grid-cols-3 gap-4 p-4">
    {data && data.map((items,i)=>(
    <div className='flex flex-col jsutify-between bg-gray-800 rounded-sm p-4'>
    <div>
        <h3 className='test-xl font-semibold'>{items.title}</h3>
        <p className='text-gray-300 my-2'>{items.desc}</p>
    </div>
    <div className='mt-4 w-full flex items-center'>
            <button className={`${items.complete==="false"?"bg-red-400":"bg-green-700"} p-2 rounded w-3/6 `}onClick={()=>handleCompleteTodo(items._id)}>
                {items.complete===true ? "completed":"Incompleted"}</button>
            <div className='text-white  p-2 3/6 text-2xl font-semibold flex justify-around'>
                <button onClick={()=>handleImportant(items._id)}>
            {items.important===false?<CiHeart/>:
                    <FaHeart className='text-red-500' />}</button>
                    {home!==false &&
                <button onClick={()=>handleUpdate(items._id,items.title,items.desc)}>
                     <FaEdit/></button>}
                <button onClick={()=>deleteTodo(items._id)}><MdDelete/></button>
            </div>
        </div>
        </div>
    ))}
         {home==="true" && (
            <button onClick={()=>setInputDiv("fixed")}
             className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300'>
            <IoIosAddCircle className='text-5xl' />
                <h2 className='text-2xl text-gray-300 mt-4'>Add Todo</h2>
            </button>
    )}

   </div>
   )
}

export default Card
