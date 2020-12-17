import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import xWinLib from 'xWinLib'
import format from 'format-number';
import Circular from '../Circular/Circular'
import { ChainId, Token, WETH, Fetcher, Route, Percent, TradeType, TokenAmount, Trade } from '@uniswap/sdk'
import { Alert } from '@material-ui/lab';

import {
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  LinearProgress,
  Table,
  ButtonGroup,
  CardHeader,
  IconButton,
  TextField,
  Box,
  InputAdornment,
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

const DirectSwap = forwardRef((props, ref) => {
  const { className, fundData, tokensMaster, userData, myxWinProtocol, port, globalWeb3, ...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation()
  const refCircular = useRef(null);
  
  const [loading, setLoading] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [UNIminAmount, setUNIminAmount] = React.useState([]);
  const [slippageAmt, setSlippageAmt] = React.useState(1);
  const [subsAmt, setsubsAmt] = useState(0);
  const [minimumAmountOut, setMinimumAmountOut] = React.useState([]);
  const [destaddress, setDestaddress] = React.useState([]);
  const SRC_DECIMALS = 18;
  const platformSwapFee = 0.002;
  
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

  const handleClickDirectSwap = event => {
    event.preventDefault();
    
    if(minimumAmountOut.length === 0) return
    
    setLoading(true)
    const subsAmtInWei = globalWeb3.utils.toWei(subsAmt.toString())
    
    xWinLib.DirectSwapAsync(
      myxWinProtocol, 
      port.contractaddress, 
      userData.selectedAccount, 
      minimumAmountOut, 
      destaddress, 
      subsAmtInWei
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
      setResponseMsg(err)
      setMsgStatus("error")
      showMessage()
      }
    )
  
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

  const getEstAsync = (toToken, subAmount) =>{
    return new Promise(function(resolve, reject) {
      
      const chainID = xWinLib.GetChainID(fundData.networkName) 
      const weth = WETH[chainID]
      
      const finalSubsAmt = subAmount * (1 - platformSwapFee)
      const slippageTolerance = new Percent(slippageAmt * 100, '10000')
      const SRC_QTY_WEI = getETHToTrade(toToken, finalSubsAmt)
      const tokenDest = new Token(chainID, toToken.address, 18)
      
      let amountOut = 0
      const pair = Fetcher.fetchPairData(tokenDest, weth)
      .then(pair => {
        const route = new Route([pair], weth)
        const trade = new Trade(route, new TokenAmount(weth, SRC_QTY_WEI), TradeType.EXACT_INPUT)
        //let mprice = route.midPrice.toSignificant(18)
        amountOut = trade.minimumAmountOut(slippageTolerance).toSignificant(18)
        const priceimpact = trade.priceImpact.toSignificant(6)
        resolve([amountOut, priceimpact])
      })
      .catch(err => {
        console.log('error: %j', err)
        reject([0, 0])
      })
  
    })
  }

const handleClickGetEst = () => event => {
    event.preventDefault();
    console.log(subsAmt)
    GetEstOutput(subsAmt)
}

  const getUniAmountOut = (tokenaddress) => {
    
    let found = UNIminAmount.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.amountOut 
  }

  const getPriceImpact = (tokenaddress) => {
    
    let found = UNIminAmount.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.priceimpact 
  }
 
  const getETHToTrade = (tokenName, subsAmount) => {

    let ratioTrade = subsAmount * tokenName.targetweight / 10000 
    return Math.floor(ratioTrade * PRECISION) 
  }

  const getTargets = (targets) => {

    if(targets === undefined ) return ""
    return (
      <Table size="small">
        <TableHead>
        <TableRow>
              <TableCell>
                Token
              </TableCell>
              <TableCell>
                Amount
              </TableCell>
              <TableCell>
                Minimum received
              </TableCell>
              <TableCell>
                Price Impact
              </TableCell>
            </TableRow>
        </TableHead>
        {
          Object.keys(targets).map((key, i) => (
            <TableRow hover>
              <TableCell className={classes.secondaryHeading}>
                {/* {targets[key].name} */}
                {xWinLib.getTokenName(tokensMaster, targets[key].address)}
                
              </TableCell >
              <TableCell align={"right"} className={classes.secondaryHeading}>
              <Box bgcolor="info.main" color="info.contrastText" p={1}>
              {
                format({prefix: '', suffix: ''})(xWinLib.roundTo(getETHToTrade(targets[key], subsAmt) / PRECISION,5))
                }
              </Box> 
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              <Box bgcolor="info.main" color="info.contrastText" p={1}>
              {
                format({prefix: '', suffix: ''})(xWinLib.roundTo(getUniAmountOut(targets[key].address), 5))
                }
              </Box> 
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              <Typography className={classes.negativeNum}>
                {format({prefix: '', suffix: '%'})(xWinLib.roundTo(getPriceImpact(targets[key].address),2))}
              </Typography>
              </TableCell>
            </TableRow>
          ))
        }
      </Table>
    )
  }


  const handleSlippageChange = () => event => {
    
    if(event.target.value < 0) return
    setSlippageAmt(event.target.value)
  }

  const handleAmtChange = () => event => {
    
    event.preventDefault()
    if(event.target.value < 0.00000001) return
    const subsAmount = parseFloat(event.target.value)
    if(subsAmount > 0 && subsAmount != undefined){
      setsubsAmt(subsAmount)
      GetEstOutput(subsAmount)
    }

  }
  
  const handleClickAmt = (ratio) => event => {
    event.preventDefault();
    const subAmount = ratio * userData.walletETHBalance
    setsubsAmt(subAmount)
    GetEstOutput(subAmount)
  };

  const GetEstOutput = (subAmount) => {
  
    let EstAmt = []
    let amountOutMin = []
    let targetaddress = []
    
    Object.keys(fundData.tokenNames).forEach(function (key) {
    
      if(fundData.tokenNames[key].address != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"){
        getEstAsync(fundData.tokenNames[key], subAmount)
        .then(amount => 
          {
          EstAmt.push({
            "address": fundData.tokenNames[key].address,
            "amountOut": amount[0],
            "priceimpact": amount[1],
          })
          //amountOutMin.push(xWinLib.ToBigNumber((amount[0] * 10 ** SRC_DECIMALS).toString()))
          amountOutMin.push(globalWeb3.utils.toWei(amount[0]))
          targetaddress.push(fundData.tokenNames[key].address)
        })
        .catch(err => console.log('error'))
      }
    })
    
    setMinimumAmountOut(amountOutMin)
    setDestaddress(targetaddress)
    setUNIminAmount(EstAmt)
    
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
          //onClose={handleCloseAdd} 
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          fullScreen={false}
          maxWidth = {'sm'}
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
              title={"Just Swap with Target in " + port.name}
              //titleTypographyProps={{variant:'h4' }}
            />

          <DialogContent>
                  {getProgress()}
                  <Table size="small">
                    <TableRow className={classes.tableRow}>
                      <TableCell>
                        Balance of ETH: 
                      </TableCell>
                      <TableCell>
                        {format({prefix: '', suffix: ''})(xWinLib.roundTo(userData.walletETHBalance ,8))}
                      </TableCell>
                      <TableCell>
                        <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
                        <Button
                          fullWidth
                          size="medium"
                          color="primary"
                          variant="outlined"
                          onClick={handleClickAmt(0.98)}
                        >
                          {t('Max')}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickAmt(0.50)}
                        >
                          {t('50%')}
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
                            label={t('Amount')}
                            margin="dense"
                            name="weight"
                            onChange={handleAmtChange()}
                            required
                            variant="outlined"
                            value={subsAmt}
                          />
                      </TableCell>
                   </TableRow> 
                    <TableRow className={classes.tableRow}>
                      <TableCell>
                        Slippage Tolerange:
                      </TableCell>
                      <TableCell>
                          <TextField
                            type="number" 
                            className={classes.inputText}
                            label={t('Slippage')}
                            margin="dense"
                            name="slippage"
                            onChange={handleSlippageChange()}
                            required
                            variant="outlined"
                            value={slippageAmt}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                          />
                      </TableCell>
                    </TableRow> 
                  </Table>
                  {getTargets(fundData.tokenNames)}
          </DialogContent>
          <DialogActions
          >
              
            <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
              <Button 
                  onClick={handleClickGetEst} 
                  color="primary"
                  variant="contained"
                  startIcon={<AddCircleIcon />}>
                {t('Get Estimate')}
                </Button>
              <Button 
                onClick={handleClickDirectSwap} 
                color="secondary"
                variant="contained"
                startIcon={<AddCircleIcon />}>
              {t('Swap!')}
              </Button>
            </ButtonGroup>
            
          </DialogActions>
        </Dialog>

      
      
    </Card>
  );
});

DirectSwap.propTypes = {
  className: PropTypes.string
};

export default DirectSwap;
