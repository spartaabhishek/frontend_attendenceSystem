import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Modal from "@mui/material/Modal";
import RefreshIcon from "@mui/icons-material/Refresh";

import CreateCsv from "../Components/CreateCsv";
import Dashboard from "../Components/Dashboard";
import axios from "axios";

import { AuthContext } from "../Provider/AuthManager";
import { navigate } from "gatsby";

function AddAttendeeModal({ open, handleClose, roomId }) {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/room/addUser", {
        room_id: roomId,
        email,
      })
      .then((response) => {
        setEmail("");
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ backgroundColor: "white", padding: 10, diplay: "inline" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            id="outlined-basic"
            label="Attendee Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

function StartAttendanceModal({ open, handleClose, roomId }) {
  const [physicalRoomId, setPhysicalRoomId] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/attendance/start", {
        room_id: roomId,
        physical_room_id: physicalRoomId,
      })
      .then((response) => {
        setPhysicalRoomId("");
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ backgroundColor: "white", padding: 10, diplay: "inline" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            id="outlined-basic"
            label="Class Room"
            variant="outlined"
            value={physicalRoomId}
            onChange={(e) => setPhysicalRoomId(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.room_name}
        </TableCell>
        <TableCell component="th" scope="row">
          <Button variant="contained" onClick={() => setOpen1(true)}>
            Add
          </Button>
          <AddAttendeeModal
            open={open1}
            handleClose={() => setOpen1(false)}
            roomId={row.room_id}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          <Button variant="contained" onClick={() => setOpen2(true)}>
            Start
          </Button>
          <StartAttendanceModal
            open={open2}
            handleClose={() => setOpen2(false)}
            roomId={row.room_id}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(row.attendance_list).map((date, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {date}
                        </TableCell>
                        <TableCell>
                          <CreateCsv
                            data={row.attendance_list[date]}
                            date={date}
                            roomName={row.room_name}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Attendee List
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Reg</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.attendee_list.map((x, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {x.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {x.reg}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(true);
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (refresh && authContext.isLoggedIn) {
      setRefresh(false);
      axios
        .post("http://localhost:5000/api/room/get", {
          login_id: authContext.login_id,
        })
        .then((response) => {
          setData(response.data.msg);
        })
        .catch((err) => console.log(err));
    }
  }, [refresh]);

  return (
    <Dashboard>
      {authContext.isLoggedIn ? (
      <>
      <div>
        <Button variant="contained" onClick={() => setRefresh(true)}>
          <RefreshIcon />
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Room Name</TableCell>
              <TableCell>Add Attendee</TableCell>
              <TableCell>Start Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <Row key={i} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
      ) 
      : navigate("/")
      }
    </Dashboard>
  );
}
