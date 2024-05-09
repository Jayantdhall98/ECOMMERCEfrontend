import { useState ,useEffect} from "react";
import "./newProduct.css";
import firebase from "firebase/compat/app"
import  "firebase/compat/storage";
import { useNavigate } from "react-router-dom";
import axios  from "axios";
export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");
  const [cat, setCat] = useState([]);
  
const navigate=useNavigate()

useEffect(() => {
  // Check if user data is available
  axios.defaults.withCredentials=true;
  axios.get('https://ecommercebackend-6zsu.onrender.com/api/auth/').then(res=>{
    // console.log(res)
    console.log(res.data.usertype)
    if(res.data.value && res.data.usertype=="admin"){
      console.log("User authenticated")
    }else if(res.data.usertype=="subadmin"){
      console.log("User authenticated")
    }else{
      navigate("/products")

    }
  })

},[] );






  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleupload = (e) => {
    const selectedfile=e.target.files[0]
     if(selectedfile){
      const storageRef=firebase.storage().ref()
      const fileRef=  storageRef.child(selectedfile.name)
       fileRef.put(selectedfile).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then((downloadurl)=>{
          // console.log(downloadurl)
          setFile(downloadurl);
        })
       })

     }else{
      console.log("No File selected!!")
     }

  };






  
  const handleClick = async(e) => {
    e.preventDefault();
  
  
  
  
    // console.log(inputs.title)
    // console.log(inputs.desc)
    // console.log(inputs.price)
    // console.log(cat)
    // console.log(file)
   if(file!=""&& inputs!=""){

     
     const res= await fetch("https://ecommercebackend-6zsu.onrender.com/api/product/uploadproduct",{
       credentials:"include",
       method:"POST",
       headers:{
         "Content-Type":"application/json"
},
body:JSON.stringify({
  title:inputs.title,
  desc:inputs.desc,
  img:file,
  categories:cat,
  price:inputs.price
})
})
const data= await res.json();
if(data){
  alert("Product uploaded sucessfully")
}else{
  alert("Product not uploaded!!!")
}

}else{
  alert("please enter product Details!!!")
}






};

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
          
            onChange={handleupload}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}