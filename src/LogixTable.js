import React, { useState, useEffect } from "react";
import * as d3 from "d3-fetch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import testData from "./assets/shipmentData.csv";
import moment from 'moment';

import "./LogixTable.scss";

const sortListBy = (list, sortBy) => {
  switch (sortBy) {
    case "Client Name":
    case "Destination":
    case "Mode":
    case "Origin":
    case "Status":
    case "Shipment ID":
      return list.sort((a,b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
    case "Estimated Departure":
    case "Estimated Arrival":
      return list.sort((a,b) => moment(a[sortBy], 'MM/DD/YY').diff(moment(b[sortBy], 'MM/DD/YY')));
    default:
      return list;
  }
};

function LogicTable({ filters }) {
  const [originalData, setOriginalData] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    d3.csv(testData).then(function (data) {
      setShipmentData(data);
      setOriginalData(data);
    });
  }, []);

  useEffect(() => {
    let filteredArray = [...originalData]
      if (filters?.sortBy) {
        filteredArray = sortListBy([...filteredArray], filters?.sortBy);
      }
      if (filters?.mode) {
        filteredArray = [...filteredArray].filter(shipment => shipment.Mode.trim() === filters.mode);
      }
      if (filters?.name) {
        filteredArray = [...filteredArray].filter(shipment => shipment['Client Name'].toLowerCase().includes(filters.name.toLowerCase()));
      }
      setShipmentData(Object.keys(filters).length ===  0 ? originalData : filteredArray)
  }, [filters]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "Client Name", label: "Client Name" },
    { id: "Destination", label: "Destination" },
    { id: "Estimated Departure", label: "ETD" },
    { id: "Estimated Arrival", label: "ETA" },
    { id: "Mode", label: "Mode" },
    { id: "Origin", label: "Origin" },
    { id: "Shipment ID", label: "Shipment ID" },
    { id: "Status", label: "Status" },
  ];

  console.log('AAA shipemnt data', shipmentData)
  return (
    <div>
      <TableContainer classes={{ root: "table-container" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  classes={{ root: "table-header" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {shipmentData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((shipment) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={shipment.code}
                    classes={{ root: "table-row" }}
                  >
                    {columns.map((column) => {
                      const value = shipment[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={shipmentData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default LogicTable;
