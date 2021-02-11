import { Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import CustomTable from './components/CustomTable';

const useStyle = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const App: React.FC = () => {
  const classes = useStyle();

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <CustomTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
