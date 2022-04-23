import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import axios from "axios";
function Analytics() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/getPercent")
      .then((response) => {
        setData(response.data.msg);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Dashboard>
      <div>analytics</div>
    </Dashboard>
  );
}

export default Analytics;
