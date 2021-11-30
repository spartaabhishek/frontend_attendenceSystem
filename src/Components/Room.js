import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import axios from "axios";

const handleSubmit = (res) => {
  console.log(res);
  const { RoomName, LoginId } = res;
  axios
    .post("http://localhost:5000/api/room/create", {
      room_name: RoomName,
      login_id: LoginId,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};

function Room() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  const [RoomName, setName] = useState("");
  const [LoginId, setLogin] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ RoomName, LoginId });
        }}
      >
        <TextField
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
          value={RoomName}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Login ID"
          variant="outlined"
          value={LoginId}
          onChange={(e) => setLogin(e.target.value)}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Room;
