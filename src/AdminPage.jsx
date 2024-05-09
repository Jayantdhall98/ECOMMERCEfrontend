import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userdata, setUserdata] = useState({});
  const [username, setUsername] = useState(userdata.username);
  const [email, setEmail] = useState(userdata.email);
  const [usertype, setUsertype] = useState(userdata.usertype);
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/allusers", {
        method: "GET",
        credentials: "include",
      });
      const allUsers = await response.json();
      setUsers(allUsers);
      setLoading(false); // Set loading to false when users are fetched
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while fetching user data.");
    }
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("https://ecommercebackend-6zsu.onrender.com/api/auth/validate")
      .then((res) => {
        if (res.data.value && res.data.usertype === "admin") {
          console.log("User authenticated");
        } else {
          alert("You cannot access the admin page.");
          navigate("/products");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while fetching user data.");
      });
    fetchUsers();
  }, [navigate]);

  const gotonewproduct = () => {
    navigate("/newproducts");
  };

  const gotoproducts = () => {
    navigate("/products");
  };
  const gotoordersheet = () => {
    navigate("/adminorderlist");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = (user) => {
    setShowModal(true);
    setUserdata(user);
  };

  const handleUserTypeChange = (e) => {
    e.preventDefault();
    setUsertype(e.target.value);
  };

  const handleUpdateData = async (req, res) => {
    try {
      const updatedata = await fetch(
        `https://ecommercebackend-6zsu.onrender.com/api/users/updateuser/${userdata._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({
            username: username,
            email: email,
            usertype: usertype,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleClose();
      fetchUsers();
      alert("data updated");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async (req, res) => {
    await fetch("https://ecommercebackend-6zsu.onrender.com/api/auth/destroy", {
      method: "GET",
      credentials: "include",
    }).then(alert("logged Out"));
    navigate("/login");
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shadow p-3 mb-5 bg-blue rounded">
      <h1
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: "#008AD8",
          boxShadow: "5px solid green",
          margin: "0",
          padding: "0",
        }}
      >
        Admin Page
      </h1>
      <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{ backgroundColor: "#008AD8" }}
      >
        <h3 style={{ marginLeft: "1rem" }}>Admin</h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            className="btn btn-dark my-2 my-sm-0 mar-l"
            type="button"
            onClick={gotonewproduct}
          >
            Add Products
          </button>
          <button
            className="btn btn-dark my-2 my-sm-0 mar-l"
            type="button"
            onClick={gotoproducts}
          >
            Show Products
          </button>
          <button
            className="btn btn-dark my-2 my-sm-0 mar-l"
            type="button"
            onClick={gotoordersheet}
          >
            Order Sheet
          </button>
          <button
            className="btn btn-dark my-2 my-sm-0 mar-l"
            disabled
            type="button"
          >
            All Cart data
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="form-inline my-2 my-lg-0"
            style={{ display: "flex", marginLeft: "60%", padding: "1rem" }}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-outline-dark my-2 my-sm-0 mar-l"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          className="table align-middle mb-0 bg-blue"
          style={{ border: "10px solid #008AD8", borderRadius: "15px" }}
        >
          <thead className="bg-light">
            <tr style={{ margin: "0.5rem", padding: "1rem" }}>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ margin: "1rem", padding: "1rem" }}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: 45, height: 45 }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.username}</p>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>{user.usertype}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded"
                    onClick={() => handleShow(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="mx-1 mx-md-4">
            <div className="d-flex flex-row align-items-center mb-4">
            <i className="bi bi-person-bounding-box" style={{ fontSize: "2rem", marginRight: "0.5rem" }}></i>              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="form3Example1c"
                  className="form-control"
                  placeholder={userdata.username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form-label" htmlFor="form3Example1c">
                  Your Name
                </label>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
            <i className="bi bi-envelope-at-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }}></i>              <div className="form-outline flex-fill mb-0">
                <input
                  type="email"
                  id="form3Example3c"
                  className="form-control"
                  placeholder={userdata.email}
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value || userdata.email)
                  }
                />
                <label className="form-label" htmlFor="form3Example3c">
                  Your Email
                </label>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
            <i className="bi bi-person-check-fill" style={{ fontSize: "2rem", marginRight: "0.5rem" }}></i>              <div className="form-outline flex-fill mb-0">
                <select
                  className="form-control"
                  value={usertype}
                  onChange={handleUserTypeChange}
                >
                  <option value={userdata.usertype}>select</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="subadmin">Sub Admin</option>
                </select>
                <label
                  className="form-label"
                  htmlFor="form3Example4cd"
                >
                  User Type
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateData}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPage;
