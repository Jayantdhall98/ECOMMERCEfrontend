import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'



export default function Login() {
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
const navigate=useNavigate()

// useEffect(() => {
//   // Check if user data is available
//   axios.defaults.withCredentials=true;
//   axios.get('https://ecommercebackend-6zsu.onrender.com/xyz/').then(res=>{
//     console.log(res)
//     if(res.data.value){
//       // setCurruserId(res.data.userid)
//       console.log("data is set")
//     }else{
//       navigate("/login")
//     }

//   }).catch(err=>console.log(err))
// },[] );


const postLogin=async(e)=>{
  e.preventDefault()
           try{
          
             const res=await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/login",{
               method:"POST",
               credentials:'include',
               headers:{
                 "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  email:email,
                  password:password
                })
              })
              const data=await res.json();
              console.log(data.msg)
              
              
              if(data.success===false){
                alert(data.message)
                console.log(data)
              }else{
                alert("wecome to the shopping app!!")
                if(data.usertype=="user"){

                  navigate("/products")
                }else if(data.usertype=="subadmin"){
                  navigate("/products")
                }else{
                  navigate("/admin")
                }
              }
              
              
            }catch(err){
              console.log(err)
            }
            }
    


//signup with google
const signinwithgoogle=()=>{
  window.open("https://ecommercebackend-6zsu.onrender.com/google/callback","_self")
  }
  

  return (
    <div>
       <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          LogIN
                        </p>
                        <form className="mx-1 mx-md-4"  onSubmit={postLogin}  >
                        
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="bi bi-person-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }}></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                className="form-control mar-l"
                                onChange={(e)=>setEmail(e.target.value)} 
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example3c"
                              >
                                Your Email
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="bi bi-key-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }}></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                onChange={(e)=>setPassword(e.target.value)} 
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example4c"
                              >
                                Password
                              </label>
                            </div>
                          </div>
                          
                         
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                             
                            >
                              LOG IN
                            </button>
                                                      </div>
                        </form>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                        <button
                              
                              className="btn btn-primary btn-lg mar-l"
                             
                            >
                              <Link to={"/"} style={{textDecoration:"none", color:"white"}}>Back</Link>
                            </button>
                            <button className="btn btn-outline-dark  mar-l" onClick={signinwithgoogle}>
                            <i className="bi bi-google"></i>
    Sign in with Google
  </button>
                            </div>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
    </div>
  )
}
