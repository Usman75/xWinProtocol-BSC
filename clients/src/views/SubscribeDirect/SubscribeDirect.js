import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import '@icon/cryptocurrency-icons/cryptocurrency-icons.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import xWinLib from 'xWinLib'
import format from 'format-number';
import Circular from '../Circular/Circular'
import { Token, WETH, Fetcher, Route, Percent, TradeType, TokenAmount, Trade } from '@uniswap/sdk'
import { TokenBSC, WETHBSC, FetcherBSC, RouteBSC, PercentBSC, TradeTypeBSC, TokenAmountBSC, TradeBSC } from '@bscswap/sdk'
import { Alert } from '@material-ui/lab';
// import { ethers } from "ethers";
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'

import {
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableRow,
  TableCell,
  LinearProgress,
  Table,
  ButtonGroup,
  CardHeader,
  IconButton,
  TextField,
  Snackbar
} from '@material-ui/core';

const useStyles =  makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  avatar: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  text: {
    width: 120,
    margin: 5
  },
  tableRow: {
    padding: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  tableCell: {
    padding: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  title: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: theme.palette.white
  },
  CardTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    fontWeight: 700,
    //textAlign: 'center'
  },
  negativeNum: {
    color: theme.palette.error.main
  },
  secondaryHeading: {
    color: theme.palette.success.main,
  },
  
}));

const SubscribeDirect = forwardRef((props, ref) => {
  const { className, fundData, tokensMaster, userData, myxWinProtocol, port, globalWeb3, networkName, uniswapV2FactoryProtocol, ...rest } = props;
  const classes = useStyles();
  const refCircular = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [UNIminAmount, setUNIminAmount] = React.useState([]);
  const [slippageAmt, setSlippageAmt] = React.useState(1);
  const [minimumAmountOut, setMinimumAmountOut] = React.useState([]);
  const [destaddress, setDestaddress] = React.useState([]);
  const [subsAmt, setsubsAmt] = useState(0);
  const [openMsg, setOpenMsg] = React.useState(false);
  const [msgStatus, setMsgStatus] = React.useState("success");
  const [responseMsg, setResponseMsg] = React.useState("");

  const showMessage = () => {
    setOpenMsg(true);
  };

  const hideMessage = () => {
    setOpenMsg(false);
  };


  const handleOpen = () => {
    setOpenAdd(true);
  }
  const PRECISION = 10 ** 18

  const handleCloseAdd = () => {
    setLoading(false)
    setOpenAdd(false);
  }

  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen
    };
  });

  const handleClickSubs = event => {
    event.preventDefault();
    
    if(networkName.toLowerCase() !== "bsctest"){
      if(minimumAmountOut.length !== fundData.tokenNames.length-1) return
    }
    
    setLoading(true)
    const subsAmtInWei = globalWeb3.utils.toWei(subsAmt.toString())
    xWinLib.SubscribeDirectAsync(
      myxWinProtocol, 
      port.contractaddress, 
      userData.selectedAccount, 
      minimumAmountOut, 
      destaddress, 
      subsAmtInWei,
      port.version
      )
    .then(res =>
      { 
        console.log(res)
        setLoading(false)
        setMsgStatus("success")
        setResponseMsg(res)
        showMessage()
      }
    )
    .catch(err => {
      setLoading(false)
      console.log(err)
      setMsgStatus("error")
      setResponseMsg(err)
      showMessage()
      }
    )
  };

  const handleClickAmt = (ratio) => event => {
    event.preventDefault();

    const subAmount = xWinLib.roundTo(ratio * userData.walletETHBalance, 5)
    setsubsAmt(subAmount)

    if(networkName.toLowerCase() === "bsctest"){
      GetEstOutputBSC(subAmount)
    }else{
      GetEstOutput(subAmount)
    }
  };

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

  const getEstBSCAsync = (toToken, subAmount) =>{
    return new Promise(function(resolve, reject) {
      
      resolve([0, 0])
      })
  }

  const getEstAsync = (toToken, subAmount) =>{
    return new Promise(function(resolve, reject) {
      
      // let pairtemp = await uniswapV2FactoryProtocol.methods.getPair(toToken.address, xWinLib.GetETH_ADDRESS()).call();
      console.log(uniswapV2FactoryProtocol)
      console.log(toToken.address)
      console.log(uniswapV2FactoryProtocol)
      

      
      const chainID = xWinLib.GetChainID(fundData.networkName) // ChainId.KOVAN
      console.log(chainID)
      const weth = WETH[chainID]
      const slippageTolerance = new Percent(slippageAmt * 100, '10000')
      const SRC_QTY_WEI = getETHToTrade(toToken, subAmount)
      const tokenDest = new Token(chainID, toToken.address, 18)
      //console.log(SRC_QTY_WEI)
      let amountOut = 0

      console.log(IUniswapV2Pair)
      uniswapV2FactoryProtocol.methods.getPair(tokenDest.address, weth.address).call()
      .then(pair => {
        console.log(pair)
        let uniswapV2Pair = new globalWeb3.eth.Contract(IUniswapV2Pair.abi, pair);
        console.log(uniswapV2Pair)
        uniswapV2Pair.methods.getReserves().call()
        .then(reserves => {
          console.log(reserves)
          //const [reserve0, reserve1] = reserves
        })
        
      })
      .catch(err => {
        console.log('error: %j', err)
        reject([0, 0])
      })



      const pair = Fetcher.fetchPairData(tokenDest, weth)
      .then(pair => {

        console.log(pair)
        const route = new Route([pair], weth)
        const trade = new Trade(route, new TokenAmount(weth, SRC_QTY_WEI), TradeType.EXACT_INPUT)
        //let mprice = route.midPrice.toSignificant(18)
        amountOut = trade.minimumAmountOut(slippageTolerance).toSignificant(18)
        //const priceMid = SRC_QTY_WEI / PRECISION * mprice
        //const priceimpact = Math.abs((amountOut / priceMid - 1) * 100)
        const priceimpact = trade.priceImpact.toSignificant(6)
        // amountOutMin.push((amountOut * 10 ** SRC_DECIMALS).toString())
        console.log(amountOut)
        resolve([amountOut, priceimpact])
      })
      .catch(err => {
        console.log('error: %j', err)
        reject([0, 0])
      })
  
    })
  }

  const GetEstOutputBSC = (subAmount) => {
  
    let EstAmt = []
    let amountOutMin = []
    let targetaddress = []

    let ethName
    if(networkName.toLowerCase() === "bsctest"){
      ethName = fundData.tokenNames.find(x=>x.address === xWinLib.GetBNB_ADDRESS())
    }else{
      ethName = fundData.tokenNames.find(x=>x.address === xWinLib.GetETH_ADDRESS())
    }
    
    let existingAmt = ethName.balance;
    let totalSubsAmt = parseFloat(existingAmt) + parseFloat(subAmount)
    Object.keys(fundData.tokenNames).forEach(function (key) {
      if(fundData.tokenNames[key].address !== "0x0000000000000000000000000000000000000000"){
        //console.log(fundData.tokenNames[key])
        getEstBSCAsync(fundData.tokenNames[key], totalSubsAmt)
        .then(amount => 
          {
            console.log(amount)
          EstAmt.push({
            "address": fundData.tokenNames[key].address,
            "amountOut": amount[0],
            "priceimpact": amount[1],
          })
          amountOutMin.push(globalWeb3.utils.toWei(amount[0].toString()))
          targetaddress.push(fundData.tokenNames[key].address)
        })
        .catch(err => console.log(err))
      }
    })
    setMinimumAmountOut(amountOutMin)
    setDestaddress(targetaddress)
    setUNIminAmount(EstAmt)
  }

  const GetEstOutput = (subAmount) => {
  
    let EstAmt = []
    let amountOutMin = []
    let targetaddress = []

    let ethName
    if(networkName.toLowerCase() === "bsctest"){
      ethName = fundData.tokenNames.find(x=>x.address === xWinLib.GetBNB_ADDRESS())
    }else{
      ethName = fundData.tokenNames.find(x=>x.address === xWinLib.GetETH_ADDRESS())
    }
    
    let existingAmt = ethName.balance;
    let totalSubsAmt = parseFloat(existingAmt) + parseFloat(subAmount)
    //console.log(totalSubsAmt)
    Object.keys(fundData.tokenNames).forEach(function (key) {
      if(fundData.tokenNames[key].address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"){
        //console.log(fundData.tokenNames[key])
        getEstAsync(fundData.tokenNames[key], totalSubsAmt)
        .then(amount => 
          {
          EstAmt.push({
            "address": fundData.tokenNames[key].address,
            "amountOut": amount[0],
            "priceimpact": amount[1],
          })
          amountOutMin.push(globalWeb3.utils.toWei(amount[0]))
          targetaddress.push(fundData.tokenNames[key].address)
        })
        .catch(err => console.log(err))
      }
    })
    setMinimumAmountOut(amountOutMin)
    setDestaddress(targetaddress)
    setUNIminAmount(EstAmt)
  }


  const getETHToTrade = (tokenName, subsAmount) => {

    let ratioTrade = subsAmount * tokenName.targetweight / 10000 
    return Math.floor(ratioTrade * PRECISION) 
  }

  const handleClickClearAmt = () => event => {
    event.preventDefault();
    setsubsAmt(0)
  };


  const handleAmtChange = () => event => {
    
    event.preventDefault()
    if(event.target.value < 0.000000000001) return

    const subsAmount = parseFloat(event.target.value)
    if(subsAmount > -0.000000001 && subsAmount !== undefined){
      setsubsAmt(subsAmount)
      if(networkName.toLowerCase() === "bsctest"){
        GetEstOutputBSC(subsAmount)
      }else{
        GetEstOutput(subsAmount)
      }
    }
  }
  
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Circular ref={refCircular} />
      <Snackbar open={openMsg} autoHideDuration={10000} onClose={hideMessage}>
          <Alert onClose={hideMessage} severity={msgStatus}>
          <a href={xWinLib.getEtherLink(fundData.networkName, responseMsg, "tx")} target="blank">{responseMsg}</a>
          </Alert>
      </Snackbar>
      <Dialog 
          open={openAdd} 
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          fullScreen={false}
          maxWidth = {'md'}
          >
            <CardHeader
              className={classes.CardTitle}
              action={
                <IconButton 
                  className={classes.title}
                  onClick={handleCloseAdd}
                  aria-label="settings">
                  <CancelIcon />
                </IconButton>
              }
              title={"Subscribe to " + port.name}
            />
          <DialogContent>
              {getProgress()}
                <Table size="small">                  
                  <TableRow className={classes.tableRow}>
                   <TableCell>
                      Wallet Balance:
                    </TableCell>
                    <TableCell>
                     {format({prefix: " ", suffix: ''})(xWinLib.roundTo(userData?.walletETHBalance,5))}
                    </TableCell>
                    <TableCell>
                        <ButtonGroup size="small" color="primary" aria-label="">
                        <Button
                          fullWidth
                          size="medium"
                          color="primary"
                          variant="outlined"
                          onClick={handleClickAmt(1)}
                        >
                          {'Max'}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickAmt(0.25)}
                        >
                          {'25%'}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickAmt(0.50)}
                        >
                          {'50%'}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickAmt(0.75)}
                        >
                          {'75%'}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickAmt(0.99)}
                        >
                          {'100%'}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickClearAmt()}
                        >
                          {'Clear'}
                        </Button>
                        </ButtonGroup>
                      </TableCell>
                   </TableRow> 
                   <TableRow className={classes.tableRow}>
                    <TableCell>
                      Subscribe Amount:
                      </TableCell>
                      <TableCell>
                        <TextField
                            type="number" 
                            className={classes.inputText}
                            label={'Amount'}
                            margin="dense"
                            name="weight"
                            onChange={handleAmtChange()}
                            required
                            variant="outlined"
                            value={subsAmt}
                          />
                      </TableCell>
                   </TableRow> 
                  
                  </Table>
          </DialogContent>
          <DialogContent>
          </DialogContent>
          <DialogActions>
              
            <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
              <Button 
                onClick={handleClickSubs} 
                color="secondary"
                variant="contained"
                startIcon={<AddCircleIcon />}>
              {'Invest'}
              </Button>
            </ButtonGroup>
            
          </DialogActions>
        </Dialog>
    </Card>
  );
});

SubscribeDirect.propTypes = {
  className: PropTypes.string
};

export default SubscribeDirect;
