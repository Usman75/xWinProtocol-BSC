import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  ProtocolFAQ,
  WinSeriesFAQ,
} from './components';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4,4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1,1)
    },
    alignItems : 'center'
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const FAQBSC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <ProtocolFAQ />
        </Grid>
        
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <WinSeriesFAQ />
        </Grid>
        {/* <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <LendingFAQPayment />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default FAQBSC;
