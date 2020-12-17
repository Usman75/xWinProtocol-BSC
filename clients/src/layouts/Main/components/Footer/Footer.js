import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Tooltip, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3,3,3),
    alignItems: 'center'

  },
  div: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  div2: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));


const Footer = props => {
  const { className } = props;

  const classes = useStyles();
  
  const getYear = () => {

    let mydate = new Date()
    return mydate.getFullYear()
  }

  return (
    <div
      
      className={clsx(classes.root, className)}
    >
      
      <Divider />
      <div className={classes.flexGrow} align="center">
      <Typography variant="h6" variant="body1">
              {"Owned & Designed By"}
            </Typography>
        <Typography variant="body1">
          &copy;{' '}
          <Link
            component="a"
            href="https://wininnovation.net/"
            target="_blank"
          >
            xWin
          </Link>
          {" " }{getYear()}
        </Typography>
        <Typography variant="caption">
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
