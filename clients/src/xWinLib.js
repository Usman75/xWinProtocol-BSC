import format from 'format-number';
import appGlobalConfig from 'appGlobalConfig';
import { BigNumber } from "bignumber.js";

const ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
const BNB_ADDRESS = "0x0000000000000000000000000000000000000000"

function roundTo (number, float) {
  if(number === 0) return ""
  return parseFloat(number).toFixed(float)
}

function formatNumber(number) {
  if(number > 0){
    return "+" + number
  }else{
    return number
  }
}

const xWinLib = {

  ToBigNumber: function (toConvertNumber) {
    
    let xAmountBig = new BigNumber(toConvertNumber);
    return Math.floor(xAmountBig.toFixed()).toString()
  },
  
  GetETH_ADDRESS: function () {
    return ETH_ADDRESS;
  },

  GetBNB_ADDRESS: function () {
    return BNB_ADDRESS;
  },

  GetChainID: function (networkName) {
    
    let id = 1
    switch (networkName.toLowerCase()) {
      case "mainnet":
        id = 1
        break
      case "ropsten":
        id = 3
        break
      case "kovan":
        id = 42
        break
      case "bsctest":
        id = 97
        break
      default:
        id = 1
    }
    return id 
  },
  

  DirectSwapAsync: function (xWinProtocol, xfundaddress, FromAddress, _amountOutMin,  _destAddress, subsAmtInWei) {
    return new Promise(function(resolve, reject) {
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 15 //
      xWinProtocol.methods.DirectSwap(
          subsAmtInWei, 
          xfundaddress, 
          _destAddress,
          _amountOutMin, 
          deadline
          ).send({ 
        from: FromAddress, 
        value: subsAmtInWei
        })
      .once('receipt', (receipt) => {
        console.log(receipt.transactionHash)
        resolve(receipt.transactionHash)
      })
      .catch(err => {
        console.log('error: %j', err)
        reject(err.message)
      })
    })
  },

  CreateTargetAsync: function (xWinProtocol, FromAddress, xfundaddress, positions) {
    return new Promise(function(resolve, reject) {
      
      let destAddress = []
      let aTokenAddress = []
      let chainlinkAddress = []
      let targetWgts = []

      positions.forEach(p => {
        destAddress.push(p.taddress)
        aTokenAddress.push(p.atokenaddress)
        chainlinkAddress.push(p.chainlinkaddress)
        targetWgts.push(p.weight * 100)
      });

      xWinProtocol.methods.CreateTarget(destAddress, targetWgts, xfundaddress).send({ 
        from: FromAddress, 
        value: 0 
        })
      .once('receipt', (receipt) => {
        console.log(receipt)
        resolve(receipt.transactionHash)
      })
      .catch(err => {
        console.log('error: %j', err)
        reject(err.message)
      })
    })
  },

  SubscribeDirectAsync: function (xWinProtocol, xfundaddress, FromAddress, _amountOutMin, _destAddress, subsAmtInWei, version) {
    return new Promise(function(resolve, reject) {
      
      console.log(subsAmtInWei)
      console.log(FromAddress)
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 15 //
      if(version === "V4"){
        console.log(_amountOutMin)  
        xWinProtocol.methods.Subscribe(xfundaddress, _destAddress, _amountOutMin, deadline).send({ 
          from: FromAddress, 
          value: subsAmtInWei 
          })
        .once('receipt', (receipt) => {
          console.log(receipt)
          resolve(receipt.transactionHash)
        })
        .catch(err => {
          console.log('error: %j', err)
          reject(err.message)
        })
      }else{
        
        let tradePairData = []
        for(let i=0; i<_destAddress.length; i++){
          tradePairData.push({
            tokenAddress: _destAddress[i],
            amountIn : 0,
            amountOutMin: _amountOutMin[i]
          })
        }
        console.log(tradePairData)
        console.log(xWinProtocol)
        
        xWinProtocol.methods.Subscribe(xfundaddress, tradePairData, deadline).send({ 
          from: FromAddress, 
          value: subsAmtInWei 
          })
        .once('receipt', (receipt) => {
          console.log(receipt)
          resolve(receipt.transactionHash)
        })
        .catch(err => {
          console.log('error: %j', err)
          reject(err.message)
        })
      }
    })
  },

  RedeemAsync: function (xWinProtocol, xfundaddress, FromAddress, amtRedeem, withdrawInETH, targetAdds, amountOutMin, version) {
    return new Promise(function(resolve, reject) {
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 15 //
      if(version === "V4"){
        xWinProtocol.methods.Redeem(
            amtRedeem, 
            xfundaddress, 
            withdrawInETH, 
            deadline,
            targetAdds,
            amountOutMin
            ).send({ 
              from: FromAddress, 
              value: 0,
            })
        .once('receipt', (receipt) => {
          console.log(receipt)
          resolve(receipt.transactionHash)
        })
        .catch(err => {
          console.log('error: %j', err)
          reject(err.message)
        })
      }else{

        let tradePairData = []
        for(let i=0; i< targetAdds.length; i++){
          tradePairData.push({
            tokenAddress: targetAdds[i],
            amountIn : 0,
            amountOutMin: amountOutMin[i]
          })
        }
        console.log(tradePairData)
        xWinProtocol.methods.Redeem(
            xfundaddress, 
            tradePairData,
            amtRedeem,
            withdrawInETH, 
            deadline
            ).send({ 
              from: FromAddress, 
              value: 0,
            })
        .once('receipt', (receipt) => {
          console.log(receipt)
          resolve(receipt.transactionHash)
        })
        .catch(err => {
          console.log('error: %j', err)
          reject(err.message)
        })
      }
    })
  },

  RebalanceV5Async: function (xWinProtocol, xfundaddress, FromAddress, UNIminAmount, UNIminAmountUw, OwNames, UwNames) {
    return new Promise(function(resolve, reject) {
      
      let tradePairDataOw = []
      let tradePairDataUw = []
      for(let i=0; i< OwNames.length; i++){
        
        let owname = UNIminAmount.find(x=>x.address === OwNames[i].address)
        tradePairDataOw.push({
          tokenAddress: owname.address,
          amountIn : owname.rebqtyInWei,
          amountOutMin: owname.amountOutInWei
        })
      }
      for(let i=0; i< UwNames.length; i++){
        let uwname = UNIminAmountUw.find(x=>x.address === UwNames[i].address)
        tradePairDataUw.push({
          tokenAddress: uwname.address,
          amountIn : uwname.rebqtyInWei,
          amountOutMin: uwname.amountOutInWei
        })
      }
      console.log(tradePairDataOw)
      console.log(tradePairDataUw)
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 15 //
      xWinProtocol.methods.Rebalance(
        xfundaddress, 
        tradePairDataOw,
        tradePairDataUw, 
        deadline
        ).send({ 
        from: FromAddress, 
        value: 0 
        })
      .once('receipt', (receipt) => {
        console.log(receipt)
        resolve(receipt.transactionHash)
      })
      .catch(err => {
        console.log('error: %j', err)
        reject(err.message)
      })
     
    })
  },

  
  getBaseCcy: function (networkName)  {

    if(networkName.toLowerCase() === "bsctest") return " BNB "
    return " ETH "
  },

  getEtherLink: function (networkName, address, type) {

    let uri = ""
    switch (networkName) {
      case "Mainnet":
        uri = "https://etherscan.io/" + type + "/"
        break
      case "Ropsten":
        uri = "https://ropsten.etherscan.io/" + type + "/"
        break
      case "Kovan":
        uri = "https://kovan.etherscan.io/" + type + "/"
        break
      case "BSCTest":
        uri = "https://testnet.bscscan.com/" + type + "/"
        break
      default:
      uri = "https://testnet.bscscan.com/" + type + "/"
    }
    return uri + address
  },

  // Rebalance: function (xWinProtocol, xfundaddress, FromAddress, positions){

  //   let newDest = []
  //   let newDestWgt = []
  //   positions.forEach(p => {
  //     console.log(p.weight)
  //     newDest.push(p.address)
  //     newDestWgt.push(p.weight * 10000)
  //   });
  //   const deadline = Math.floor(Date.now() / 1000) + 60 * 15 //

  //   xWinProtocol.methods.Rebalance(newDest, newDestWgt, xfundaddress, deadline).send({ 
  //     from: FromAddress, 
  //     value: 0 
  //     })
  //   .once('receipt', (receipt) => {
  //     console.log(receipt)
  //   })
  //   .catch(err => {
  //     console.log('error: %j', err)
  //   })
  //   return true;
  // },

  approveContract: function (sourceToken, allowance, contractAddr, FromAddress) {
    return new Promise(function(resolve, reject) {
      
      sourceToken.methods.approve(contractAddr, allowance).send({ 
        from: FromAddress, 
        value: 0 
        })
      .once('receipt', (receipt) => {
        console.log(receipt)
        resolve(receipt.transactionHash)
      })
      .catch(err => {
        console.log('error: %j', err)
        reject(err.message)
      })

    })
  },

  getTokenWeight : function(tokenName, fundTotalValue) {

    return tokenName.fundTokenValue / fundTotalValue * 100
  },

  getTokenWeightExcludeETH : function(tokenName, fundTotalValue, ethToken) {

    return this.roundTo(tokenName.fundTokenValue / (fundTotalValue - ethToken.fundTokenValue) * 100, 2)
  },

  getTokenActiveWeight : function(tokenName, fundTotalValue) {

    let fundWgt = this.getTokenWeight(tokenName, fundTotalValue)
    let targetWgt = tokenName.targetweight / 100
    return (targetWgt - fundWgt)
  },

  getTokenName : function(tokensMaster, address, _tokenname) {

    if(address === ETH_ADDRESS) return "ETH"
    if(address === BNB_ADDRESS) return "BNB"
    if(tokensMaster === undefined) return ""
    let tokenname = tokensMaster.find(t => t.address.toLowerCase() === address.toLowerCase())
    if(tokenname === undefined) return ""
    return tokenname.name
  },

  roundToFormat: function(number, float) {
    if(number === 0) return ""
    return formatNumber(parseFloat(number).toFixed(float))
  },


  toPercent: function(number, float){
    if(number === 0) return ""
    var percent = parseFloat(number * 100).toFixed(float) + "%";
    return percent;
  },

  
  numberWithCommas: function(x) {
    return format({prefix: appGlobalConfig.BaseCurrency, suffix: ''})(roundTo(x,2))
  },
  
  roundTo: function(number, float) {
    
    if(isNaN(number)) return 0
    if(number === 0) return 0
    return roundTo(number, float)
    //return roundTo(number, float)
  },
  
  
}

export default xWinLib;
