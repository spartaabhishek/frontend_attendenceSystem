import React from 'react';
import { CSVLink } from "react-csv";

const headers = [
    { label: "Name", key: "name" },
    { label: "Registration Number", key: "reg" },
    { label: "attendance", key: "attendance" }
  ];

export default function CreateCsv({ data, date, roomName }) {
    const csvReport = {
        headers,
        data,
        filename: `${date}_${roomName}.csv`
    }

    return (
        <CSVLink {...csvReport}>
            Download CSV
        </CSVLink>
    )
}