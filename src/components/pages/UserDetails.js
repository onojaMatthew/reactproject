import React, { useState, useEffect } from "react";
import users from "../../data.json";
function UserDetails () {
  const userId = window.location.pathname.split("/")[2];
  const userDetails = users.user.find(user => user._id.toString() === userId.toString());
  return (
    <div className="mt-4">
      <h2>User Detail Page</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Agility User</th>
            <th>Onboarded</th>
            <th>Account Status</th>
            <th>Store Owner</th>
            <th>Subscription Plan</th>
            <th>Subscription Status</th>
            <th>Last Subscription Date</th>
            <th>Next Subscription Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userDetails.first_name}</td>
            <td>{userDetails.last_name}</td>
            <td>{userDetails.email}</td>
            <td>{userDetails.phone}</td>
            <td>{userDetails.isAgility}</td>
            <td>{userDetails.is_onboarded}</td>
            <td>{userDetails.status}</td>
            <td>{userDetails.has_store}</td>
            <td>{userDetails.subscription_plan}</td>
            <td>{userDetails.subscription_status}</td>
            <td>{userDetails.subscription_start_date}</td>
            <td>{userDetails.subscription_expiry_date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UserDetails;