import React, {useState} from 'react';
import LogixTable from './LogixTable';
import Filters from './Filters'
import logixlogo from './assets/logixboard_logo.png';
import Grid from '@material-ui/core/Grid';
import './LogixboardPoc.scss';

function LogixboardPoc() {
  const [filters, setFilters] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <img className="logix-logo" src={logixlogo} alt="Logixboard" />
        <div>POC</div>
      </header>
      <div className="body">
        <Grid container spacing={8}>
          <Grid item sm={12} md={3}>
            <Filters filters={filters} setFilters={setFilters} />
          </Grid>
          <Grid item sm={12} md={9}>
            <LogixTable filters={filters} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default LogixboardPoc;
