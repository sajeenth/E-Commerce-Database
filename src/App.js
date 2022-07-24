import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [deleteuser, setDeleteUser] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [coupon, setCoupon] = useState(0);
  const [address, setAddress] = useState(0);
  const [userList, setUserList] = useState([]);
  const [productList, setProductList] = useState([]);
  let [id, setID] = useState(0);
  let [userID, setUserID] = useState(0);
  const [verify, setVerify] = useState("");

  const addUser = () => {
    setID(++id);
    Axios.post('http://localhost:3001/create', {
      id: id,
      firstName: firstName, 
      lastName: lastName,
      userName: userName,
      password: password,
      date: date
    }).then((response) => {
      if (response.data === "Error") {
        window.alert("Sorry username taken");
      } else {
        window.alert("User Added!");
      }
    });
  };

  const addProduct = () => {
    Axios.post('http://localhost:3001/buy', {
      name: name, 
      price: price,
      coupon: coupon,
      address: address,
      userID: userID,
    }).then(() => {
      document.querySelector(".headings2").style.display = "flex";
      document.querySelector(".show_users2").style.display = "flex";
        getProduct();
        console.log("Success");
    });
  };

  const deleteUser = () => {
    Axios.post('http://localhost:3001/delete', {
      userName: deleteuser, 
    }).then(() => {
        console.log("Success");
    });
  };

  const resetTable = () => {
    Axios.post('http://localhost:3001/reset', {
    }).then(() => {
        console.log("Success");
    });
  };

  const getUsers = () => {
    document.querySelector(".user_input3").style.display = "none";    
    document.querySelector(".headings").style.display = "flex";
    document.querySelector(".remove_user").style.display = "flex";
    document.querySelector(".reset").style.display = "flex";
    Axios.get('http://localhost:3001/users').then((response) => {
        setUserList(response.data);
    });
  }

  const getProduct = () => {
    Axios.post('http://localhost:3001/prod', {
      userID: userID,
    }).then((response) => {
      setProductList(response.data);
    });
  }

  const verifyUser = () => {
    Axios.post('http://localhost:3001/verify', {
      userName: userName, 
      password: password,
    }).then((response) => {
      if(response.data.length !== 0) {
        if ((userName === response.data[0]['userName']) && (password === response.data[0]['password'])) {
          setVerify(response.data[0]['firstName']);
          setUserID(response.data[0]['id']);
          document.querySelector(".veri").style.display = "flex";    
          document.querySelector(".product_input").style.display = "flex";
          document.querySelector(".user_input2").style.display = "none";
          document.querySelector(".homepage_buttons").style.display = "none";
        }
        else {
          window.alert("Incorrect username/password please try again");
        }
      } else {
        window.alert("Incorrect username/password please try again");
      }
    });
  }

  const display = () => {
    document.querySelector(".user_input").style.display = "flex";
    document.querySelector(".homepage_buttons").style.display = "none";
  }
  const display2 = () => {
    document.querySelector(".user_input2").style.display = "flex";
    document.querySelector(".homepage_buttons").style.display = "none";
  }
  const display4 = () => {
    document.querySelector(".user_input3").style.display = "flex";
    document.querySelector(".homepage_buttons").style.display = "none";
  }

  window.onload = function() {
    Axios.get('http://localhost:3001/count', {}).then((response) => {
        setID(response.data[0]['COUNT(*)']);
    }); 
  }

  return (
    <div className="App">
      <h1>E-Commerce Database</h1>
      <div className="homepage_buttons">
        <button className="new_button" onClick={display}>New User</button>
        <button className="existing_button" onClick={display2}>Existing User</button>
        <button className="admin_button" onClick={display4}>Administrator Access</button>
      </div>
      <div className="user_input">
        <div className="new_labels">
          <label>First Name:</label>
          <input type="text" onChange = {(e) => {
            setFirstName(e.target.value);
          }}/>
          <label>Last Name:</label>
          <input type="text" onChange = {(e) => {
            setLastName(e.target.value);
          }}/>
          <label>Username:</label>
          <input type="text" onChange = {(e) => {
            setUserName(e.target.value);
          }}/>
          <label>Password:</label>
          <input type="text" onChange = {(e) => {
            setPassword(e.target.value);
          }}/>
          <label>Date of Birth (YYYY-MM-DD):</label>
          <input type="text" onChange = {(e) => {
            setDate(e.target.value);
          }}/>
        </div>
        <button onClick={addUser}>Add Now</button>
      </div>
      <div className="user_input2">
        <div className="new_labels">
          <label>Username:</label>
          <input type="text" onChange = {(e) => {
            setUserName(e.target.value);
          }}/>
          <label>Password:</label>
          <input type="text" onChange = {(e) => {
            setPassword(e.target.value);
          }}/>
        </div>
        <button onClick={verifyUser}>Login</button>
      </div>
      <div className="veri">
        <h2>Welcome {verify}</h2>
      </div>
      <div className="user_input3">
        <div className="new_labels">
          <label>Admin Username:</label>
          <input type="text" onChange = {(e) => {
            setUserName(e.target.value);
          }}/>
          <label>Admin Password:</label>
          <input type="text" onChange = {(e) => {
            setPassword(e.target.value);
          }}/>
        </div>
        <button onClick={getUsers}>Login</button>   
      </div>
      <div className="headings">
          <h2>First Name</h2>
          <h2>Last Name</h2>
          <h2>Username</h2>
          <h2>Password</h2>
          <h2>Date of Birth</h2>
      </div>
      <div className="show_users">
        {userList.map((val, key) => {
          return (
          <div className="users">
            <div className="first_user">
              <h3>{val.firstName}</h3>
            </div>
            <div className="last_user">
              <h3>{val.lastName}</h3>
            </div> 
            <div className="name_user">
              <h3>{val.userName}</h3>
            </div> 
            <div className="pass_user">
              <h3>{val.password}</h3>
            </div> 
            <div className="date_user">
              <h3>{val.birthDate}</h3>
            </div>  
          </div>
          )
        })}
      </div>
      <div className="product_input">
        <div className="new_labels">
          <label>Product Name:</label>
          <input type="text" onChange = {(e) => {
            setName(e.target.value);
          }}/>
          <label>Product Price:</label>
          <input type="text" onChange = {(e) => {
            setPrice(e.target.value);
          }}/>
          <label>Coupon (If Applicable):</label>
          <input type="text" onChange = {(e) => {
            setCoupon(e.target.value);
          }}/>
          <label>Deliver To:</label>
          <input type="text" onChange = {(e) => {
            setAddress(e.target.value);
          }}/>
        </div>
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div className="headings2">
          <h2>Product</h2>
          <h2>Price Paid</h2>
          <h2>Coupon</h2>
          <h2>Address</h2>
      </div>
      <div className="show_users2">
        {productList.map((val, key) => {
          return (
          <div className="users2">
            <div className="first_user2">
              <h3>{val.name}</h3>
            </div>
            <div className="last_user2">
              <h3>${val.price}</h3>
            </div> 
            <div className="name_user2">
              <h3>{val.coupon}</h3>
            </div> 
            <div className="pass_user2">
              <h3>{val.address}</h3>
            </div> 
          </div>
          )
        })}
      </div>
      <div className="remove_user">
        <h3>Enter Username:</h3>
        <input type="text" onChange={(e) => {
          setDeleteUser(e.target.value);
        }}/>
        <button onClick={deleteUser}>Delete User</button>
      </div> 
      <div className="reset">
        <button onClick={resetTable}>RESET</button>
      </div> 
      
    </div>
  );
}

export default App;
