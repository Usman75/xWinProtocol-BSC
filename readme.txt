Deploy xWin Protocol To Binance Smart Chain
################################################

Deploy xWinMaster
########################
1. First, you need to deploy xWinMaster.
2. After deploying xWinMaster, call updateTokenNames to pass in the underlying tokens supported in the platform and the relative token names. xWinMaster is used in xWinFund to retrieve the BSCSwap protocol address and also token names lookup when calling Band Protocol for onchain price fetching

Deploy xWinDefi
########################
1. Second step, deploy xWinDefi protocol. Passing in the platform wallet address and platform fee (in basis point) in the constructor. Platform wallet address is the destiny of the wallet that the platform fee to be transferred to 
2. Once deploy, keep the protocol address.

Deploy xWinFund
########################
1. This is the contract used for deploying new fund in xWin platform.
2. Fill in the name, symbol, xWinMaster address (as get in step 1), xWinProtocoladdress (as you get in step 2 above), manager address and manager fee in basis point
3. You are done once it is deployed.


Client Side
########################

1. There are some manual coordination needed with xWin team to put the configuration into our database to show them in the platform. Please contact info@wininnovation.net
