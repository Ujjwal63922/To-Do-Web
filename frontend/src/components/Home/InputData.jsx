//for getting data of todos
import React, { useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import axios from 'axios';
const InputData = ({InputDiv,setInputDiv,UpdatedData,setUpdatedData}) => {
  const[Data,setData]=useState({title:"",desc:""});
  const headers={id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
    
   useEffect(()=>{
      setData({title:UpdatedData.title,desc:UpdatedData.desc});
    },[UpdatedData])
    
    const change=(e)=>{
      const {name,value}=e.target;
      setData({...Data,[name]:value});
    };

    const submitData=async()=>{
      if(Data.title===""||Data.desc===""){
        alert("All field are required");
      }else{
      await axios.post("http://localhost:1000/api/v2/create-todo",Data,{headers,});
      setData({title:"",desc:""});
      setInputDiv("hidden");
      }
    };
const updateTodo = async () => {
  if (!Data.title.trim() || !Data.desc.trim()) {
    alert("All fields are required");
    return;
  }

  if (!UpdatedData._id) {
    console.error("No ID found for update operation.");
    return;
  }

  try {
    await axios.put(`http://localhost:1000/api/v2/update-todo/${UpdatedData._id}`, Data, { headers });
    setUpdatedData({ id:"", title:"", desc:"" });
    setData({ title:"", desc:"" });
    setInputDiv("hidden");
  } catch (error) {
    console.error("Error updating the todo:", error);
  }
};


  return (
    <>
     <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 w-full`}>

     </div>
     <div className={`${InputDiv} top-0 left-0 flex items-center justify-center w-full`}>
     
     <div className='w-2/6 bg-gray-900 p-4 rounded'>
     <div className='flex justify-end '>
        <button className='text-2xl' onClick={()=>{setInputDiv("hidden");
        setData({
          title:"",
          desc:"",})
          setUpdatedData({
            id:"",
            title:"",
            desc:"",
          });
        }}  >
     <RxCross2 />
        </button></div>
    <input type="text" placeholder='Title' name="title" className='px-3 py-2 rounded w-full bg-gray-700 my-3'
    value={Data.title} 
    onChange={change}
    />
      <textarea 
        name="desc"
         cols="30"
         row="10"
         placeholder='Description..'
       className='px-3 py-2 rounded w-full bg-gray-700 my-3'
       value={Data.desc}
       onChange={change}
      >
      </textarea>
      {UpdatedData._id?(<button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={updateTodo}>
        Update
      </button>):(<button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={submitData}>
        Submit
      </button>)}
      

</div>
</div>
    </>
  );
}

export default InputData
