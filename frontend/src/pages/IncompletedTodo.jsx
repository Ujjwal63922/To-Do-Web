//For Incomleted todo
import React,{useState,useEffect}from 'react'
import Card from '../components/Home/Card'
import axios from 'axios'
const IncompletedTodo = () => {
  const [Data,setData]=useState()
  const headers={id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
};
  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get("http://localhost:1000/api/v2/get-incomplete-todo",{headers});
      setData(response.data.data);
    };
    fetch();
      });
  return (
    <div>
      <Card home="false" data={Data}/>
    </div>
  )
}

export default IncompletedTodo
