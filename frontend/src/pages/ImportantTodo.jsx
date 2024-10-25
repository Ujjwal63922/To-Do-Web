//For Important todo
import React,{useEffect, useState} from 'react'
import Card from '../components/Home/Card'
import axios from 'axios';

const ImportantTodo = () => {
 const [Data,setData]=useState()
  const headers={id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get("http://localhost:1000/api/v2/get-imp-todo",{headers});
      setData(response.data.data);
    };
    fetch();
      });
  return (
    <div>
      <Card home={false} data={Data}/>
    </div>
  )
}

export default ImportantTodo
