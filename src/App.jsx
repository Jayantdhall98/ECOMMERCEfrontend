import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import NewProduct from "./Newproduct";
import Cart from "./Cart";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import AdminPage from "./AdminPage";
import Productdetail from "./Productdetail";
import Paymentsuccess from "./Paymentsuccess";
import Payment from "./Payment";
import Myorders from "./Myorders";
import AdminOrderlist from "./AdminOrderlist";
import Verifyemail from "./Verifyemail";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/products" element={<Products/>}></Route>
      <Route path="/productdDetail" element={<Productdetail/>}></Route>
      <Route path="/newproducts" element={<NewProduct/>}></Route>
      <Route path="/mycart/" element={<Cart/>}></Route>
      <Route path="/admin/" element={<AdminPage/>}></Route>
      <Route path="/adminorderlist/" element={<AdminOrderlist/>}></Route>
      <Route path="/paymentsuccess/" element={<Paymentsuccess/>}></Route>
      <Route path="/paymentpage/" element={<Payment/>}></Route>
      <Route path="/myorders/" element={<Myorders/>}></Route>
      <Route path="/verify/:emailsign" element={<Verifyemail/>}></Route>
      
      
    </Routes>
    </BrowserRouter>
      
        
    </>
  );
}

export default App;
