import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthenticated } from "../../utils/helper";
import Header from "../header/Header";

export const withRouter = WrappedComponent => props => {
  return (<WrappedComponent {...props} navigate={useNavigate()}/>);
};

function Tasks () {
  const [ tasks, setTasks ] = useState([]);
  const [authenticated, setAuthenticated ] = useState({});
  const [ server_message, setServerMessage] = useState("");
  const [ toggle, setToggle ] = useState(false);
  const [ task, setTask ] = useState({ name: "" });
  const [ taskUpdate, setTaskUpdate ] = useState("");
  const [ taskId, setTaskId ] = useState("false");
  
  useEffect(() => {
    setAuthenticated(userAuthenticated());
  }, []);

  useEffect(() => {
    if (authenticated?.token) {
      fetchTasks(authenticated.user?.id);
    }
  }, [authenticated]);

  const fetchTasks = async (userId) => {
    const res = await fetch(`http://localhost:5000/api/task/user/tasks?user_id=${userId}`, {
      method: "GET",
      headers: {
        authorization: authenticated.token,
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    });
    const server_response = await res.json();
    if (res.statusText === "OK") {
      if (!Array.isArray(server_response)) {
        setServerMessage(server_response);
      } else {
        setTasks(server_response)
      }
      
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { name: task.name, user_id: authenticated.user?.id }
    const res = await fetch(`http://localhost:5000/api/task/create`, {
      method: "POST",
      headers: {
        authorization: authenticated.token,
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      },
      body: JSON.stringify(data)
    });
    const server_response = await res.json();
    if (res.statusText === "OK") {
      await fetchTasks(authenticated.user?.id);
      setToggle(!toggle);
    }
  }


  const customFunction = async (action, data) => {
    if (action === "update") {
      const api_data = {
        task_id: data,
        status: "complete"
      }

      let res = await fetch(`http://localhost:5000/api/task/status/update`, {
        method: "PUT",
        headers: {
          ACCEPT: "application/json",
          "Content-Type": "application/json",
          authorization: authenticated.token
        },
        body: JSON.stringify(api_data)
      })

      const response = await res.json();
      if (res.statusText === "OK") {
        await fetchTasks(authenticated.user?.id);
      }
    } else if (action === "delete") {
      const res = await fetch(`http://localhost:5000/api/task/delete?task_id=${data}`, {
        method: "DELETE",
        headers: {
          authorization: authenticated.token,
          "Content-Type": "application/json",
          ACCEPT: "application/json"
        },
      });
      const server_response = await res.json();
      if (res.statusText === "OK") {
        await fetchTasks(authenticated.user?.id);
      }
    }
  }

  return (
    <div>
      <Header />
      <div style={styles.task_container}>
        <>
          {toggle ? (
            <div>
              <h1>New task</h1>
              <form onSubmit={onSubmit}>
                <label htmlFor="name">Task description</label>
                <input type={"text"} name="name" id="name" value={task.name} onChange={(e) => setTask({ name: e.target.value})} className="form-control" />
                <button style={styles.submitButton} type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          ) : (
            <div>
            <h1>Tasks Table</h1>
              <div style={styles.flexed_container}>
                {server_message.length > 0 ? <span className="alert alert-danger" style={styles.errorMsg}>{server_message}</span> : (
                  <table className="table table-hover" style={styles.table}>
                    <thead className="thead-dark">
                      <tr>
                        <th>S/N</th>
                        <th>Task</th>
                        <th>User name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>Age</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                      
                    </thead>
                    <tbody>
                      {tasks && tasks.map((task, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{task && task.name}</td>
                          <td>{task?.createdBy.name}</td>
                          <td>{task?.createdBy.email}</td>
                          <td>{task?.createdBy.phone}</td>
                          <td>{task?.createdBy.age}</td>
                          <td>{task?.status}</td>
                          <td>
                            <button style={styles.editButton} class="btn btn-primary" onClick={() => customFunction("update", task.id)}>Complete task</button>
                          </td>
                          <td>
                            <button style={styles.buttons}  className="btn btn-danger" onClick={() => customFunction("delete", task.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              
              </div>
            </div>
          )}
        </>
        <button className="btn btn-info" onClick={() => setToggle(!toggle)} style={styles.createTask}>{toggle ? "Close" : "Create task"}</button>
      </div> 
    </div>
  )
}


const styles = {
  task_container: {
    width: "50%",
    margin: "0 auto",
    // border: "2px solid #000",
    marginTop: 50
  },
  flexed_container: {
    display: "flex"
  },
  errorMsg: {
    width: "100%"
  },
  table: {
    width: "100%",
  },
  createTask: {
    float: "right"
  },
  submitButton: {
    marginTop: 20
  },
  buttons: {
    width: 50,
    hieght: 30,
    fontSize: 9,
    marginLeft: 4
  },
  editButton: {
    width: 100,
    hieght: 30,
    fontSize: 9
  }
}
export default withRouter(Tasks);