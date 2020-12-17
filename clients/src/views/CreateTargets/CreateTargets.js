import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next'
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Circular from '../Circular/Circular'
import format from 'format-number';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from '@material-ui/icons/Home';
import { Alert } from '@material-ui/lab';

import {
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  TableRow,
  TableCell,
  Table,
  TableBody,
  LinearProgress,
  ButtonGroup,
  TextField,
  CardHeader,
  IconButton,
  InputAdornment,
  Snackbar
} from '@material-ui/core';
import xWinLib from "xWinLib";

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

const CreateTargets = forwardRef((props, ref) => {
  const { className, fundData, tokensMaster, userData, myxWinProtocol, symbols, portfolios, selectedport,...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation()
  const refCircular = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [positions, setPositions] = useState([])
  
  const [openMsg, setOpenMsg] = React.useState(false);
  const [msgStatus, setMsgStatus] = React.useState("success");
  const [responseMsg, setResponseMsg] = React.useState("");

  const showMessage = () => {
    setOpenMsg(true);
  };

  const hideMessage = () => {
    setOpenMsg(false);
  };
  
  const [fundSetting, setFundSetting] = useState({
    managerFee: 0.00,
    lendingthreshold : 8.00,
    manageraddress : userData.selectedAccount
  });

  const [state, setState] = useState({
    symbol: '',
    fundname : '',
    baseccy : '',
    manageraddress : ''
  });
  const [errMsg, setErrmsg] = React.useState("");
  
  const [ticker, setTicker] = useState({
    symbol: '',
    weight: 0
  })

  const getTotalWeight = () => {
    let total = 0
    positions.forEach(p => {
      total = total + parseFloat(p.weight)
    })
    return total;
  }

  const handleClickSame = event => {
    event.preventDefault();

    let p = []
    let ethToken = fundData.tokenNames.find(x=>x.address == xWinLib.GetETH_ADDRESS())
    fundData.tokenNames.forEach(token => {
      if(token.address != xWinLib.GetETH_ADDRESS()){
        console.log(token)
        let tkName = xWinLib.getTokenName(tokensMaster, token.address)
        let fundweight = xWinLib.getTokenWeightExcludeETH(token, fundData.fundvalue, ethToken)
        
        if(tkName !== "ETH" && tkName !== "BNB"){
          let address = getAddress(tkName)
          p.push({
            symbol: tkName,
            weight: fundweight, //token.targetweight / 100,
            taddress: token.address
          })
        }
      }
      
    });
    console.log(p)
    setPositions(p)
  }


  const handleClickAdd = event => {
    event.preventDefault();
    let result = positions.filter(t => t.symbol === state.symbol)
    if(result.length > 0){
      return
    }
    setErrmsg("")
    let existingWgt = getTotalWeight()
    console.log(existingWgt)
    let totalweight = parseFloat(existingWgt) + parseFloat(state.weight)
    if(totalweight > 100){
      setErrmsg("Not more than 100% weight")
      return
    }  

    let p = []
    positions.forEach(element => {
      p.push({
        symbol: element.symbol,
        weight: element.weight,
        taddress: element.taddress,
        // atokenaddress: element.atokenaddress,
        // chainlinkaddress: element.chainlinkaddress,
      })
    });

    let address = getAddress(ticker)
    p.push({
      symbol: ticker.symbol,
      weight: state.weight,
      taddress: address.mainAddress,
      // atokenaddress: address.aTokenAddress,
      // chainlinkaddress: address.chainlinkaddress
    })

    setPositions(p)

    
  };

  const handleChange = name => event => {
    
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleManagerFeeChange = () => event => {
    
    fundData.managerFee = event.target.value
  };


  const getSupportedSymbols = () => {
    
    const symbols = []
    tokensMaster.forEach(token => {
      symbols.push({
        symbol: token.name
      })
    });
    
    return symbols
  }
  const getAddress = (ticker) => {
    if(ticker === undefined) return

    let mainAddress = ""

    if(tokensMaster != null){
      let selected = tokensMaster.find(t => t.name === ticker.symbol)
      if(selected != null){
        mainAddress = selected.address
      } 
    }
  return {mainAddress}
  }

  const handleOpen = () => {
    setOpenAdd(true);
  }
  
  const handleCloseAdd = () => {
    setLoading(false)
    setOpenAdd(false);
  }

  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen
    };
  });

  
  const handleClickCreate = async event => {
    event.preventDefault();
    
    setLoading(true)
    console.log(userData)
    xWinLib.CreateTargetAsync(
      myxWinProtocol, 
      userData.selectedAccount,
      selectedport.contractaddress,
      positions
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


  const handleClickDelete = (symbol) => event => {
    event.preventDefault();
    const filteredItems = positions.filter(t => t.symbol !== symbol)
    setPositions(filteredItems)
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

  const getIcons = (symbol) => {
    return <img alt={symbol.toLowerCase()} src={"/images/icons/color/"+ symbol.toLowerCase() +".png"} />
  }

  const getSetTarget = () => {

    return (
      <div>
              
                  <Table 
                    size="small" 
                  >
                  <TableBody>
                  {positions.map((p, i) => ( 
                    <TableRow
                        hover
                      >
                        <TableCell>
                          <Typography variant="h3" className={classes.secondaryHeading}>
                            {getIcons(p.symbol)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                            {p.symbol}
                        </TableCell>
                        <TableCell>
                            {format({prefix: '', suffix: '%'})(p.weight)}
                        </TableCell>
                        
                        <TableCell align="left">
                          <Typography variant="body2" className={classes.secondaryHeading}>
                            {p.taddress} 
                          </Typography> 
                        </TableCell>
                        <TableCell>
                        <ButtonGroup size="small" color="secondary" aria-label="large outlined primary button group">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={handleClickDelete(p.symbol)}
                          >
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className={classes.tableRow}>
                        <TableCell>
                            {/* {getIcons(ticker)} */}
                        </TableCell>
                      <TableCell>
                        <Autocomplete
                          id="symbol"
                          style={{ width: 80 }}
                          name="symbol"
                          options={getSupportedSymbols()}
                          getOptionLabel={option => option.symbol}
                          onChange={(event, newValue) => {
                            setTicker({
                              symbol: newValue == null? "" : newValue.symbol
                            });
                          }}
                          renderInput={params => <TextField {...params} label="Token" margin="dense" variant="outlined" />}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number" 
                          className={classes.inputText}
                          label={t('Weight %')}
                          margin="dense"
                          name="weight"
                          onChange={handleChange("weight")}
                          required
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                          }}
                        />
                      </TableCell>
                      
                      <TableCell>
                        <TextField
                          className={classes.inputText}
                          fullWidth
                          label={t('Token Address')}
                          margin="dense"
                          name="taddress"
                          value={getAddress(ticker).mainAddress}
                          //onChange={handleChange("taddress")}
                          required
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <HomeIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </TableCell>
                      
                      <TableCell>
                        <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<AddCircleIcon />}
                            onClick={handleClickAdd}
                          >
                          {""}
                            
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  
                    </TableBody>

                  </Table>
      </div>
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
          //onClose={handleCloseAdd} 
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          fullScreen={false}
          maxWidth = {"lg"}
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
              title={selectedport.name}
            />
          <DialogContent>
            <DialogContentText>
            <Table size="small">
                  <TableRow className={classes.tableRow}>
                      <TableCell>
                        Lending APR Trigger (%): 
                      </TableCell>
                      <TableCell>
                          <TextField
                            type="number" 
                            className={classes.inputText}
                            label={t('Lending APR %')}
                            margin="dense"
                            name="lendingthreshold"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                            required
                            variant="outlined"
                            value={fundSetting.lendingthreshold}
                          />
                      </TableCell>
                    </TableRow> 
                    <TableRow className={classes.tableRow}>
                      <TableCell>
                        Manager Fee (%): 
                      </TableCell>
                      <TableCell>
                          <TextField
                            type="number" 
                            className={classes.inputText}
                            label={t('Manager Fee')}
                            margin="dense"
                            name="managerFee"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                            onChange={handleManagerFeeChange()}
                            required
                            variant="outlined"
                            value={fundData.managerFee}
                          />
                      </TableCell>
                    </TableRow> 
                    <TableRow className={classes.tableRow}>
                      <TableCell>
                        Manager Address: 
                      </TableCell>
                      <TableCell>
                          <TextField
                            fullWidth
                            className={classes.inputText}
                            label={t('wallet address')}
                            margin="dense"
                            name="manageraddress"
                            required
                            variant="outlined"
                            value={fundSetting.manageraddress}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <HomeIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                      </TableCell>
                    </TableRow> 
                  </Table>
            </DialogContentText>
            {getProgress()}
            {getSetTarget()}
              
          </DialogContent>
          <DialogActions>
          <Typography variant="h5" className={classes.negativeNum}>
            {errMsg}
          </Typography> 
              
            <ButtonGroup size="small" color="primary" aria-label="large outlined primary button group">
              <Button 
                onClick={handleClickSame} 
                color="secondary"
                variant="contained"
                startIcon={<AddCircleIcon />}>
                Set To Fund %
              </Button>
              <Button 
                onClick={handleClickCreate} 
                color="secondary"
                variant="contained"
                startIcon={<AddCircleIcon />}>
                Create Target
              </Button>
            </ButtonGroup>
            
          </DialogActions>
        </Dialog>

      
      
    </Card>
  );
});

CreateTargets.propTypes = {
  className: PropTypes.string
};

export default CreateTargets;
