import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Payment() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otp, setOTP] = useState("");
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(300); // Timer ko seconds mein store karein (5 minutes = 300 seconds)
  const [otpSent, setOtpSent] = useState(false); // OTP bhejne ke flag

  //   const [orderid, setOrderid] = useState("");
  //   const [orderamount, setOrderamount] = useState("");


const navigate=useNavigate();


  useEffect(() => {
    // Check if user data is available
    axios.defaults.withCredentials=true;
    axios.get('https://ecommercebackend-6zsu.onrender.com/api/auth').then(res=>{
      // console.log(res)
      if(res.data.value){
             
        console.log("User authenticated")
      }else{
        logout();
      }
    })
  
  });
  

  useEffect(()=>{
    if(mobile&& mobile.length==10){
      sendMobileOTP()
      setVerified(false)
    }
  },[mobile])

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); // Har ek second mein timer ko 1 ghatao
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval); // Timer khatam hone par interval ko clear karein
      setOtpSent(false); // OTP bhejne ka flag false karein
      setTimer(300); // Timer ko phir se 5 minutes (300 seconds) par reset karein
          clearotp();
    }
    return () => clearInterval(interval); // Component unmount hone par interval ko clear karein
  }, [otpSent, timer]);

  const clearotp = async(req,res)=>{

    await axios.post("https://ecommercebackend-6zsu.onrender.com/api/order/clearotp",{
      mobile
    })

  }

  const handleVerifyClick = () => {
    if (mobile === "" || otp === "") {
      toast.error("Please enter mobile number and OTP!");
      return;
    }
    
    verifyOTP(); // verifyOTP function ko call karein
  };
  
  const { state } = useLocation();

  const logout=async(req,res)=>{
    await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/destroy",{
     method:"GET",
     credentials:"include"
    }).then(alert("logged Out"))
   navigate("/login")
}



  // Define a map that contains states and their corresponding cities
  const citiesByState = {
    Punjab: [
      "Amritsar",
      "Ludhiana",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Pathankot",
      "Hoshiarpur",
      "Moga",
      "Batala",
      "Abohar",
      "Malerkotla",
      "Khanna",
      "Mohali",
      "Barnala",
      "Firozpur",
      "Phagwara",
      "Muktasar",
      "Faridkot",
      "Rajpura",
      "Kapurthala",
      "Gurdaspur",
      "Sangrur",
      "Nabha",
      "Fazilka",
      "Fatehgarh Sahib",
      "Ropar",
      "Gobindgarh",
    ],
    Haryana: [
      "Gurgaon",
      "Faridabad",
      "Hisar",
      "Panipat",
      "Karnal",
      "Sonipat",
      "Yamunanagar",
      "Rohtak",
      "Panchkula",
      "Ambala",
      "Sirsa",
      "Bhiwani",
      "Bahadurgarh",
      "Jind",
      "Thanesar",
      "Kaithal",
      "Rewari",
      "Palwal",
      "Hansi",
      "Narnaul",
      "Fatehabad",
      "Jagadhri",
      "Tohana",
      "Gohana",
      "Narwana",
      "Hodal",
      "Pinjore",
      "Shahabad",
      "Nuh",
    ],
    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Ajmer",
      "Kota",
      "Bikaner",
      "Alwar",
      "Bhilwara",
      "Sikar",
      "Barmer",
      "Bharatpur",
      "Tonk",
      "Pali",
      "Sawai Madhopur",
      "Dausa",
      "Nagaur",
      "Chittorgarh",
      "Churu",
      "Hanumangarh",
      "Dholpur",
      "Rajsamand",
      "Karauli",
      "Sirohi",
      "Ganganagar",
      "Dungarpur",
      "Banswara",
      "Jaisalmer",
      "Baran",
      "Sri Ganganagar",
    ],
    // Add more states and cities as needed
  };

  const states = Object.keys(citiesByState);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    // Clear the selected city when the state changes
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const validateMobile = (value) => {
    // Regular expression to validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(value);
  };

  const handleMobileChange = (event) => {
    const mobileValue = event.target.value;
    setMobile(mobileValue);
    if (!validateMobile(mobileValue)) {
      setMobileError("Please enter a valid 10-digit mobile number");
    } else {
      setMobileError("");
    }
  };


  const sendMobileOTP = async () => {
    if (mobile === "") {
      toast.error("Enter Your mobile number!");
    } else {
      try {
        const response = await axios.post("https://ecommercebackend-6zsu.onrender.com/api/order/sendmobileotp", {
          mobile
        });
        console.log(response.data.success);
        toast.success("OTP sent successfully!");
        setOtpSent(true); // OTP bhejne ke flag ko true karein

      } catch (error) {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP.");
      }
    }
  };
  
  const verifyOTP = async () => {
    if (mobile === "" || otp === "") {
      toast.error("Please enter mobile number and OTP!");
      return;
    }
    
    try {
      const response = await axios.post("https://ecommercebackend-6zsu.onrender.com/api/order/verifymobileotp", {
        mobile,
        otp
      });
      console.log(response.data);
      
      if (response.data.success === true) {
        toast.success("OTP verified successfully!");
        setVerified(true);
      } else if(response.data.success===false&&response.data.message==="Resend OTP"){
        toast.error("otp sent again please enter in time!");
        setVerified(false)
        sendMobileOTP();
      }else{
        toast.error("Please enter a valid OTP!")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP.");
    }
  };
  




  // const ordersave = async () => {
  //     try {

  //         console.log(orderid,orderamount)
  //       const response = await fetch("https://ecommercebackend-6zsu.onrender.com/api/order/orderplaced", {
  //         method: "POST",
  //         credentials: 'include',
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           orderid: orderid,
  //           name: `${firstname} ${lastname}`,
  //           products: [
  //             {
  //               productId: state.ProductId,
  //               quantity: state.quantity,
  //             },
  //           ],
  //           amount: orderamount,
  //           address: {
  //             address: address,
  //             state: selectedState,
  //             city: selectedCity,
  //             pincode: pincode,
  //           },
  //           mobile: mobile,
  //           email: email,
  //         })
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  const placeOrder = async () => {
    // Check if all fields are filled and mobile number is valid
    if (
      !firstname ||
      !lastname ||
      !address ||
      !pincode ||
      !selectedState ||
      !selectedCity ||
      !email ||
      !mobile ||
      !validateMobile(mobile)||!verified
   
    ) {
      alert("Please fill out all fields correctly");
      return;
    }
  
    try {
      // Call HandleCheckout function to initiate the checkout process
      await HandleCheckout();
      
      // If HandleCheckout function does not throw any error, log the success message
      console.log("Order placed successfully!");
    } catch (error) {
      // If HandleCheckout function throws an error, log the error
      console.error("Error while placing order:", error);
      // Optionally, show an alert or message to the user about the error
      alert("An error occurred while placing the order. Please try again later.");
    }
  };
  

  //payment

  const HandleCheckout = async (req,res) => {
    const amount = state.price * state.quantity;

    try {
      const {
        data: { key },
      } = await axios.get("https://ecommercebackend-6zsu.onrender.com/key");
      axios.defaults.withCredentials=true;
      const { data: { order }} = await axios.post("https://ecommercebackend-6zsu.onrender.com/api/order/checkout", {
        amount: amount,
        name: `${firstname} ${lastname}`,

        productId:state&&state.ProductId,
        quantity:state&&state.quantity,

        address: address,
        state: selectedState,
        city: selectedCity,
        pincode: pincode,

        mobile: mobile,
        email: email,
      });

      const options = {
        key: key,
        amount: order&&order.amount,
        currency: "INR",
        name: state&&state.title,
        description: state&&state.desc,
        image: state&&state.img,
        order_id: order&&order.id,
        callback_url: "https://ecommercebackend-6zsu.onrender.com/api/order/paymentverification",
        prefill: {
          name: `${firstname} ${lastname}`,
          email: email,
          contact: mobile,
        },
        notes: {
          address: address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.on("payment.success", async (response) => {
        console.log("Payment successful:", response);
      });
      razor.open();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col">
            <div className="card my-4 shadow-3">
              <div className="row g-0">
                <div className="col-xl-6 d-xl-block bg-image">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp"
                    alt="Sample photo"
                    className="img-fluid"
                  />
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                  >
                    <div className=" justify-content-center align-items-center h-100">
                      <div className=" text-center" style={{ marginTop: 220 }}>
                        <i className="fas fa-truck text-white fa-3x" />
                        <p className="text-white title-style">
                          Lorem ipsum delivery
                        </p>
                        <p className="text-white mb-0" />
                        <figure className="text-center mb-0">
                          <blockquote className="blockquote text-white">
                            <p className="pb-3">
                              <i
                                className="fas fa-quote-left fa-xs text-primary"
                                style={{ color: "hsl(210, 100%, 50%)" }}
                              />
                              <span className="lead font-italic">
                                Everything at your doorstep.
                              </span>
                              <i
                                className="fas fa-quote-right fa-xs text-primary"
                                style={{ color: "hsl(210, 100%, 50%)" }}
                              />
                            </p>
                          </blockquote>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-4 text-uppercase">Delivery Info</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1m"
                            className="form-control form-control-lg"
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1m"
                          >
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1n"
                            className="form-control form-control-lg"
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1n"
                          >
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example8"
                        className="form-control form-control-lg"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example8">
                        Address
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <select
                          className="form-select border border-secondary"
                          style={{ height: 35 }}
                          required
                          value={selectedState}
                          onChange={handleStateChange}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select
                          className="form-select border border-secondary"
                          style={{ height: 35 }}
                          value={selectedCity}
                          required
                          onChange={handleCityChange}
                          disabled={!selectedState} // Disable city select if no state is selected
                        >
                          <option value="">Select City</option>
                          {selectedState &&
                            citiesByState[selectedState].map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        value={pincode}
                        required
                        onChange={(e) => setPincode(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Zip
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example2"
                        className="form-control form-control-lg"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example2">
                        Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example9"
                        className="form-control form-control-lg"
                        value={mobile}
                        required
                        onChange={handleMobileChange}
                      />
                      <label className="form-label" htmlFor="form3Example9">
                        Mobile
                      </label>
                      {mobileError && (
                        <div className="text-danger">{mobileError}</div>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                       
                        className="form-control form-control-lg"
                    
                        required
                        onChange={(e) => setOTP(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example9">
                        otp
                      </label>
                      <button onClick={handleVerifyClick} style={{marginTop:"5px"}} className="btn btn-outline-success mar-l">verify Otp</button>  
                      {otpSent && !verified && (
  <div>
    Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}{timer % 60} seconds
  </div>
)}
{otpSent && verified ? (
  <span style={{ color: "green" }}>Verified</span>
) : null}
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg ms-2"
                        style={{ backgroundColor: "hsl(210, 100%, 50%)" }}
                        onClick={placeOrder}
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
