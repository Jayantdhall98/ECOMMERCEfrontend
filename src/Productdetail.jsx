import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {useNavigate,Link}  from 'react-router-dom'
import axios from 'axios'
import { useState ,useEffect} from 'react';
export default function Productdetail() {
    const [quantity, setQuantity] = useState(1);
    const [cartlength,setCartlength]=useState('');

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

},[] );

const logout=async(req,res)=>{
  await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/destroy",{
   method:"GET",
   credentials:"include"
  }).then(alert("logged Out"))
 navigate("/login")
}

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Convert string to integer
  };
const product=sessionStorage.getItem('selectedProduct')

const detailproduct = JSON.parse(product);

const Gotoshopping=()=>{
    navigate("/products")
}


const Addtocart=async(id)=>{

  // console.log("current product id is :",id)
  // console.log(" current user id is",curruserdata._id)
  const res= await fetch("https://ecommercebackend-6zsu.onrender.com/api/cart/addcart",{
         
  method:"POST",
  credentials:'include',
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
  
        productId:detailproduct._id,
        quantity:quantity
     
  
  })
  })
  const data= await res.json();
  console.log(data)
  if(data){
  alert("Product added to cart sucessfully")
  fetchCartItems();

  
  }else{
  alert("Product not added to cart!!!")
  }
  
  }

  useEffect(() => {
  

    fetchCartItems();
  },[]);
  
  const fetchCartItems = async () => {
    try {
      const cartItemsResponse = await fetch(`https://ecommercebackend-6zsu.onrender.com/api/cart/cartproducts`,{
        method:"GET",
        credentials:"include"
      });
      const cartItemsData = await cartItemsResponse.json();
  
      // Wait for all promises to resolve and update the state with combined data
  
      setCartlength(cartItemsData.length);
    } catch (error) {
      console.error( error);
    }
  };





  return (
    <div>
      <>
        <header>
          {/* Jumbotron */}
          <div className="p-3 text-center bg-white border-bottom">
            <div className="container">
              <div className="row gy-3">
                {/* Left elements */}
                <div className="col-lg-2 col-sm-4 col-4">
                  <span  target="_blank" className="float-start shopnowspan">
                    <h1 className='shopnow'>Shop now</h1>
                  </span>
                </div>
                {/* Left elements */}
                {/* Center elements */}
                <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                  <div className="d-flex float-end">
                    
                  <Link to={`/mycart/`}  style={{textDecoration:"none", }}>
          <button  className="btn btn-outline-dark" type="submit">
            <i   className="bi-cart-fill me-1" />
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">
           {cartlength}
            </span>
          </button>
            </Link>
                  </div>
                </div>
                {/* Center elements */}
                {/* Right elements */}
                <div className="col-lg-5 col-md-12 col-12">
                  <div className="input-group float-center">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-primary" type="button">
                    <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
                {/* Right elements */}
              </div>
            </div>
          </div>
          {/* Jumbotron */}
          {/* Heading */}
          <div className="bg-primary">
            <div className="container py-4">
              {/* Breadcrumb */}
              <nav className="d-flex">
                <h6 className="mb-0">
                  <button onClick={Gotoshopping} className="btn btn-outline-dark"><i className="bi bi-house-door-fill"></i>Home</button>

                </h6>
              </nav>
              {/* Breadcrumb */}
            </div>
          </div>
          {/* Heading */}
        </header>
        {/* content */}
        <section className="py-5">
          <div className="container">
            <div className="row gx-5">
              <aside className="col-lg-6">
                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                  <a  
                    data-fslightbox="mygalley"
                    className="rounded-4 overflow"
                    target="_blank"
                    data-type="image"
                 
                  >
                    <img
                      style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }}
                      className="rounded-4 fit  zoom  imgcover"
                      src={detailproduct.img}
                    />
                  </a>
                </div>
                <div className="d-flex justify-content-center mb-3">
                  <a
                    data-fslightbox="mygalley"
                    className="border mx-1 rounded-2"
                    target="_blank"
                    data-type="image"
             
                  >
                    <img
                      width={60}
                      height={60}
                      className="rounded-2"
                      src={detailproduct.img}
                    />
                  </a>
                  {/* Add more images here */}
                </div>
                {/* thumbs-wrap.// */}
                {/* gallery-wrap .end// */}
              </aside>
              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <h4 className="title text-dark">
                   {detailproduct.title}
                  </h4>
                  <div className="d-flex flex-row my-3">
                    <div className="text-warning mb-1 me-2">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <span className="ms-1">4.5</span>
                    </div>
                    <span className="text-muted">
                      <i className="fas fa-shopping-basket fa-sm mx-1" />
                      154 orders
                    </span>
                    <span className="text-success ms-2">In stock</span>
                  </div>
                  <div className="mb-3">
                    <span className="h5">{detailproduct.price}</span>
                    <span className="text-muted">₹</span>
                  </div>
                  <p>
                   {detailproduct.desc}
                  </p>
                  <div className="row">
                    <dt className="col-3">Type:</dt>
                    <dd className="col-9">Regular</dd>
                    {/* Add more details here */}
                  </div>
                  <hr />
                  <div className="row mb-4">
                  <div className="col-md-4 col-6">
      <label className="mb-2">Quantity</label>
      <select
        className="form-select border border-secondary"
        style={{ height: 35 }}
        value={quantity}
        onChange={handleQuantityChange}
      >
        {[...Array(20).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>{num + 1}</option>
        ))}
      </select>
    </div>
                    {/* Add more options here */}
                  </div>
                  
                  <a onClick={Addtocart} href="#" className="btn btn-primary shadow-0 mar-l">
                    <i className="me-1 fa fa-shopping-basket" /> Add to cart
                  </a>
                 
                </div>
              </main>
            </div>
          </div>
        </section>
        {/* content */}
        {/* Footer */}
        <footer className="text-center text-lg-start text-muted bg-primary mt-3">
          {/* Section: Links  */}
          {/* Add footer content here */}
        </footer>
        {/* Footer */}
      </>
    </div>
  );
}
