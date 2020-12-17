import React, { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import xWinLib from 'xWinLib'
import format from 'format-number';
import Circular from '../Circular/Circular'
//import { Token, Fetcher, WETH, Route, Percent, TradeType, TokenAmount, Trade } from '@bscswap/sdk'
import { Token, Fetcher, WETH, Route, Percent, TradeType, TokenAmount, Trade } from '@uniswap/sdk'
import { Alert } from '@material-ui/lab';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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
    backcolor: theme.palette.success.main,
    color: theme.palette.success.main,
  },
  
}));

const RebalanceV5 = forwardRef((props, ref) => {
  const { className, fundData, tokensMaster, userData, myxWinProtocol, selectedport, globalWeb3, networkName, ...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation()
  const refCircular = useRef(null);
  
  const [loading, setLoading] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [UNIminAmount, setUNIminAmount] = React.useState([]);
  const [UNIminAmountUw, setUNIminAmountUw] = React.useState([]);
  const [slippageAmt, setSlippageAmt] = React.useState(1);
  
  const [openMsg, setOpenMsg] = React.useState(false);
  const [msgStatus, setMsgStatus] = React.useState("success");
  const [responseMsg, setResponseMsg] = React.useState("");
  
  let owNames = []
  let uwNames = []
  
  if(fundData !== undefined && fundData.tokenNames !== undefined){
    fundData.tokenNames.forEach(token => {
    
      let tkName = xWinLib.getTokenName(tokensMaster, token.address)
      if(tkName !== "ETH" && tkName !== "BNB"){
        const val = xWinLib.getTokenActiveWeight(token, fundData.fundvalue)
        if(val < 0){
          owNames.push(token)
        }else{
          uwNames.push(token)
        }
      }  
    })
  }
  

  const showMessage = () => {
    setOpenMsg(true);
  };

  const hideMessage = () => {
    setOpenMsg(false);
  };

  const SRC_DECIMALS = 18;
  
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

  const getTotalEstOut = (estAmtarray) => {
    let total = 0
    
    UNIminAmount.forEach(est => {
      console.log(est)
    total = total + parseFloat(est.amountOut)
    })
    return total;
  }

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

  const getEstETHToTokenAsync = (toToken, rebQty) =>{
    return new Promise(function(resolve, reject) {
      
      console.log(toToken)
      const chainID = xWinLib.GetChainID(fundData.networkName) // ChainId.KOVAN
      const weth = WETH[chainID]
      const slippageTolerance = new Percent(slippageAmt * 100, '10000')
      const SRC_QTY_WEI = Math.floor(rebQty * PRECISION)
      const tokenDest = new Token(chainID, toToken.address, 18)
      console.log(SRC_QTY_WEI)
      let amountOut = 0
      const pair = Fetcher.fetchPairData(tokenDest, weth)
      .then(pair => {
        const route = new Route([pair], weth)
        const trade = new Trade(route, new TokenAmount(weth, SRC_QTY_WEI), TradeType.EXACT_INPUT)
        amountOut = trade.minimumAmountOut(slippageTolerance).toSignificant(18)
        const priceimpact = trade.priceImpact.toSignificant(6)
        console.log(amountOut)
        resolve([amountOut, priceimpact])
      })
      .catch(err => {
        console.log('error: %j', err)
        reject([0, 0])
      })
  
    })
  }

  const getEstTokenToETHAsync = (toToken, rebQty) =>{
    return new Promise(function(resolve, reject) {
      
      console.log(fundData.networkName)
      const chainID = xWinLib.GetChainID(fundData.networkName) 
      const weth = WETH[chainID]
      
      console.log(toToken)
      console.log(rebQty)

      const slippageTolerance = new Percent(slippageAmt * 100, '10000')
      const SRC_QTY_WEI = Math.floor(rebQty * PRECISION)

      const tokenDest = new Token(chainID, toToken.address, 18)
      let amountOut = 0
      let priceimpact = 0
      const pair = Fetcher.fetchPairData(weth, tokenDest )
      .then(pair => {
        const route = new Route([pair], tokenDest, weth)
        console.log(route)
        console.log(pair)
        const trade = new Trade(route, new TokenAmount(tokenDest, SRC_QTY_WEI), TradeType.EXACT_INPUT)
        
        amountOut = trade.minimumAmountOut(slippageTolerance).toSignificant(18)
        console.log(amountOut)
        //console.log(trade.outputAmount.currency)
        //const priceMid = SRC_QTY_WEI / PRECISION * mprice
        priceimpact = trade.priceImpact.toSignificant(6)
        resolve([amountOut, priceimpact])
      })
      .catch(err => {
        console.log('error: %j', err)
        reject([0, 0])
      })
  
    })
  }

  

const getIcons = (symbol) => {
  
  return <img alt={symbol.toLowerCase()} src={"/images/icons/color/"+ symbol.toLowerCase() +".png"} />
    // let iconname = "crypto crypto-" + symbol.toLowerCase()
  // return <i className={iconname} ></i>
}

const getActWgt = (target) => {

  const val = xWinLib.getTokenActiveWeight(target, fundData.fundvalue)
  if(val < 0){
      return (
          <Typography className={classes.negativeNum}>
            {format({prefix: '', suffix: '%'})(xWinLib.roundTo(val,2))}
          </Typography>
          )
  }else{
    return (
      <Typography className={classes.secondaryHeading}>
        {format({prefix: '', suffix: '%'})(xWinLib.roundTo(val,2))}
      </Typography>
      )
  }
  
}

  const getUniAmountOut = (tokenaddress) => {
    
    let found = UNIminAmount.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.amountOut 
  }

  const getUniAmountOutUw = (tokenaddress) => {
    
    let found = UNIminAmountUw.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.amountOut 
  }

  const getPriceImpactUw = (tokenaddress) => {
    
    let found = UNIminAmountUw.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.priceimpact 
  }

  const getPriceImpact = (tokenaddress) => {
    
    let found = UNIminAmount.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.priceimpact 
  }
 
  const getOverWeightTargets = (targets) => {

    if(targets === undefined ) return ""
    return (
      <div>
       <Typography variant="h5" className={classes.negativeNum}>Overweight Names (To Sell)  </Typography>
      
      <Table size="small">
        <TableHead>
        <TableRow>
              <TableCell className={classes.cellHideSmall}>
                
              </TableCell>
              <TableCell>
                Token
              </TableCell>
              <TableCell>
                Target %
              </TableCell>
              <TableCell>
                Fund %
              </TableCell>
              <TableCell>
                Active %
              </TableCell>
              <TableCell>
                Quantity
              </TableCell>
              <TableCell>
                Reb Qty
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
          Object.keys(owNames).map((key, i) => (
            <TableRow hover>
              <TableCell className={classes.cellHideSmall}>
                <Typography variant="h3">
                {getIcons(xWinLib.getTokenName(tokensMaster, owNames[key].address))}
                </Typography>
              </TableCell>
              <TableCell className={classes.secondaryHeading}>
                {xWinLib.getTokenName(tokensMaster, owNames[key].address)}
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(owNames[key].targetweight / 100,2))
                }
              </TableCell>
              <TableCell align={"right"} className={classes.cellHideSmall}>
              {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(xWinLib.getTokenWeight(owNames[key], fundData.fundvalue),2))
              }
              </TableCell>
              <TableCell align={"right"} className={classes.cellHideSmall}>
              {
                getActWgt(owNames[key])
              }
              </TableCell>
              <TableCell align="right" className={classes.secondaryHeading}>
              {format({prefix: '', suffix: ''})(xWinLib.roundTo(owNames[key].balance,2))}
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              <Box bgcolor="info.main" color="info.contrastText" p={1}>
              {
                format({prefix: '', suffix: ''})(xWinLib.roundTo(getRebQuantity(owNames[key].address), 5))
                }
              </Box>
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
                <Box bgcolor="info.main" color="info.contrastText" p={1}>
                  {
                  format({prefix: '', suffix: ''})(xWinLib.roundTo(getUniAmountOut(owNames[key].address), 5))
                  }
                </Box>
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              <Typography className={classes.negativeNum}>
                {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(getPriceImpact(owNames[key].address),2))
                }
              </Typography>
              </TableCell>
            </TableRow>
          ))
        }
        <TableRow>
        <TableCell align={"center"} colSpan={9}>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="outlined"
            color="primary"
          >
            <ArrowDownwardIcon
                    //className={classes.status}
                    //color={statusColors[true]}
                    size="md"
                  />
          </Button>
          </TableCell>
        </TableRow>
      </Table>
      </div>
      
    )
  }

  const getUnderWeightTargets = (targets) => {

    if(targets === undefined ) return ""
    return (
      <div>
      <Typography variant="h5" className={classes.secondaryHeading}>Underweight Names (To Buy) </Typography>
       
      <Table size="small">
        <TableHead>
        <TableRow>
              <TableCell className={classes.cellHideSmall}>
                
              </TableCell>
              <TableCell>
                Token
              </TableCell>
              <TableCell>
                Target %
              </TableCell>
              <TableCell>
                Fund %
              </TableCell>
              <TableCell>
                Active %
              </TableCell>
              <TableCell>
                Quantity
              </TableCell>
              <TableCell>
                Reb Qty
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
          Object.keys(uwNames).map((key, i) => (
            <TableRow hover>
              <TableCell className={classes.cellHideSmall}>
                <Typography variant="h3">
                {/* {getIcons(targets[key].name)} */}
                {getIcons(xWinLib.getTokenName(tokensMaster, uwNames[key].address))}
                </Typography>
              </TableCell>
              <TableCell className={classes.secondaryHeading}>
              {/* {targets[key].name} */}
                {xWinLib.getTokenName(tokensMaster, uwNames[key].address)}
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(uwNames[key].targetweight / 100,2))
                }
              </TableCell>
              <TableCell align={"right"} className={classes.cellHideSmall}>
              {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(xWinLib.getTokenWeight(uwNames[key], fundData.fundvalue),2))
              }
              </TableCell>
              <TableCell align={"right"} className={classes.cellHideSmall}>
              {
                getActWgt(uwNames[key])
              }
              </TableCell>
              <TableCell align="right" className={classes.secondaryHeading}>
              {format({prefix: '', suffix: ''})(xWinLib.roundTo(uwNames[key].balance,2))}
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              <Box bgcolor="info.main" color="info.contrastText" p={1}>
              {
                format({prefix: '', suffix: ''})(xWinLib.roundTo(getRebQuantityUn(uwNames[key].address), 5))
                }
              </Box>
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
                <Box bgcolor="info.main" color="info.contrastText" p={1}>
                  {
                  format({prefix: '', suffix: ''})(xWinLib.roundTo(getUniAmountOutUw(uwNames[key].address), 5))
                  }
                </Box>
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              <Typography className={classes.negativeNum}>
                {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(getPriceImpactUw(uwNames[key].address),2))
                }
              </Typography>
              </TableCell>
            </TableRow>
          ))
        }
      </Table>
      </div>
      
    )
  }
  
  const handleSlippageChange = () => event => {
    if(event.target.value < 0) return
    setSlippageAmt(event.target.value)
  }

  const handleClickAmt = (ratio)  => async event => {
    event.preventDefault();

    GetEstOutputOWNames(ratio)
    .then(function(estAmt)
      {
        GetEstOutputUWNames(estAmt)
      }
    )
    .catch(err => console.log('error'))

  };

  const GetEstOutputOWNames = async (ratio) => {
  
    return new Promise(function(resolve, reject) {
      let EstAmt = []
      owNames.forEach(async t => {
        if(t.address !== xWinLib.GetETH_ADDRESS()){
          const activeWgt = xWinLib.getTokenActiveWeight(t, fundData.fundvalue)
          //console.log(activeWgt)
          let rebQty =  Math.abs(activeWgt/100 * fundData.fundvalue / t.price) * ratio
          console.log(rebQty)
          console.log(fundData.fundvalue)
          console.log(t.price)
          getEstTokenToETHAsync(t, rebQty)
          .then(amount => 
            {
              EstAmt.push({
                "address": t.address,
                "amountOut": amount[0],
                "priceimpact": amount[1],
                "symbol" : t.symbol,
                "rebqty" : rebQty,
                "rebqtyInWei" : xWinLib.ToBigNumber((rebQty * 10 ** SRC_DECIMALS).toString()),
                "amountOutInWei": xWinLib.ToBigNumber((amount[0] * 10 ** SRC_DECIMALS).toString())
                //"rebqtyInWei" : globalWeb3.utils.toWei(rebQty), // xWinLib.ToBigNumber((rebQty * 10 ** SRC_DECIMALS).toString()),
                //"amountOutInWei": globalWeb3.utils.toWei(amount[0]) // xWinLib.ToBigNumber((amount[0] * 10 ** SRC_DECIMALS).toString())
              })
            } 
          )
          .catch(err => console.log('error'))
        }
      });
      setUNIminAmount(EstAmt)
      resolve(EstAmt)
    })
  }

  const underWeightLocalTotalWgt = () => {

    let total = 0
    uwNames.forEach(t => {
      total += parseFloat(t.targetweight)
    });
    return total
  }

  const GetEstOutputUWNames = async () => {
  
    let EstAmt = []
    let localTotalWgt = underWeightLocalTotalWgt()
    console.log(localTotalWgt)
    uwNames.forEach(t => {
      
      if(t.address !== xWinLib.GetETH_ADDRESS()){
        const activeWgt = t.targetweight / localTotalWgt
        console.log(activeWgt)
        let rebQty =  Math.abs(activeWgt * getTotalEstOut())
        console.log(getTotalEstOut())
        //let rebQty =  Math.abs(activeWgt * estAmt)
        console.log(rebQty)
        if(rebQty > 0){
          getEstETHToTokenAsync(t, rebQty)
          .then(amount => 
            {
              EstAmt.push({
                "address": t.address,
                "amountOut": amount[0],
                "priceimpact": amount[1],
                "symbol" : t.symbol,
                "rebqty" : rebQty,
                "rebqtyInWei" : xWinLib.ToBigNumber((rebQty * 10 ** SRC_DECIMALS).toString()),
                "amountOutInWei": xWinLib.ToBigNumber((amount[0] * 10 ** SRC_DECIMALS).toString())
                // "rebqtyInWei" : globalWeb3.utils.toWei(rebQty),
                // "amountOutInWei": globalWeb3.utils.toWei(amount[0])
              })
            } 
          )
          .catch(err => console.log('error'))
        }
      }
    });
    setUNIminAmountUw(EstAmt)
  }

  const getRebQuantityUn = (tokenaddress) => {
    
    let found = UNIminAmountUw.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.rebqty 
  }

  const getRebQuantity = (tokenaddress) => {
    
    let found = UNIminAmount.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.rebqty 
  }

  const handleClickReb = async event => {
    event.preventDefault();
    
    //if(minimumAmountOutOw.length === 0) return

    setLoading(true)
    xWinLib.RebalanceV5Async(
      myxWinProtocol, 
      selectedport.contractaddress, 
      userData.selectedAccount, 
      UNIminAmount,
      UNIminAmountUw,
      owNames,
      uwNames
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
          maxWidth = {'lg'}
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
              title={"Rebalance To New Target"}
              //titleTypographyProps={{variant:'h4' }}
            />

          <DialogContent>
                  {getProgress()}
                  <Table size="small">
                    <TableRow className={classes.tableRow}>
                      <TableCell>
                        How much to move the local to {xWinLib.getBaseCcy(networkName)} base this round? 
                      </TableCell>
                      <TableCell colSpan={2}>
                        <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
                        <Button
                          fullWidth
                          size="medium"
                          color="primary"
                          variant="outlined"
                          onClick={handleClickAmt(1)}
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
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickAmt(0.25)}
                        >
                          {t('25%')}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickAmt(0)}
                        >
                          {t('Clear')}
                        </Button>
                        </ButtonGroup>
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
                  {getOverWeightTargets(fundData.tokenNames)}
                  
                  {getUnderWeightTargets(fundData.tokenNames)}
                  {/* {getSetTarget()} */}

          </DialogContent>
          <DialogActions
          >
            <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
              <Button 
                onClick={handleClickReb} 
                color="secondary"
                variant="contained"
                startIcon={<AddCircleIcon />}>
              {t('Rebalance!')}
              </Button>
            </ButtonGroup>
            
          </DialogActions>
        </Dialog>

      
      
    </Card>
  );
});

RebalanceV5.propTypes = {
  className: PropTypes.string
};

export default RebalanceV5;
