import React, { useState, useEffect, useRef  } from "react";
import { makeStyles } from '@material-ui/styles';
import firebase from "firebase/app";
import TradingViewChart from './components/TradingViewChart/TradingViewChart'
import Portfolio from './components/Portfolio/Portfolio'
import xWinLib from 'xWinLib';
import format from 'format-number';
import clsx from 'clsx';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SubscribeDirect from '../SubscribeDirect/SubscribeDirect'
import CreateTargets from '../CreateTargets/CreateTargets'
import RebalanceV5 from '../RebalanceV5/RebalanceV5'
import Redeem from '../Redeem/Redeem'
import xWinProtocolV4 from '../abi/xWinProtocolV4.json'
import xWinProtocolV5 from '../abi/xWinProtocolV5.json'
import xWinFundV4 from '../abi/xWinFundV4.json'
import xWinFundV5 from '../abi/xWinFundV5.json'
import UniswapV2Factory from '../abi/UniswapV2Factory.json'
import SettingsIcon from '@material-ui/icons/Settings';
// import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import {
  Typography,
  Grid,
  Card,
  CardHeader,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Tooltip,
  Button,
  CardContent,
  IconButton,
  DialogContentText,
  LinearProgress,
  ButtonGroup
} from '@material-ui/core';
import palette from "theme/palette";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4,15),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1,1)
    }
  },

  card: {
    padding: theme.spacing(2,2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1,1)
    },
    height: 350
  },
  cardpie: {
    padding: theme.spacing(2,2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1,1)
    },
    height: 450
  },
  cardnofixed: {
    padding: theme.spacing(2,2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1,1)
    },
    minHeight: 350
  },
tablecell: {
  //marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
},
 texttitle: {
   color: palette.text.white
 },
chartContainer: {
  height: 280,
  //position: 'relative'
},
negativeNum: {
  color: theme.palette.error.main
},
secondaryHeading: {
  backcolor: theme.palette.success.main,
  color: theme.palette.success.main,
},
mainHeading: {
  backcolor: theme.palette.primary.main,
  color: theme.palette.primary.main,
},
}));

const FundDetails = props => {
  let Web3 = require('web3');
  const { className, portfolios, tokensMaster, id, ...rest } = props;
  const classes = useStyles();
  const [globalWeb3, setGlobalWeb3] = useState("")
  const [networkName, setNetworkName] = useState("")
  const [mainData, setMainData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [myxWinProtocol, setMyxWinProtocol] = React.useState([]);
  const [uniswapV2FactoryProtocol, setUniswapV2FactoryProtocol] = React.useState([]);
  
  const [userData, setUserData] = useState({
    walletETHBalance: 0,
    selectedAccount: ""
  });
  const [fundData, setFundData] = useState({
    uniprice: 0,
    fundvalue: 0
  });
  const [selectedWallet, setSelectedWallet] = useState("")
  //const [mainPieData, setMainPieData] = React.useState([]);
  //const [exRates, setExRates] = useState([])
  console.log(tokensMaster)

  const refsubsdirect = useRef(null);
  const refredeem = useRef(null);
  const reftarget = useRef(null);
  const refrebV5 = useRef(null);
  
  const { port, gasPrices } = props.location.state
   
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

  const getxWinFundVersion = () => {
    if(port.version === "V4"){
      return xWinFundV4
    }
    if(port.version === "V5"){
      return xWinFundV5
    }
  }
  //fetch cToken data
  useEffect(() => {
    const controller = new AbortController();
    loadFundData()
    return () => {
      controller.abort();
    }
  }, [tokensMaster]);
  
  
  const getxWinProtocol = () => {
    if(port.version === "V4"){
      return xWinProtocolV4
    }
    if(port.version === "V5"){
      return xWinProtocolV5
    }
  }

  const loadFundData = async () => {

    setLoading(true)
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

    let env = "Mainnet"
    const netId = await window.web3.eth.net.getId()
    switch (netId) {
      case 1:
        setNetworkName("Mainnet")
        env = "mainnet"
        break
      case 4:
        setNetworkName("Rinkeby")
        env = "rinkeby"
        break
      case 3:
        setNetworkName("Ropsten")
        env = "ropsten"
        break
      case 42:
        setNetworkName("Kovan")
        env = "kovan"
        break
      case 97:
        setNetworkName("BSCTest")
        env = "bsctest"
        break
        default:
        //console.log('This is an unknown network.')
    }

    
    let UniswapV2FactoryProtocol = new window.web3.eth.Contract(UniswapV2Factory, "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f");
    setUniswapV2FactoryProtocol(UniswapV2FactoryProtocol)
    console.log(UniswapV2FactoryProtocol)

    let xWinProtocol = new window.web3.eth.Contract(getxWinProtocol(), port.protocoladdress);
    setMyxWinProtocol(xWinProtocol)
    const myxWinFunds = new window.web3.eth.Contract(getxWinFundVersion(), port.contractaddress);
    
    const accounts = await window.web3.eth.getAccounts()
    let wallet = accounts[0]
    setSelectedWallet(wallet)
    let balance = await window.web3.eth.getBalance(wallet)
    let userfundbal = await myxWinFunds.methods.balanceOf(wallet).call();
    setUserData({
      "walletETHBalance" :  window.web3.utils.fromWei(balance.toString()), //balance / PRECISION,
      "selectedAccount" : wallet,
      "userfundbal" : window.web3.utils.fromWei(userfundbal.toString()), // userfundbal / PRECISION
    })  
    
    let myFundData = await myxWinFunds.methods.GetFundDataAll().call();
    console.log(myFundData)
    
    let targetaddress = myFundData[1]
    let fundmanager = myFundData[2]
    let totalSupply = myFundData[3]
    let fundETHbalance = myFundData[4]
    let uniprice = myFundData[5]
    let fundvalue = myFundData[6]
    let fundName = myFundData[7]
    let symbol = myFundData[8]
    let managerFee = myFundData[9]
    let lendingRateThreshold = myFundData[10]
    
    symbol = await myxWinFunds.methods.symbol().call();
    
    let tokenNames = []

    let targetaddressNew = []
    for(let i=0; i< targetaddress.length; i++){
      targetaddressNew.push(targetaddress[i])
    }

    console.log(fundETHbalance)
    for(let i=0; i< targetaddressNew.length; i++){
        console.log(targetaddressNew[i])
        let targetweight = await myxWinFunds.methods.getTargetWeight(targetaddressNew[i]).call();
        let targetBal = await myxWinFunds.methods.getBalance(targetaddressNew[i]).call();
        let fundTokenValue = await myxWinFunds.methods.getTokenValues(targetaddressNew[i]).call();
        
        let AllBal = 0
        console.log(networkName)
        if(env.toLowerCase() === "bsctest"){
          AllBal = await myxWinFunds.methods.getBalance(targetaddressNew[i]).call();
          console.log(AllBal)
        }else{
          AllBal = await myxWinFunds.methods.getBalanceAll(targetaddressNew[i]).call();
        }
       
        let diffBal = AllBal - targetBal
        let tname = ""
        let token = tokensMaster.find(t=>t.address.toLowerCase() === targetaddressNew[i].toLowerCase())
        console.log(targetaddressNew[i])
        console.log(tokensMaster)
        console.log(token)
        
        if(token !== undefined)
          
        tname = token.name
        console.log(tname)
          let price = fundTokenValue / (AllBal == 0? 1: AllBal)
          tokenNames.push({
          "key": i,
          "address": targetaddressNew[i],
          "targetweight": targetweight,
          "balance": window.web3.utils.fromWei(targetBal.toString()), // targetBal / PRECISION,
          "fundTokenValue": window.web3.utils.fromWei(fundTokenValue.toString()), //fundTokenValue / PRECISION,
          "aTokenBal": window.web3.utils.fromWei(diffBal.toString()), //diffBal / PRECISION
          "name": tname,
          "price" : price
        })
    }
    console.log(tokenNames)
    tokenNames.push({
      "key": 999,
      "address": env === "bsctest"? xWinLib.GetBNB_ADDRESS():  xWinLib.GetETH_ADDRESS(),
      "targetweight": 0,
      "balance": window.web3.utils.fromWei(fundETHbalance.toString()), //fundETHbalance / PRECISION,
      "fundTokenValue": window.web3.utils.fromWei(fundETHbalance.toString()),
      "aTokenBal": 0,
      "name": env === "bsctest"? "BNB" :  "ETH",
      "price": 1
    })
    
    setFundData({
      ...fundData,
      "targetaddress": targetaddress,
      "fundvalue": window.web3.utils.fromWei(fundvalue.toString()), //fundvalue / PRECISION,
      "tokenNames": tokenNames,
      "uniprice": window.web3.utils.fromWei(uniprice.toString()), //uniprice / PRECISION,
      "totalSupply":  window.web3.utils.fromWei(totalSupply.toString()), // totalSupply / PRECISION,
      "fundName": fundName,
      "fundmanager": fundmanager,
      "fundETHbalance": window.web3.utils.fromWei(fundETHbalance.toString()), //fundETHbalance / PRECISION
      "symbol": symbol,
      "managerFee": managerFee / 100,
      "lendingRateThreshold": lendingRateThreshold,
      "networkName": env
    })
    setLoading(false)
  }

  useEffect(() => {
        const unsubscribe = firebase
        .firestore()
        .collection('performance2')
        .doc(props.match.params.id).onSnapshot(doc => {
          setMainData(doc.data())
      })
      return () => { unsubscribe() }
    
  }, [])

  const handleClickSubsDirect = event => {
    refsubsdirect.current.handleOpen();
  }

  const handleClickRedeem = event => {
    refredeem.current.handleOpen();
  }

  const handleClickCreateTarget = event => {
    reftarget.current.handleOpen();
  }

  const handleClickRebalV5 = event => {
    refrebV5.current.handleOpen();
  }
  
  const getIcons = (symbol) => {
    return <img alt={symbol.toLowerCase()} src={"/images/icons/color/"+ symbol.toLowerCase() +".png"} />
  }

  const handleOnClickBack = event => {
    event.preventDefault();
    props.history.replace('/funds')
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

  const getFundDesc = () => {

    //if(targets === undefined ) return ""

    return (
      <Card
        {...rest}
        className={clsx(classes.cardnofixed, className)}
      >
      <CardContent>
      <Table size="small">
        <TableRow>
          <TableCell colSpan={6}>
            <Typography variant="body1" className={classes.primaryHeading}>
              <div dangerouslySetInnerHTML={{__html:port.desc}} />
            </Typography>
          </TableCell>
        </TableRow>
        
        
      </Table>
      </CardContent>

      </Card>
    );

  }
  const getBaseCcy = () => {

    console.log(networkName)
    if(networkName === "BSCTest") return " BNB "
    return " ETH "
  }

  const getFundDetail = () => {

    //if(targets === undefined ) return ""

    return (
      <Card
        {...rest}
        className={clsx(classes.card, className)}
      >
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
                  TLV:
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
              <br></br>
              <br></br>
              <TableRow>
                <TableCell colSpan={2}>
                <Button
                    fullWidth
                    size="medium"
                    color="primary"
                    variant="contained"
                    onClick={handleClickSubsDirect}
                    //startIcon={<HttpsIcon />}
                  >
                    Subscribe
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    fullWidth
                    size="medium"
                    color="primary"
                    variant="contained"
                    onClick={handleClickRedeem}
                    //startIcon={<HttpsIcon />}
                  >
                    Redeem
                  </Button>
                </TableCell>
              </TableRow>
              {getManagerSetupButton()}
              {getManagerRebalanceButton()}
      </Table>
      </Card>
    );

  }

  const getTargets = (targets) => {
    if(targets === undefined ) return ""

    return (
      <Card
        {...rest}
        className={clsx(classes.cardpie, className)}
      >
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
              <TableCell className={classes.tablecell}>
                Fund %
              </TableCell>
              <TableCell className={classes.tablecell}>
                Active %
              </TableCell>
              <TableCell >
                Quantity
              </TableCell>
            </TableRow>
        </TableHead>
        {
          Object.keys(targets).map((key, i) => (
            <TableRow hover>
              <TableCell className={classes.cellHideSmall}>
                <Tooltip title={xWinLib.getTokenName(tokensMaster, targets[key].address)} arrow={true}>
                  {/* {getIcons(targets[key].name)} */}
                  {getIcons(xWinLib.getTokenName(tokensMaster, targets[key].address))}
                </Tooltip>
              </TableCell>
              <TableCell>
                <Typography variant="body1" className={classes.secondaryHeading}>
                  {xWinLib.getTokenName(tokensMaster, targets[key].address)}
                </Typography>
              </TableCell>
              <TableCell>
              <Typography variant="body1" className={classes.secondaryHeading}>
              {format({prefix: '', suffix: '%'})(xWinLib.roundTo(targets[key].targetweight / 100,2))}
              </Typography>
              </TableCell>
              <TableCell align={"right"} className={classes.tablecell}>
              {
                format({prefix: '', suffix: '%'})(xWinLib.roundTo(xWinLib.getTokenWeight(targets[key], fundData.fundvalue),2))
              }
              </TableCell>
              <TableCell align={"right"} className={classes.tablecell}>
              {
                getActWgt(targets[key])
              }
              </TableCell>
              <TableCell align="right" className={classes.secondaryHeading}>
              {format({prefix: '', suffix: ''})(xWinLib.roundTo(targets[key].balance,2))}
              </TableCell>
            </TableRow>
          ))
        }
        
        <Tooltip title={"Fee to be paid to fund manager on every redemption"} arrow={true}>
        <TableRow>
        <TableCell>
          <Typography variant="body2" className={classes.secondaryHeading}>
            Manager Fee
            </Typography>
          </TableCell>
          <TableCell colSpan={1}>
            <Typography variant="body2" className={classes.secondaryHeading}>
              {format({prefix: '', suffix: '%'})(fundData.managerFee)}
            </Typography>
          </TableCell>
          <TableCell colSpan={2}>
            <Typography variant="body2" className={classes.secondaryHeading}>
              <a href={xWinLib.getEtherLink(fundData.networkName, port.contractaddress, "address")} target="blank">View on Etherscan</a>
            </Typography>
          </TableCell>
        </TableRow>
        </Tooltip>
        </Table>
      </Card>
    );
  }

  const isSetupReady = () => {

    if(fundData.targetaddress === undefined) return true
    return !fundData.targetaddress.length > 0
  }

  
  const getManagerSetupButton = () => {
  
    if(userData.selectedAccount !== fundData.fundmanager) return ""
    return (
      <TableRow>
        <TableCell colSpan={2}>
        <Button
                fullWidth
                color="primary"
                variant="outlined"
                onClick={handleClickCreateTarget}
                startIcon={<SettingsIcon/>}
              >
                Setup
              </Button>
        </TableCell>
      </TableRow>
    )
  }

  const getManagerRebalanceButton = () => {
  
    if(userData.selectedAccount !== fundData.fundmanager) return ""
    return (
      <TableRow>
        <TableCell colSpan={2}>
        <Button
                disabled={isSetupReady()}
                fullWidth
                color="primary"
                variant="outlined"
                onClick={handleClickRebalV5}
                startIcon={<SettingsIcon/>}
              >
                Rebalance
              </Button>
        </TableCell>
      </TableRow>
    )
  }

  const getManagerButton = () => {
    
    if(userData.selectedAccount !== fundData.fundmanager) return ""
    
    return (
          <ButtonGroup size="medium" color="primary">
            <Button
                fullWidth
                color="primary"
                variant="outlined"
                onClick={handleClickCreateTarget}
                startIcon={<SettingsIcon/>}
              >
                Setup
              </Button>
              <Button
                disabled={isSetupReady()}
                fullWidth
                color="primary"
                variant="outlined"
                onClick={handleClickRebalV5}
                startIcon={<SettingsIcon/>}
              >
                RebalV5
              </Button>
              
          </ButtonGroup>
    )
  }

  return (
    <div className={classes.root}>
        <RebalanceV5 
        ref={refrebV5}
        selectedport={port}
        fundData={fundData}
        tokensMaster={tokensMaster}
        userData={userData}
        myxWinProtocol={myxWinProtocol}
        gasPrices={gasPrices}
        globalWeb3={globalWeb3}
        networkName={networkName}
        />
        
       <CreateTargets 
        ref={reftarget}
        selectedport={port}
        fundData={fundData}
        tokensMaster={tokensMaster}
        userData={userData}
        myxWinProtocol={myxWinProtocol}
        gasPrices={gasPrices}
        globalWeb3={globalWeb3}

        />
       <SubscribeDirect 
        ref={refsubsdirect} 
        port={port}
        fundData={fundData}
        tokensMaster={tokensMaster}
        userData={userData}
        myxWinProtocol={myxWinProtocol}
        gasPrices={gasPrices}
        globalWeb3={globalWeb3}
        networkName={networkName}
        uniswapV2FactoryProtocol={uniswapV2FactoryProtocol}
        />
      <Redeem 
        ref={refredeem} 
        port={port}
        fundData={fundData}
        tokensMaster={tokensMaster}
        userData={userData}
        myxWinProtocol={myxWinProtocol}
        gasPrices={gasPrices}
        globalWeb3={globalWeb3}
        networkName={networkName}
        />
      <Grid
        container
        spacing={1}
      >
        <Grid
          item
          lg={8}
          md={8}
          xl={9}
          xs={12}
        >
          <Card
            {...rest}
            className={clsx(classes.card, className)}
          >
            <CardHeader
              action={
                <IconButton 
                  className={classes.title}
                  onClick={handleOnClickBack}
                  aria-label="settings">
                  <ArrowBackIcon />
                  Back
                </IconButton>
              }
              className={classes.primaryHeading}
              title={port.name + " Price Returns"}
              subheader= {"Symbol: " + port.symbol}
              titleTypographyProps={{variant:'h3' }}
            />
            
            <TradingViewChart mainData={mainData}/>
          </Card>
        </Grid>
        
        <Grid
          item
          lg={4}
          md={4}
          xl={9}
          xs={12}
        >
          {getProgress()}
          {getFundDetail()}
        </Grid>

        <Grid
          item
          lg={3}
          md={12}
          xl={9}
          xs={12}
        >
          <Portfolio
            fundData={fundData}
            tokensMaster={tokensMaster}
          />
        </Grid>
        
        <Grid
          item
          lg={9}
          md={12}
          xl={9}
          xs={12}
        >
          {getProgress()}
          {getTargets(fundData.tokenNames)}  
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          {getFundDesc()}
        </Grid>
      </Grid>
    </div>
       
  );

};

export default FundDetails;
