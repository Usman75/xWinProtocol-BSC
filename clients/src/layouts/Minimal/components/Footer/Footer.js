import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3,3,3),
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'url(/images/automation.jpg)',
    
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(3, 15, 3),
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 5, 3),
      textAlign: 'center',
      justifyContent: 'center',
      },
  }, 
  heading: {
    fontSize: theme.typography.pxToRem(20),
    //flexBasis: '33.33%',
    //flexShrink: 0,
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: theme.typography.pxToRem(10),
    // },
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  quoteContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/automation.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    //height: 200,
    position: 'relative',
    zindex: 0, 

  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  grid: {
     padding: theme.spacing(1, 3, 1),
     justifyContent: 'center',
     alignItems: 'center',
      display: 'flex',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),

  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  card: {
    padding: theme.spacing(0, 0, 0),
    justifyContent: 'center',
    alignItems: 'center',
 },
}));


const Footer = props => {
  const classes = useStyles();
  
  const getYear = () => {

    let mydate = new Date()
    return mydate.getFullYear()
  }

  return (
    
    <div className={classes.root}>
     
     <div className={classes.grid}>
            <Typography variant="h6" className={classes.quoteText}>
              {"Owned & Designed By"}
            </Typography>
     </div>
     <div className={classes.grid}>
        <Typography variant="h6" className={classes.quoteText}>
              &copy;{' '}
              <Link
                className={classes.quoteText}
                component="a"
                href="https://x-win.io/"
                target="_blank"
              >
                xWIN 
              </Link>
              {" " }{getYear()}
            </Typography>
     </div>
     <div className={classes.grid}>
            <Typography variant="h6" className={classes.quoteText}>
              We love DEFI!
            </Typography>
     </div>
        
      
    </div>

  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
