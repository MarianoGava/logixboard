import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Filters.scss";

function Filters({ filters, setFilters }) {
    console.log('AAA filters', filters)
    console.log('AAA filters.name', filters.name)
  return (
    <div className="filter-container">
      <h3>Filters</h3>
      <FormControl variant="filled" className="form-control">
        <InputLabel id="demo-simple-select-filled-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="select-sort-id"
          value={filters.sortBy || 0}
          onChange={(event) => setFilters({ ...filters, sortBy: event.target.value})}
        >
          <MenuItem value="Client Name">Client Name</MenuItem>
          <MenuItem value="Destination">Destination</MenuItem>
          <MenuItem value="Estimated Departure">ETD</MenuItem>
          <MenuItem value="Estimated Arrival">ETA</MenuItem>
          <MenuItem value="Mode">Mode</MenuItem>
          <MenuItem value="Origin">Origin</MenuItem>
          <MenuItem value="Shipment ID">Shipment ID</MenuItem>
          <MenuItem value="Status">Status</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" className="form-control">
        <InputLabel id="demo-simple-select-filled-label">Mode</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="select-mode-id"
          value={filters.mode || 0}
          onChange={(event) => setFilters({ ...filters, mode: event.target.value})}
        >
          <MenuItem value="Rail">Rail</MenuItem>
          <MenuItem value="Air">Air</MenuItem>
          <MenuItem value="Sea">Sea</MenuItem>
        </Select>
      </FormControl>
      <TextField
          label="Name"
          id="name-id"
          value={filters.name || ''}
          variant="filled"
          onChange={(event) => setFilters({ ...filters, name: event.target.value})}
        />
        <Button variant="contained" onClick={(event) => setFilters({})}>Clear Filters</Button>
    </div>
  );
}
export default Filters;
