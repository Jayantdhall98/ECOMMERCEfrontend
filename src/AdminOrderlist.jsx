import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const AdminOrderlist = () => {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  

  const navigate=useNavigate()

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("https://ecommercebackend-6zsu.onrender.com/api/auth")
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
  
  }, [navigate]);







  useEffect(() => {
    fetchData();
  });




  const tableCustomStyles = {
   
    rows: {
      style: {
        backgroundColor: 'white', // Set default row background color to white
        border: '1px solid #dee2e6', // Add border to rows
        padding:"1rem"
      },
    },
    highlightOnHover: {
      style: {
        backgroundColor: 'lightblue', // Set background color when hovering over a row
      },
    },


    headCells: {
      style: {
        fontSize: '20px',
        fontFamily:'verdana',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        justifyContent: 'center',
        backgroundColor: 'black',
        color:'white',
        padding:'1rem'
      },
    },
    cells: {
      style: {
        fontSize: '20px',
        fontFamily: 'verdana',
        paddingLeft: '0 8px',
        overflow: 'hidden', // Hide overflow
        textOverflow: 'ellipsis', // Show ellipsis for truncated text
       // Prevent text wrapping
      },
      // Show full content on hover
      // Use pointerEvents to allow hover events only when hovering over the cell
      // Use overflow to show the full content when hovering over the cell
      // Reset overflow to hidden when not hovering to hide full content
     
    },
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://ecommercebackend-6zsu.onrender.com/api/order/getpaidorders');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  

  const columns = [
    {
      name: 'OrderID',
      selector: row=>row.orderid,
      sortable: true,
    },
    {
      name: 'UserID',
      selector: row=>row.userid,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row=>row.name,
      sortable: true,
      editable: true,
     // Make this column editable
    },
    {
      name: 'ProductImg',
      selector: row => <img src={row.products.map(product => product.img).join(', ')}style={{ width: '50px', height: '50px' }}alt="" /> ,// Combine product IDs
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'ProductId',
      selector: row => row.products.map(product => product.productId).join(', '), // Combine product IDs
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Product Title',
      selector: row => row.products.map(product => product.title).join(', '), // Combine product IDs
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Quantity',
      selector: row => row.products.map(product => product.quantity).join(', '), // Combine quantities
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Amount Paid',
      selector: row=>`${row.amount}₹`,
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Mobile',
      selector: row=>row.mobile,
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Email',
      selector: row=>row.email,
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Address',
      selector: row=>row.address.address,
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'State',
      selector: row=>row.address.state,
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'City',
      selector: row=>row.address.city,
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Pincode',
      selector: row=>row.address.pincode,
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Status',
      selector: row=>row.status,
      sortable: true,
      editable: true, // Make this column editable
    },
    {
      name: 'Date',
      selector: row=>moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      sortable: true,
      editable: true, // Make this column editable
    },
  ];

  
   



  return (
    <div>
      <h1 style={{textAlign:'center'}}>Order Sheet</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
      />
       {/* Add export buttons */}
    
     
       
     
      <DataTable
      customStyles={tableCustomStyles}
        title="All Paid Orders"
        columns={columns}
        data={filteredData}
        pagination
        selectableRows
        selectableRowsHighlight
        dense
        striped
        highlightOnHover
        responsive
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20]}
        noDataComponent="No data available"
         expandOnRowClicked
       
      
      />
    </div>
  );
};

export default AdminOrderlist;
