import users from "../../data.json";

function UserList () {
  return (
    <div className="mt-4">
      <h2>User Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {users.user.map((user, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td><a href={`dashboard/${user._id}`}>View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList;