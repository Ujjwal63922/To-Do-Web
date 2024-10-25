//For All Todo
import React, { useState,useEffect } from 'react'
import Card from '../components/Home/Card'
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';
const AllTodo = () => {
   
    const[InputDiv,setInputDiv]=useState("hidden");
    const[Data,setData]= useState(null);
    const[UpdatedData,setUpdatedData]=useState({
     id:"",
      title:"",
     desc:"",
    });
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
        });
 
  return (
<>
    <div>
        <div className='w-full flex justify-end px-4 py-2'>
            <button onClick={()=>setInputDiv("fixed")}>
              <IoIosAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' />
            </button>
        
        </div>
    {Data && <Card home={"true"} setInputDiv={setInputDiv} data={Data.todos} setUpdatedData={setUpdatedData}/>}
    </div>
    {<InputData InputDiv={InputDiv} setInputDiv={setInputDiv}   UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />}
</>
  )

}

export default AllTodo
