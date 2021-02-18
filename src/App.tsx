import { Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import CustomTable from './components/CustomTable';

const useStyle = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  footer: {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    background: '#f6f6ef',
    minWidth: 796,
  },
  url: {
    textDecoration: 'none',
    color: '#000000',
    fontSize: '8pt'
  },
  search: {
    minWidth: 796,
    display: 'flex',
    justifyContent: 'center',
    background: '#f6f6ef',
    color: '#828282',
    fontSize: '10pt'
  },

}));

const App: React.FC = () => {
  const classes = useStyle();
  console.log(process.env)
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <CustomTable />
          
        </Grid>
        <Grid item xs={12} className={classes.root}>
          <div className={classes.footer}> 
            <a href="#" className={classes.url}> Guidelines |&nbsp; </a>
            <a href="#" className={classes.url}> FAQ |&nbsp; </a>
            <a href="#" className={classes.url}> Lists |&nbsp; </a>
            <a href="#" className={classes.url}> API |&nbsp; </a>
            <a href="#" className={classes.url}> Security |&nbsp; </a>
            <a href="#" className={classes.url}> Legal |&nbsp; </a>
            <a href="#" className={classes.url}> Apply to YC |&nbsp; </a>
            <a href="#" className={classes.url}> Contact </a>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.root}>
          <div className={classes.search}> 
          <label htmlFor="">Search:&nbsp;&nbsp;</label>
          <input type="text" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
