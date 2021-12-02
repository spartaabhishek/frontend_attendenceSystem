import * as React from "react";
import axios from "axios";
import { navigate } from 'gatsby'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TeamSvg from "../images/team.svg";

import { AuthContext } from "../Provider/AuthManager";

import "./index.css";

const IndexPage = () => {

   const [username, setUsername] = React.useState("")
   const [pwd, setPwd] = React.useState("") 
   
    const authContext = React.useContext(AuthContext)

   const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/auth/login", {
        password: pwd,
        username
      })
      .then((res) => {
        if (res.data.status=="success") authContext.updateAuthContext(res.data.msg.login_id)
        setPwd("");
        setUsername("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          backgroundImage: `url(${TeamSvg})`,
          backgroundSize: "cover",
        }}
      />
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Box sx={{ backgroundColor: "white", padding: 10, diplay: "inline" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 10
            }}  
          >
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <br />
            <br />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        </Box>
      </div>
      { authContext.isLoggedIn && navigate("/attendence") }
    </div>
  );
};

export default IndexPage;
