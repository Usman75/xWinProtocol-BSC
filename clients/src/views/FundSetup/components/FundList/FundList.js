import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import format from 'format-number';
import xWinFundV4 from '../../../abi/xWinFundV4.json'
import xWinFundV5 from '../../../abi/xWinFundV5.json'
import xWinProtocolV4 from '../../../abi/xWinProtocolV4.json'
import xWinProtocolV5 from '../../../abi/xWinProtocolV5.json'
import { Link as RouterLink } from 'react-router-dom';
import { CardActionArea, colors } from '@material-ui/core';

import {
  Card,
  CardContent,
  Button,
  Typography,
  CardHeader,
  Avatar,
  Table,
  TableRow,
  TableCell,
  LinearProgress,
  DialogContentText,
  Link
} from '@material-ui/core';
import xWinLib from 'xWinLib';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    flexGrow: 1,
    height: "100%"
  },
  content: {
    marginTop: theme.spacing(1)
  },
  secondaryHeading: {
    color: theme.palette.success.main,
  },
  primaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.primary.main,
  },
  avatar: {
    //backgroundColor: theme.palette.primary.error,
    height: 75,
    width: 75
  },
  tableRow: {
    "&$hover:hover": {
      backgroundColor: "blue"
    }
  },
  tableCell: {
    "$hover:hover &": {
      color: "pink"
    }
  },
  hover: {},
  negativeNum: {
    color: theme.palette.error.main
  },
  positiveNum: {
    color: theme.palette.primary.main
  },
  CardTitle: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.white,
    fontWeight: 500,
  },
  tableHightlightNegative: {
    backgroundColor: theme.palette.warning.light,
  },
  tableHightlightPositive: {
    backgroundColor: theme.palette.success.light,
  },
  cellHightlight: {
    //color: theme.palette.white
  },
  cellHideSmall: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

}));

const FundList = props => {
  const { className, portfolios, port, globalWeb3, tokensMaster, selectedWallet, gasPrices, networkName, showMyFund, ...rest } = props;
  const classes = useStyles();
  const [fundData, setFundData] = useState({
    uniprice: 0,
    fundvalue: 0
  });
  const [loading, setLoading] = React.useState(false);
  
  const [myxWinProtocol, setMyxWinProtocol] = React.useState([]);
  const [userData, setUserData] = useState({
    walletETHBalance: 0,
    selectedAccount: ""
  });
  
  const getProgress= () =>{
    
    if(!loading) return ""

    return (
        <DialogContentText >
              <LinearProgress 
                color="secondary" 
                size={50}
                thickness={4}
              />
            </DialogContentText>
    )
  }
  
  //fetch cToken data
  useEffect(() => {
    const controller = new AbortController();
    loadFundData()
    return () => {
      controller.abort();
    }
  }, [globalWeb3]);
  
  const getxWinProtocol = () => {
    if(port.version === "V4"){
      return xWinProtocolV4
    }
    if(port.version === "V5"){
      return xWinProtocolV5
    }
  }

  const getxWinFundVersion = () => {
    if(port.version === "V4"){
      return xWinFundV4
    }
    if(port.version === "V5"){
      return xWinFundV5
    }
  }

  const loadFundData = async () => {

    if(!globalWeb3) return

    setLoading(true)

    let xWinProtocol = new globalWeb3.eth.Contract(getxWinProtocol(), port.protocoladdress);
    setMyxWinProtocol(xWinProtocol)
    const myxWinFunds = new globalWeb3.eth.Contract(getxWinFundVersion(), port.contractaddress);
    if(selectedWallet !== undefined){
      let balance = await globalWeb3.eth.getBalance(selectedWallet)
      let userfundbal = await myxWinFunds.methods.balanceOf(selectedWallet).call();
      setUserData({
        "walletETHBalance" :  globalWeb3.utils.fromWei(balance.toString()), //balance / PRECISION,
        "selectedAccount" : selectedWallet,
        "userfundbal" : globalWeb3.utils.fromWei(userfundbal.toString()), // userfundbal / PRECISION
      })  
    }

    let myFundData = await myxWinFunds.methods.GetFundDataAll().call();
    let totalSupply = myFundData[3]
    let fundETHbalance = myFundData[4]
    let uniprice = myFundData[5]
    let fundvalue = myFundData[6]
    let tokenNames = []
    
    setFundData({
      ...fundData,
      "fundvalue": globalWeb3.utils.fromWei(fundvalue.toString()), //fundvalue / PRECISION,
      "tokenNames": tokenNames,
      "uniprice": globalWeb3.utils.fromWei(uniprice.toString()), //uniprice / PRECISION,
      "totalSupply":  globalWeb3.utils.fromWei(totalSupply.toString()), // totalSupply / PRECISION,
      "fundETHbalance": globalWeb3.utils.fromWei(fundETHbalance.toString()), //fundETHbalance / PRECISION
      "networkName": networkName
    })

    setLoading(false)
    
  }

  const getReturns = () => {
    return (fundData.uniprice / 1 -1) * 100
  }

  const getReturnsDisplay = () => {

    let returns = getReturns();
    if(returns > 0){
      return (
        <Button
            color="primary"
            variant="contained"
          >
            {format({prefix: '', suffix: '%'})(xWinLib.roundTo(getReturns(),2))}
          </Button>
      )
    }else{
      return (
        <Button
            color={colors.orange[600]}
            variant="contained"
          >
            {format({prefix: '', suffix: '%'})(xWinLib.roundTo(getReturns(),2))}
          </Button>
      )
    }
  }

  const getLogo = (logoname) => {
    return "/images/logos/"+ logoname
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        avatar={
          <Link 
            component={RouterLink}
            to={{
            pathname: `/funddetails/${port.contractaddress}`,
            state: {
              fundData: fundData,
              port: port,
              userData: userData,
              gasPrices:gasPrices,
              selectedWallet:selectedWallet
            }
          }}>
        <Avatar
            className={classes.avatar}
            src={getLogo(port.logo)}
          >
           
          </Avatar>  
          </Link>
        }
        
        className={classes.primaryHeading}
        subheader= {"My Balance: " + format({prefix: "", suffix: " "})(xWinLib.roundTo(userData.userfundbal,4))}
        title={port.name + " - " + port.symbol}
        titleTypographyProps={{variant:'h5' }}
        subheaderTypographyProps={{variant:'body1' }}
      />
      {getProgress()}
       <CardActionArea>
       <Link 
            component={RouterLink}
            to={{
            pathname: `/funddetails/${port.contractaddress}`,
            state: {
              fundData: fundData,
              port: port,
              userData: userData,
              gasPrices:gasPrices,
              selectedWallet:selectedWallet
            }
          }}>
        <CardContent>
          <Table size="small">
            <TableRow>
              <TableCell>
                <Typography variant="body2" className={classes.positiveNum}>
                  <span>Unit Price:</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" className={classes.positiveNum}>
                {format({prefix: " ", suffix: ''})(xWinLib.roundTo(fundData.uniprice,4))}
                </Typography>
              </TableCell>
              
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body2" className={classes.positiveNum}>
                  Total AUM:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" className={classes.positiveNum}>
                  {format({prefix: "", suffix: xWinLib.getBaseCcy(networkName)})(xWinLib.roundTo(fundData.fundvalue,4))}
                </Typography>
              </TableCell>
              </TableRow>
              <TableRow>
              <TableCell>
                <Typography variant="body2" className={classes.positiveNum}>
                  Total Supply:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" className={classes.positiveNum}>
                  {format({prefix: "", suffix: ''})(xWinLib.roundTo(fundData.totalSupply,4))}
                  </Typography>
              </TableCell>
              </TableRow>
              <TableRow>
              
                <TableCell>
                <Typography variant="body2" className={classes.positiveNum}>
                    Performance Since Inception:
                </Typography>
                </TableCell>
               
                <TableCell>
                {
                  getReturnsDisplay()
                }
                </TableCell>
              </TableRow>
          </Table>
          
        </CardContent>
        </Link>
        </CardActionArea>     
    </Card>
  );
};

export default FundList;
