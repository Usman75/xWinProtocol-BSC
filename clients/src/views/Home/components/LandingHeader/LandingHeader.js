import React, { useState  } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import HttpsIcon from '@material-ui/icons/Https';
import { useTranslation } from 'react-i18next'
  
import {
  Card,
  Typography,
  Button,
  CardActions,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    backgroundImage: 'url(/images/automation2.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    height: 450
  },
  actions: {
    padding: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center'
  }, 
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  quoteContainer2: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 500,
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    height: 30,
    width: 30
  },
  avatar2: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 30,
    width: 30
  },
  card: {
    padding: theme.spacing(0, 0, 0),
 },
 grid: {
  padding: theme.spacing(1, 1, 1, 1),
  [theme.breakpoints.down('xs')]: {
    display: 'none'
  },
  justifyContent: 'center',
  alignItems: 'center',

},
gridsmall: {
  padding: theme.spacing(1, 1, 1, 1),
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
},
 
}));


const LandingHeader = props => {
  const classes = useStyles();
  const { t } = useTranslation()
  const [globalWeb3, setGlobalWeb3] = useState("")
  
  const handleOnClickMetamask = () => async event => {
    event.preventDefault();

    let Web3 = require('web3');
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    setGlobalWeb3(window.web3)
    window.open('/funds',"_self")

  }

  
  return (

    <div className={classes.root}>
        <div className={classes.actions}>
            <Typography
                className={classes.quoteText}
                variant="h1"
              >
                {t('Investment Management Protocol')}
              </Typography>
        </div>
        <Typography
                className={classes.quoteText}
                variant="h4"
              >
                {t('xWIN makes investment easier to investor')}
              </Typography>
              <Typography
                className={classes.quoteText}
                variant="h4"
              >
                {t('We connect you to the world best fund manager')}
              </Typography>
        
      <div className={classes.actions}>
        <Card className={classes.card}>
           
            
              <CardActions>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={handleOnClickMetamask()}
                    startIcon={<HttpsIcon />}
                  >
                    {t('Connect Metamask')}
                  </Button>
              </CardActions>
            
          </Card>
          </div>
    </div>
  );
};

LandingHeader.propTypes = {
  className: PropTypes.string,
  symbols: PropTypes.array.isRequired
};

export default LandingHeader;
