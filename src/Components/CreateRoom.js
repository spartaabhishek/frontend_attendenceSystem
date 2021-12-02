import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

function Room({ loginId }) {
  const [RoomName, setName] = useState("");
  
  const handleSubmit = (res) => {
    const { RoomName, loginId } = res;
    axios
      .post("http://localhost:5000/api/room/create", {
        room_name: RoomName,
        login_id: loginId,
      })
      .then((response) => {
        console.log(response.data);
        setName("")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ RoomName, loginId });
        }}
      >
        <TextField
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
          value={RoomName}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Room;
