import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Dashboard from "../Components/Dashboard";
import axios from "axios";

import { AuthContext } from "../Provider/AuthManager";

export default function AttendeeTable() {
  const [data, setData] = React.useState([]);
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/get")
      .then((response) => {
        setData(response.data.msg);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Dashboard>
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Registration Number</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.reg}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dashboard>
  );
}
