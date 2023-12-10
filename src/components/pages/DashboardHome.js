import React, { useNavigation, useHistory } from "react";
import { Outlet } from "react-router-dom";

function DashboardHome () {
  return (
    <div className="wrapper" style={styles.wrapper}>
      <div className="p-5" style={styles.sidebar}>
        <p style={{ cursor: "pointer"}}><a href="/dashboard">Users</a></p>
        <p style={{ cursor: "pointer"}}><a href="/dashboard/settings">Settings</a></p>
      </div>
      <div style={styles.maincontent}>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardHome;

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    minHeight: "100%"
  },
  sidebar: {
    width: "20%",
    minHeight: "100vh",
    height: "100%",
    background: "teal"
    // borderRight: "1px solid black"
  },
  maincontent: {
    width: "80%",
    minHeight: "100vh",
    height: "100%"
  }
}