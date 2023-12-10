import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [ users, setUsers ] = useState([]);
  const [ user_data, setUserData ] = useState({ name: "", email: "", phone: "", age: "", password: "" });
  const [ message, setMessage ] = useState("")

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const data = await fetch("http://localhost:5000/api/user/all", {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      }
    });

    const res = await data.json();
    setUsers([...users, res])
  }

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.name, e.target.value, " event name and value in the handle change function")
    setUserData({...user_data, [e.target.name]: e.target.value});
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/user/create", {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user_data)
    });

    await res.json();
    
    if (res.statusText.toLowerCase() === "created") {
      setUserData({ name: "", email: "", phone: "", age: "", password: "" })
      setMessage("Account created successfully!")
      getData();
    }
    setMessage("");
  }

  useEffect(() => {
    if (message.length > 0) {
      window.alert(message);
    }
  }, [ message ]);
  // console.log(users, " the user from the api in state")

  // console.log(user_data, " this is the user data from the form")
  console.log(users, " the users data from the db")
  return (
    <div style={styles.main_container}>
      {/* <Header /> */}
      {/* <Form /> */}

      <div style={styles.inner_container}>
        <form onSubmit={onSubmit}>
          <p>
            <label htmlFor="name">Enter your name</label>
            <input className="form-control" value={user_data.name} name="name" onChange={e => handleChange(e)} id="name" placeholder="Enter your name" required type={"text"} />
          </p>
          <p>
            <label htmlFor="email">Enter your email</label>
            <input className="form-control" value={user_data.email} name="email" onChange={e => handleChange(e, "email")} id="email" placeholder="Enter your email" required type={"email"} />
          </p>
          <p>
            <label htmlFor="phone">Enter your phone number</label>
            <input className="form-control" id="phone" value={user_data.phone} name="phone" onChange={e => handleChange(e, "phone")} placeholder="Enter your phone number" required type={"text"} />
          </p>
          <p>
            <label htmlFor="age">Enter your age</label>
            <input className="form-control" id="age" value={user_data.age} name="age" onChange={e => handleChange(e, "age")} required type={"number"} />
          </p>
          <p>
            <label htmlFor="password">Enter a password</label>
            <input className="form-control" value={user_data.password} name="password" onChange={e => handleChange(e)} placeholder="Enter your password" id="password" required type={"password"} />
          </p>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
        <p style={styles.login_link}>Already have account? <Link to={"/login"}>Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  header: {
    color: "red",
    fontSize: 70,
    fontWeight: "Bolder",
  },
  main_container: {
    marginTop: 100,
    width: "100%"
  },
  inner_container: {
    width: "60%",
    margin: "0 auto"
  },
  button: {
    background: "skyblue",
    color: "#fff",
    width: 200,
    height: 30,
    border: "none",
    borderRadius: "5px",
  },
  login_link: {
    marginTop: 20
  },
  footer: {
    background: "black",
    fontSize: "14px",
    color: "#fff",
    height: "300px",
    width: "100%",
  },
};

export default App;
