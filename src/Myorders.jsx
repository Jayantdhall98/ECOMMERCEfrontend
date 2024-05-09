import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import moment from 'moment'
import Navbar from './Navbar';

const AddressDrawer = ({ address }) => {
 
  return (
    <div className="address-drawer">
      <h3>User Address</h3>
      <p>{address}</p>
    </div>
  );
};

export default function Myorders() {

  const [showAddressDrawer, setShowAddressDrawer] = useState(false);
  const [paidOrders, setPaidOrders] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const userAddress = "123 Street, City, Country"; // Replace with actual user address

const navigate=useNavigate()


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

},[] );

const logout=async(req,res)=>{
  await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/destroy",{
   method:"GET",
   credentials:"include"
  }).then(alert("logged Out"))
 navigate("/login")
}


  const toggleAddressDrawer = () => {
    setShowAddressDrawer(!showAddressDrawer);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch paid orders
        const paidOrdersResponse = await axios.get('https://ecommercebackend-6zsu.onrender.com/api/order/getuserpaidorders', {
          withCredentials: true,
        });
        const paidOrders = paidOrdersResponse.data;
        setPaidOrders(paidOrders);
        const totalPaid= paidOrders.reduce((acc,order)=>acc+(order.amount),0)
       setTotalPaid(totalPaid)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array

const Gotohome=()=>{
navigate('/products')
}

  
  return (
    <div>
      <Navbar/>
      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={{ borderRadius: 10 }}>
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">
                    Thanks for your Order,{" "}
                    <span style={{ color: "#a8729a" }}>Anna</span>!
                  <button onClick={Gotohome} className="btn btn-outline-dark mar-l">Home</button>
                  </h5>

                </div>
                {paidOrders.map(orderdata => (
                  <div className="card-body p-4" key={orderdata._id}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                        Receipt
                      </p>
                      <p className="small text-muted mb-0">
                        Receipt Voucher : {orderdata.orderid}
                      </p>
                    </div>
                    <div className="card shadow-0 border mb-4 ">
                      <div className="card-body">
                        <div className="row">
                        
                     
                                       
                              <div className="col-md-2 " >
                              <img
                                src={orderdata.products[0].img}
                                className="img-fluid"
                                alt={orderdata.products[0].title}
                                />
                            </div>
                        </div>
                                <div>
                                    <p><b><i>Title:</i></b>{orderdata.products[0].title}</p>
                                    <p><b><i>Description:</i></b>{orderdata.products[0].desc}</p>
                                    <p><b><i>Quantity:</i></b>{orderdata.products[0].quantity}</p>
                                </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mb-0">Order Details</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Total</span> {orderdata.amount}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">OrderId : {orderdata.orderid}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">Order Date : {moment(orderdata.createdAt).fromNow()}</p>
                    </div>
                   
                  </div>
                ))}
                <div
                className="card-footer border-0 px-4 py-5"
                  style={{
                    backgroundColor: "#a8729a",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                  }}
                >
                  <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                    Total paid: <span className="h2 mb-0 ms-2">{totalPaid}</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Address Drawer Section */}
      {showAddressDrawer && <AddressDrawer address={userAddress} />}
      <button onClick={toggleAddressDrawer}>Show Address</button>
    </div>
  );
}
