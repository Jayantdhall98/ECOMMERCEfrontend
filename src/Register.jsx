import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpass] = useState("");
  const [ischecked, setIschecked] = useState(false);
  const [usertype, setUsertype] = useState("user");
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
      setUsertype(e.target.value);
  };

  useEffect(() => {
    // Call the sendotp function whenever the email changes
    if (email) {
        sendotp();
        setVerified(false)
    }
}, [email]);


  const postHandle = async (e) => {
    e.preventDefault();
    if (password === confirmpassword && username && email && password && confirmpassword && verified) {
        try {
            const res = await axios.post("https://ecommercebackend-6zsu.onrender.com/api/auth/register", {
                username: username,
                email: email,
                password: password,
                usertype: usertype
            });
            if (res.data) {
                toast.success("verify your account in your mail box!");
                alert("Registered success")
                await axios.post("https://ecommercebackend-6zsu.onrender.com/api/auth/sendverficationlink",{email})
                navigate("/login");
            } else if (res.data.msg) {
                toast.error("User already exists. Please login.");
            } else {
                toast.error("Registration failed.");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Registration failed.");
        }
    } else {
        toast.error("Password not matched or fields are empty!");
    }
};


  const sendotp = async () => {
      if (email === "") {
          toast.error("Enter Your Email!");
      } else if (!email.includes("@")) {
          toast.error("Enter Valid email!");
      } else {
          try {
              const response = await axios.post("https://ecommercebackend-6zsu.onrender.com/api/auth/sendotp", {
                  email
              });
              console.log(response.data.sent);
              toast.success("OTP sent successfully!");
          } catch (error) {
              console.error("Error sending OTP:", error);
              toast.error("Failed to send OTP.");
          }
      }
  };

  const verifyotp = async () => {
      try {
          const response = await axios.post("https://ecommercebackend-6zsu.onrender.com/api/auth/verifyotp", {
              email,
              otp
          });
          if (response.data.verify && response.data.verify === "true") {
              toast.success("OTP verified successfully!");
              setVerified(true);
           
          } else {
              toast.error("Please enter a valid OTP!");
          }
      } catch (error) {
          console.error("Error verifying OTP:", error);
          toast.error("Failed to verify OTP.");
      }
  };

  const signupwithgoogle = () => {
      window.open("https://ecommercebackend-6zsu.onrender.com/google/callback", "_self");
  };
    return (
        <div>
          <ToastContainer />

            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            <form className="mx-1 mx-md-4" onSubmit={postHandle}>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="bi bi-person-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            onChange={(e) => setUsername(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="bi bi-envelope-at-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            className="form-control"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="bi bi-patch-check-fill"style={{ fontSize: "2rem", marginRight: "0.5rem" }}></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={(e) => setOTP(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="form3Example3c">Your OTP</label>
                                                       
                                                        <button style={{marginTop:"5px"}} className="btn btn-outline-success mar-l"onClick={verifyotp}>verify Otp</button>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="bi bi-key-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="bi bi-key-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="form3Example4cd"
                                                            className="form-control"
                                                            onChange={(e) => setConfirmpass(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="bi bi-person-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select
                                                            className="form-control"
                                                            value={usertype}
                                                            onChange={handleUserTypeChange}
                                                        >
                                                            <option value="user">User</option>
                                                            <option value="admin" disabled>Admin</option>
                                                            <option value="subadmin" disabled>Sub Admin</option>
                                                        </select>
                                                        <label className="form-label" htmlFor="form3Example4cd">User Type</label>
                                                    </div>
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        id="form2Example3c"
                                                        onChange={(e) => setIschecked(e.target.checked)}
                                                    />
                                                    <label className="form-check-label" htmlFor="form2Example3">I agree all statements in <a href="#!">Terms of service</a></label>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                    <button type="submit" className="btn btn-primary btn-lg mar-l"><Link to={"/login"} style={{ textDecoration: "none", color: "white" }}>LOG IN</Link></button>
                                                </div>
                                            </form>
                                            <button className="btn btn-outline-dark mar-l5" onClick={signupwithgoogle}><i className="bi bi-google"></i> Sign up with Google</button>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"></div>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
