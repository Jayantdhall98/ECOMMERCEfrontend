import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
export default function Verifyemail() {

const {emailsign}=useParams()
const navigate=useNavigate()

useEffect(()=>{
const verify=async(req,res)=>{

    await axios.post("https://ecommercebackend-6zsu.onrender.com/api/auth/verifyaccount",{emailsign})
   
}
const gotoproduct=(req,res)=>{
    navigate("/products")
    }
verify();
gotoproduct();

},[emailsign])






  return (
    <div>
      <h1>To verify click on this button<button >verified</button></h1>
      
    </div>
  )
}
