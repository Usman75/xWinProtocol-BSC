import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { LandingHeader} from './components';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4,4),
    
    alignItems : 'center'
  },
  content: {
    marginTop: theme.spacing(2)
  },
  header: {
    padding: theme.spacing(0,0,0,0),
    alignItems : 'center',
    flexGrow: 1,
    height: "100%",
  },
}));

const Home = () => {
  const classes = useStyles();

  

  
  
  

    
  

  return (
    <div >
      <Grid
        container
        spacing={2}
      >
        
        <Grid
          className={classes.header}
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <LandingHeader />
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Home;
