import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthorized } from "../../utils/helper";

export const withRouter = WrappedComponent => props => {
  return (<WrappedComponent {...props} navigate={useNavigate()}/>);
};

function Login(props) {
  const [ users, setUsers ] = useState([]);
  const [ user_data, setUserData ] = useState({ email: "", password: "" });

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
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user_data)
    });

    const server_response = await res.json();
    if (res.status === 200) {
      setUserData({ email: "", password: "" });
      userAuthorized(server_response);
      props.navigate("/tasks");
    }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={styles.main_container}>

      <div style={styles.inner_container}>
        <form onSubmit={onSubmit}>
          <p>
            <label htmlFor="email">Enter your Email</label>
            <input className="form-control" value={user_data.name} name="email" onChange={e => handleChange(e)} id="email" placeholder="example@domain.com" required type={"email"} />
          </p>
          <p>
            <label htmlFor="password">Enter your password</label>
            <input className="form-control" value={user_data.password} name="password" onChange={e => handleChange(e)} id="password" placeholder="********" required type={"password"} />
          </p>
         
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
        <p style={styles.login_link}>Don't have account? <Link to={"/"}>Sign up</Link></p>
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

export default withRouter(Login) ;
