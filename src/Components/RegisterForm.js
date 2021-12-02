import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import axios from "axios";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const handleSubmit = (res, setSubmitted) => {
  const { name, regno, email, defImage, handleClose } = res;
  axios
    .post("http://localhost:5000/api/face/register", {
      name,
      reg: regno,
      email,
      img: defImage,
    })
    .then((response) => {
      setSubmitted(true);
      setTimeout(function () {
        setSubmitted(false);
      }, 2000);

      handleClose();
    })
    .catch((err) => console.log(err));
};

function Form() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [regno, setReg] = useState("");
  const [email, setEmail] = useState("");
  const [defImage, setImage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ name, regno, email, defImage, handleClose }, setSubmitted);
          setImage("");
          setName("");
          setReg("");
          setEmail("");
        }}
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <TextField 
          id="outlined-basic"
          label="Registeration Number"
          variant="outlined"
          value={regno}
          onChange={(e) => setReg(e.target.value)}
        />
        <br />
        <br />

        <Stack direction="row" alignItems="center" spacing={2}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) =>
                getBase64(e.target.files[0]).then((res) => setImage(res))
              }
            />
          </label>
        </Stack>
        <br />
        <br />
        
        <Button variant="contained" type="submit">
          Submit
        </Button>
        {submitted && <div>Form Submitted</div>}
      </form>
    </div>
  );
}

export default Form;
