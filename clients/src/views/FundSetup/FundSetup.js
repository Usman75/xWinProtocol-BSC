import React, { useState, useEffect  } from "react";
import { makeStyles, withStyles } from '@material-ui/styles';
import xWinFundV4 from '../abi/xWinFundV4.json'

import {
  FundList,
} from './components';


import {
  Typography,
  Grid,
  Box,
  FormControl,
  Switch
} from '@material-ui/core';
import palette from "theme/palette";

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1,1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1,1)
    },
  },
  grid: {
    alignItems:"stretch"
 },
 texttitle: {
   color: palette.text.white
 },
 drawer: {
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
},
drawerPaper: {
  width: drawerWidth,
},
menuButton: {
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
},
toolbar: theme.mixins.toolbar,
content: {
  flexGrow: 1,
  padding: theme.spacing(3,3),
},
}));
const drawerWidth = 240;
const FundSetup = props => {
  const { portfolios, tokensMaster, ...rest } = props;
  let Web3 = require('web3');
  const classes = useStyles();
  const [globalWeb3, setGlobalWeb3] = useState("")
  const [networkName, setNetworkName] = useState("")
  const [selectedWallet, setSelectedWallet] = useState("")
  const [filterPortfolios, setFilterPortfolios] = useState([])
  const [filterMyPortfolios, setFilterMyPortfolios] = useState([])
  const [filterTokens, setFilterTokens] = useState([])
  
  const [showMyFund, setShowMyFund] = React.useState(false);
  
  
  useEffect(() => {
    const controller = new AbortController();
    loadWeb3()
    return () => {
      controller.abort();
    }
  }, [portfolios]);

  const loadWeb3 = async () => {

    console.log(window.ethereum)
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

    let filterEnv = "mainnet"
    const netId = await window.web3.eth.net.getId()
    switch (netId) {
      case 1:
        setNetworkName("Mainnet")
        filterEnv = "mainnet"
        break
      case 4:
        setNetworkName("Rinkeby")
        filterEnv = "rinkeby"
        break
      case 3:
        setNetworkName("Ropsten")
        filterEnv = "ropsten"
        break
      case 42:
        setNetworkName("Kovan")
        filterEnv = "kovan"
        break
      case 97:
        setNetworkName("BSCTest")
        filterEnv = "bsctest"
        break
        default:
        //console.log('This is an unknown network.')
    }

    console.log(filterEnv)
    const accounts = await window.web3.eth.getAccounts()
    const wallet = accounts[0]
    setSelectedWallet(accounts[0])

    let balance = await window.web3.eth.getBalance(wallet)
    let myPorts = []
    let filterport = portfolios.filter(x=>x.env.toLowerCase() === filterEnv.toLowerCase())
    let filTokens = tokensMaster.filter(x=>x.env.toLowerCase() === filterEnv.toLowerCase())
    filterport.forEach(async port => {
      const myxWinFunds = new window.web3.eth.Contract(xWinFundV4, port.contractaddress);
      let userfundbal = await myxWinFunds.methods.balanceOf(wallet).call();
      if(parseFloat(userfundbal) > 0){
        myPorts.push(port)
      }
      
    });
    console.log(filterport)
    setFilterTokens(filTokens)
    setFilterPortfolios(filterport)
    setFilterMyPortfolios(myPorts)
  }
  
  const displayPortfolios = () => {
    
    if(filterPortfolios === undefined) return ""

    let funds = filterPortfolios
    if(showMyFund) funds = filterMyPortfolios

    return (
      funds.map(port => (
        <Grid
          item
          lg={3}
          md={5}
          xl={3}
          xs={12}
        > 
           <FundList 
            port={port}
            portfolios={funds}
            globalWeb3={globalWeb3}
            tokensMaster={filterTokens}
            selectedWallet={selectedWallet}
            networkName={networkName}
            showMyFund={showMyFund}
            /> 
           
          </Grid> 
        )) 
    )    
  }

  const handleSwitchChangeEdit = name => event => {

    setShowMyFund(event.target.checked);

  };

  return (
    <div className={classes.root}>
       <main className={classes.content}>
       <Grid
        spacing={4}
      >
        <Box bgcolor="primary.main" color="info.contrastText" p={2}>
          <FormControl className={classes.formControl}>
          <Typography variant="h5">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <AntSwitch
                    checked={showMyFund}
                    onChange={handleSwitchChangeEdit('edit_enable')}
                    inputProps={{
                      name: 'edit_enable',
                      id: 'edit_enable',
                    }}
                    color="primary"
                  />
                </Grid>
                <Grid item>{"Show Only Funds I Subscribed"}</Grid>
              </Grid>
            </Typography>
          </FormControl>
        </Box>
      </Grid> 
     
      <div>
        <Box bgcolor="info.main" color="info.contrastText" p={2}>
          <Typography variant="h5">
            You are connecting to {networkName} with wallet {selectedWallet}
          </Typography>
        </Box>
      <Grid
        container
        spacing={4}
      >
        {displayPortfolios()}
        
      </Grid>
    </div>
    </main>
    </div>
  );

};

export default FundSetup;
