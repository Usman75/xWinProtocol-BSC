import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next'
import CancelIcon from '@material-ui/icons/Cancel';
import '@icon/cryptocurrency-icons/cryptocurrency-icons.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import xWinLib from 'xWinLib'
import format from 'format-number';
import Circular from '../Circular/Circular'
import xWinFundV4 from '../abi/xWinFundV4.json'
//import xWinFundV5 from '../abi/xWinFundV5.json'
import { Token, WETH, Fetcher, Route, Percent, TradeType, TokenAmount, Trade } from '@uniswap/sdk'
import { Alert } from '@material-ui/lab';

import {
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableRow,
  TableCell,
  Table,
  TextField,
  LinearProgress,
  Switch,
  ButtonGroup,
  CardHeader,
  IconButton,
  Tooltip,
  TableHead,
  Typography,
  Box,
  InputAdornment,
  Snackbar
} from '@material-ui/core';

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

const Redeem = forwardRef((props, ref) => {
  const { className, fundData, tokensMaster, userData, myxWinProtocol, port, gasPrices, globalWeb3, networkName, ...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation()
  const refCircular = useRef(null);
  
  const [loading, setLoading] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [subsAmt, setsubsAmt] = useState(0);
  const [withdrawInETH, setWithdrawInETH] = useState(false);
  const MAX_ALLOWANCE = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  const [UNIminAmount, setUNIminAmount] = React.useState([]);
  const [rebalancePos, setRebalancePos] = useState([])
  const PRECISION = 10 ** 18
  //const SRC_DECIMALS = 18;
  const [minimumAmountOut, setMinimumAmountOut] = React.useState([]);
  const [destaddress, setDestaddress] = React.useState([]);
  const [slippageAmt, setSlippageAmt] = React.useState(1);
  
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
  const [isApproval, setIsApproval] = useState(false);
  
  const handleCloseAdd = () => {
    setLoading(false)
    setOpenAdd(false);
  }

  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen
    };
  });

  const handleSwitchActive = name => event => {
    setWithdrawInETH(event.target.checked)
  };

  const getRebQuantity = (tokenaddress) => {
    
    let found = rebalancePos.find(x=>x.address === tokenaddress)
    if(!found) return 0
    return found.rebqty 
  }

  const getIcons = (symbol) => {
    
    return <img alt={symbol.toLowerCase()} src={"/images/icons/color/"+ symbol.toLowerCase() +".png"} />
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
  

  const handleClickApprove = async event => {
    event.preventDefault();
    
    setLoading(true)
    
    const sourceToken = new globalWeb3.eth.Contract(xWinFundV4, port.contractaddress);
    
    xWinLib.approveContract(sourceToken, MAX_ALLOWANCE, myxWinProtocol._address, userData.selectedAccount)
    .then(res => 
      setLoading(false),
      setIsApproval(true)
    )
    .catch(err => {
      setLoading(false)
      setIsApproval(false)
      console.log(err)
    })
    
  };

  const handleClickRedeem = async event => {
    event.preventDefault();
    
    if(networkName.toLowerCase() !== "bsctest"){
      if(minimumAmountOut.length === 0) return
    }

    setLoading(true)
    
    const subsAmtInWei = globalWeb3.utils.toWei(subsAmt.toString())
    
    xWinLib.RedeemAsync(
        myxWinProtocol, 
        port.contractaddress, 
        userData.selectedAccount, 
        subsAmtInWei, 
        withdrawInETH,  
        destaddress, 
        minimumAmountOut,
        port.version
      )
    .then(res => {
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
    })

  };

  const handleClickAmt = (ratio) => async event => {
    event.preventDefault();
    
    const redeemAmt = xWinLib.roundTo(ratio * userData.userfundbal, 5)
    setsubsAmt(redeemAmt)
    const isApp = await isTokenApproved(redeemAmt)
    setIsApproval(isApp)

    if(networkName.toLowerCase() === "bsctest"){
      GetEstOutputBSC(redeemAmt)
    }else{
      GetEstOutput(redeemAmt)
    }

  }

  const GetEstOutputBSC = (redeemAmt) => {
  
    let rebPos = []
    let EstAmt = []
    let amountOutMin = []
    let targetaddress = []
    let platformfee = 50/100
    fundData.tokenNames.forEach(t => {
      
      if(t.address !== xWinLib.GetBNB_ADDRESS()){
        let redeemAmtFinal = redeemAmt * (1 - (fundData.managerFee + platformfee) / 100) 
        console.log(redeemAmtFinal)
        const rebQty = redeemAmtFinal / fundData.totalSupply * t.balance  
        getEstTokenToBNBAsync(t, rebQty)
        .then(amount => 
        {
          console.log(amount)
          EstAmt.push({
            "address": t.address,
            "amountOut": amount[0],
            "priceimpact": amount[1]
          })
          //console.log(xWinLib.ToBigNumber((amount[0] * 10 ** SRC_DECIMALS).toString()))
          //amountOutMin.push(xWinLib.ToBigNumber((amount[0] * 10 ** SRC_DECIMALS).toString()))
          targetaddress.push(t.address)
          console.log(targetaddress)
          amountOutMin.push(globalWeb3.utils.toWei(amount[0].toString()))
        })
        .catch(err => console.log('error'))
        rebPos.push({
          symbol : t.symbol,
          address : t.address,
          rebqty : rebQty
        })
      }
    });
    
    setMinimumAmountOut(amountOutMin)
    setUNIminAmount(EstAmt)
    setDestaddress(targetaddress)
    setRebalancePos(rebPos)
    
  }

  const GetEstOutput = (redeemAmt) => {
  
    let rebPos = []
    let EstAmt = []
    let amountOutMin = []
    let targetaddress = []
    let platformfee = 50/100
    fundData.tokenNames.forEach(t => {
      
      if(t.address !== xWinLib.GetETH_ADDRESS()){
        let redeemAmtFinal = redeemAmt * (1 - (fundData.managerFee + platformfee) / 100) 
        
        console.log(redeemAmtFinal)

        const rebQty = redeemAmtFinal / fundData.totalSupply * t.balance  
        getEstTokenToETHAsync(t, rebQty)
        .then(amount => 
          {
          EstAmt.push({
            "address": t.address,
            "amountOut": amount[0],
            "priceimpact": amount[1]
          })
          //console.log(xWinLib.ToBigNumber((amount[0] * 10 ** SRC_DECIMALS).toString()))
          //amountOutMin.push(xWinLib.ToBigNumber((amount[0] * 10 ** SRC_DECIMALS).toString()))
          amountOutMin.push(globalWeb3.utils.toWei(amount[0]))
          targetaddress.push(t.address)
          } 
        )
        .catch(err => console.log('error'))


        rebPos.push({
          symbol : t.symbol,
          address : t.address,
          rebqty : rebQty
        })
      }
    });
    setMinimumAmountOut(amountOutMin)
    setUNIminAmount(EstAmt)
    setDestaddress(targetaddress)
    setRebalancePos(rebPos)
    
  }

  const getEstTokenToETHAsync = (toToken, rebQty) =>{
    return new Promise(function(resolve, reject) {
      
      const chainID = xWinLib.GetChainID(fundData.networkName) 
      const weth = WETH[chainID]
      
      const slippageTolerance = new Percent(slippageAmt * 100, '10000')
      const SRC_QTY_WEI = rebQty * PRECISION

      const tokenDest = new Token(chainID, toToken.address, 18)
      let amountOut = 0
      let priceimpact = 0
      const pair = Fetcher.fetchPairData(weth, tokenDest )
      .then(pair => {
        const route = new Route([pair], tokenDest, weth)
        const trade = new Trade(route, new TokenAmount(tokenDest, SRC_QTY_WEI), TradeType.EXACT_INPUT)
        //let mprice = route.midPrice.toSignificant(18)
        amountOut = trade.minimumAmountOut(slippageTolerance).toSignificant(18)
        console.log(amountOut)
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

  const getEstTokenToBNBAsync = (toToken, rebQty) =>{
    return new Promise(function(resolve, reject) {
      resolve([0, 0])
    })
  }

  const handleClickClearAmt = () => event => {
    event.preventDefault();
    
    setsubsAmt(0)
    GetEstOutput(0)

  };
  const isTokenApproved = async (subsAmount) => {
    
    if(subsAmount === undefined) return false;
    console.log(myxWinProtocol)
    if(myxWinProtocol === undefined) return false;
    const subsAmtInWei = globalWeb3.utils.toWei(subsAmount.toString())
    const sourceToken = new globalWeb3.eth.Contract(xWinFundV4, port.contractaddress);
    let contractAllowance = await sourceToken.methods
    .allowance(userData.selectedAccount, myxWinProtocol._address)
    .call();
    
    return parseFloat(contractAllowance) > parseFloat(subsAmtInWei)  
  }

  const handleSlippageChange = () => event => {
    if(event.target.value < 0) return
    setSlippageAmt(event.target.value)
  }


  const getSlippageDisplay = () => {

    if(withdrawInETH){

      return <TableRow className={classes.tableRow}>
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
    }
    return ""
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
  
  const handleAmtChange = () => async event => {
    
    if(event.target.value === "") return

    const val = parseFloat(event.target.value)

    if(xWinLib.roundTo(val, 5) > userData.userfundbal) return 

    setsubsAmt(val)
    console.log(myxWinProtocol)
    const isApp = await isTokenApproved(val)
    setIsApproval(isApp)
    
    GetEstOutput(val)

  }

  const getReturnETHHeader = () => {

    if(withdrawInETH){
      return (
        <div>
          <TableCell>
            Minimum received
          </TableCell>
          {/* <TableCell>
            Price Impact
          </TableCell> */}
        
        </div>
      )
    }

    return ""
    
  }

  const getReturnETHContent = (address) => {

    if(withdrawInETH){
      return (
        <div>
          <TableCell align={"right"} className={classes.secondaryHeading}>
            <Box bgcolor="info.main" color="info.contrastText" p={1}>
              {
              format({prefix: '', suffix: ''})(xWinLib.roundTo(getUniAmountOut(address), 5))
              }
            </Box>
          </TableCell>
        </div>
        // <div>
        //   <TableCell align={"right"} className={classes.secondaryHeading}>
        //   <Typography className={classes.negativeNum}>
        //     {
        //     format({prefix: '', suffix: '%'})(xWinLib.roundTo(getPriceImpact(address),2))
        //     }
        //   </Typography>
        //   </TableCell>
        // </div>
      )
    }

    return ""
    
  }
  const getTargets = (targets) => {

    if(networkName.toLowerCase() === "bsctest") return ""
    
    if(targets === undefined ) return ""
    return (
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
                Receive Qty
              </TableCell>
              {getReturnETHHeader()}
            </TableRow>
        </TableHead>
        {
          Object.keys(targets).map((key, i) => (
            <TableRow hover>
              <TableCell className={classes.cellHideSmall}>
                <Typography variant="h3">
                {/* {getIcons(targets[key].name)} */}
                {getIcons(xWinLib.getTokenName(tokensMaster, targets[key].address))}
                </Typography>
              </TableCell>
              <TableCell className={classes.secondaryHeading}>
              {/* {targets[key].name} */}
                {xWinLib.getTokenName(tokensMaster, targets[key].address)}
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(targets[key].targetweight / 100,2))
                }
              </TableCell>
              <TableCell align={"right"} className={classes.cellHideSmall}>
              {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(xWinLib.getTokenWeight(targets[key], fundData.fundvalue),2))
              }
              </TableCell>
              <TableCell align={"right"} className={classes.cellHideSmall}>
              {
                getActWgt(targets[key])
              }
              </TableCell>
              <TableCell align="right" className={classes.secondaryHeading}>
              {format({prefix: '', suffix: ''})(xWinLib.roundTo(targets[key].balance,2))}
              </TableCell>
              <TableCell align={"right"} className={classes.secondaryHeading}>
              <Box bgcolor="info.main" color="info.contrastText" p={1}>
              {
                format({prefix: '', suffix: ''})(xWinLib.roundTo(getRebQuantity(targets[key].address), 5))
                }
              </Box>
              </TableCell>
              {getReturnETHContent(targets[key].address)}
            </TableRow>
          ))
        }
      </Table>
    )
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
              title={port.name}
            />
          <DialogContent>
            
            {getProgress()}
                  
            <Table size="small">
                 
                  <TableRow className={classes.tableRow}>
                    <TableCell>
                      Balance: 
                    </TableCell>
                    <TableCell>
                      {format({prefix: " ", suffix: ''})(xWinLib.roundTo(userData.userfundbal,5))}
                    </TableCell>
                    <TableCell>
                    <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
                        <Button
                          fullWidth
                          // startIcon={<EditIcon />}
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
                          onClick={handleClickAmt(0.25)}
                        >
                          {t('25%')}
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
                          onClick={handleClickAmt(0.75)}
                        >
                          {t('75%')}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickAmt(1)}
                        >
                          {t('100%')}
                        </Button>
                        <Button
                          fullWidth
                          color="primary"
                          size="medium"
                          variant="outlined"
                          onClick={handleClickClearAmt()}
                        >
                          {t('Clear')}
                        </Button>
                        </ButtonGroup>
                    </TableCell>
                   </TableRow> 
                   <TableRow className={classes.tableRow}>
                    <TableCell>
                      Redeem Unit: 
                    </TableCell>
                    <TableCell colSpan={2}>
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
                      {networkName.toLowerCase() === "bsctest"? "Return me in BNB: ": "Return me in ETH: "}
                      
                    </TableCell>
                    <TableCell colSpan={2}>
                    <Tooltip title="Return in ETH cost more in transaction fee" arrow='true'>
                      <AntSwitch
                          checked={withdrawInETH}
                          onChange={handleSwitchActive('enable')}
                          color="primary"
                          inputProps={{
                            name: 'add_enable',
                            id: 'add_enable',
                          }}
                          color="primary"
                        />
                      </Tooltip> 
                    </TableCell>
                   </TableRow> 
                   {getSlippageDisplay()}
                  </Table>
                  {getTargets(fundData.tokenNames)}
          </DialogContent>
         
          <DialogActions>
            <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
            <Button 
                disabled={isApproval}
                onClick={handleClickApprove} 
                color="secondary"
                variant="contained"
                startIcon={<AddCircleIcon />}>
              {t('Approve')}
              </Button>
              <Button 
                disabled={!isApproval}
                onClick={handleClickRedeem} 
                color="secondary"
                variant="contained"
                startIcon={<AddCircleIcon />}>
              {t('Redeem')}
              </Button>
            </ButtonGroup>
            
          </DialogActions>
        </Dialog>

      
      
    </Card>
   
  );
});

Redeem.propTypes = {
  className: PropTypes.string
};

export default Redeem;
