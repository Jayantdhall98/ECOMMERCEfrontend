import axios from 'axios'
import React, { useEffect } from 'react'
import {useSearchParams,useNavigate} from 'react-router-dom'

export default function Paymentsuccess() {



    const searchquery=useSearchParams()[0]

     const transaction_id=searchquery.get("reference")
     const navigate=useNavigate()
     const Gotomyorders=()=>{
navigate('/myorders')
     }

  useEffect(() => {
    // Check if user data is available
    axios.defaults.withCredentials=true;
    axios.get('https://ecommercebackend-6zsu.onrender.com/api/auth/validate').then(res=>{
      // console.log(res)
      if(res.data.value){
             
        console.log("User authenticated")
      }else{
       logout();
      }
    })
  
  },[] );
  


  const logout=async(req,res)=>{
    await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/destroy",{
     method:"GET",
     credentials:"include"
    }).then(alert("logged Out"))
   navigate("/login")
}

  return (
    <div>
      <h1>Payment Succesfull</h1>
      <h3>Your transaction is is :{transaction_id}</h3>

      <button className="btn btn-warning shadow-0 mar-l" onClick={Gotomyorders}>My Orders</button>
    </div>
  )
}
