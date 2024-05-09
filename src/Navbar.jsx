import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
export default function Navbar() {
  const [cartlength, setCartlength] = useState("");

  const [isadmin, setIsadmin] = useState(false);
  const [issubadmin, setIssubadmin] = useState(false);
  const [username,setUsername]=useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is available
    axios.defaults.withCredentials = true;
    axios.get("https://ecommercebackend-6zsu.onrender.com/api/auth/").then((res) => {
      // console.log(res)
      if (res.data.value) {
        if (res.data.value && res.data.usertype === "admin") {
          setIsadmin(true);
        }
        if (res.data.value && res.data.usertype === "subadmin") {
          setIssubadmin(true);
        }
        console.log("User authenticated");
        setUsername(res.data.username);
      } else {
        logout();
      }
    });
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const cartItemsResponse = await fetch(
        `https://ecommercebackend-6zsu.onrender.com/api/cart/cartproducts`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const cartItemsData = await cartItemsResponse.json();

      // Wait for all promises to resolve and update the state with combined data

      setCartlength(cartItemsData.length);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async (req, res) => {
    await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/destroy", {
      method: "GET",
      credentials: "include",
    }).then(alert("logged Out"));
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
          {/* Welcome message */}
          <h1 className="navbar-brand mb-0 ">Welcome to Shop now</h1>

          {/* Toggler button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Menu items */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
              {/* Add products button */}
              {issubadmin && (
                <Link to={`/newproducts/`} style={{ textDecoration: "none" }}>
                  <button className="btn btn-outline-dark" type="submit">
                    <i className="bi bi-person-fill"></i>
                    ADD Products
                  </button>
                </Link>
              )}

              {/* Admin page button */}
              {isadmin && (
                <Link to={`/admin/`} style={{ textDecoration: "none" }}>
                  <button className="btn btn-outline-dark" type="submit">
                    <i className="bi bi-person-fill"></i>
                    Admin Page
                  </button>
                </Link>
              )}

              {/* Cart button */}
              <Link to={`/mycart/`} style={{ textDecoration: "none" }}>
                <button className="btn btn-outline-dark mar-l" type="submit">
                  <i className="bi-cart-fill me-1" />
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">
                    {cartlength}
                  </span>
                </button>
              </Link>

              {/* My Orders button */}
              <Link to={`/myorders/`} style={{ textDecoration: "none" }}>
                <button className="btn btn-outline-dark mar-l" type="submit">
                  <i className="bi bi-bag-check-fill"></i>
                  My Orders
                </button>
              </Link>

              {/* Logout button */}
              <button
                type="button"
                onClick={logout}
                className="btn btn-outline-dark mar-l"
              >
                <i className="bi bi-door-closed-fill"></i>
                Logout
              </button>
            </form>
          </div>

          {/* User icon and username */}
          <div className="d-flex align-items-center ms-auto">
            <i
              className="bi bi-person-bounding-box"
              style={{ fontSize: "2rem", marginRight: "0.5rem" }}
            ></i>
            <h3 className="mb-0">{username}</h3>
          </div>
        </div>
      </nav>
    </div>
  );
}
