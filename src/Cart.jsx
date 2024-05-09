import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartDataToShow, setCartDataToShow] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('https://ecommercebackend-6zsu.onrender.com/api/auth/validate').then((res) => {
      if (res.data.value) {
        console.log('User authenticated');
      } else {
        logout();
      }
    });
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, []);


  const logout=async(req,res)=>{
    await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/destroy",{
     method:"GET",
     credentials:"include"
    }).then(alert("logged Out"))
   navigate("/login")
}

  const fetchCartItems = async () => {
    try {
      const cartItemsResponse = await fetch(`https://ecommercebackend-6zsu.onrender.com/api/cart/cartproducts`, {
        method: 'GET',
        credentials: 'include',
      });
      const cartItemsData = await cartItemsResponse.json();
      setCartDataToShow(cartItemsData);

      // Calculate total price
      const totalPrice = cartItemsData.reduce((acc, item) => acc + (item.price*item.quantity || 0), 0);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };





  const deltCartitem = (productId) => {
    fetch(`https://ecommercebackend-6zsu.onrender.com/api/cart/deltcartitem/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => {
      if (res) {
        alert('Data deleted');
        fetchCartItems();
      } else {
        alert('Data not deleted...');
      }
    });
  };




const gotopayment=(a)=>{
  navigate('/paymentpage',{
    state:a
  })
console.log(a)

}










  return (
    <div>
      <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <a className="text-body btn btn-primary">
                          <i className="fas fa-long-arrow-alt-left me-2" />
                          <Link to={'/products'} style={{ textDecoration: 'none', color: 'white' }}>
                            {' '}
                            Continue shopping
                          </Link>
                        </a>
                      <a className="text-body btn btn-primary mar-l">
                          <i className="fas fa-long-arrow-alt-left me-2 " />
                          <Link to={'/myorders'} style={{ textDecoration: 'none', color: 'white' }}>
                            {' '}
                           My Orders
                          </Link>
                        </a>
                      </h5>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">You have {<b>{cartDataToShow.length}</b>} items in your cart</p>
                        </div>
                        <div>
                          <p className="mb-0">
                            <span className="text-muted">Sort by:</span>{' '}
                            <a href="#!" className="text-body">
                              price <i className="fas fa-angle-down mt-1" />
                            </a>
                          </p>
                        </div>
                      </div>

                      {cartDataToShow.map((a, index) => {
                        return (
                          <>
                            <div key={index} className="card mb-3">
                              <div className="card-body">
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-row align-items-center">
                                    <div>
                                      <img
                                        src={a.img}
                                        className="img-fluid rounded-3"
                                        alt="Shopping item"
                                        style={{ width: 65 }}
                                      />
                                    </div>
                                    <div className="ms-3">
                                      <h5>{a.title || 'Iphone 11 pro'}</h5>
                                      <p className="small mb-0">{a.desc || '256GB, Navy Blue'}</p>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center">
                                    <div style={{ width: 50 }}>
                                      <h5 className="fw-normal mb-0">{a.quantity}</h5>
                                    </div>
                                    <div style={{ width: 80 }}>
                                      <h5 className="mb-0">{a.price || '$900'}₹</h5>
                                    </div>
                                    <div>
                                      <button onClick={() => deltCartitem(a.ProductId)} className="btn btn-primary">
                                        Delete
                                      </button>
                                      <button onClick={()=>{gotopayment(a)}} className="btn btn-warning shadow-0 mar-l">
                    
                    Buy now
                  </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <h3>Total Price: ₹{totalPrice}</h3>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
