# xWinProtocol-BSC
xWin is the one-stop token fund management platform to be built with Binance Smart Chain blockchain technology. It connects the best fund manager and trader to the investors around the world.

## Deploy xWin Protocol To Binance Smart Chain

Tool to use for smart contract deployment: http://remix.ethereum.org/

### Deploy xWinMaster
1. First, you need to deploy xWinMaster.
2. After deploying xWinMaster, call "updateTokenNames" to pass in the underlying tokens supported in the platform and the relative token names. 
xWinMaster is used in xWinFund to retrieve the BSCSwap protocol address and also token names lookup when calling Band Protocol for onchain price fetching

Example Master token setup:

["0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867", "0x6ce8da28e2f864420840cf74474eff5fd80e65b8", "0x694d1af136c8112378e9f1f3bed16afd0dd22806"]

["DAI", "BTCB", "LINK"]


### Next, Deploy xWinDefi
1. Second step, deploy xWinDefi protocol. Passing in the platform wallet address and platform fee (in basis point) in the constructor. Platform wallet address is the destiny of the wallet that the platform fee to be transferred to 
2. Once deploy, keep the protocol address.
3. xWinDefi serve the interface to talk to any front end UI for the subscription, redemption or rebalance. The protocol will call the actual tasks in the xWinfund directly.


### Last, Deploy xWinFund
1. This is the contract used for deploying new fund in xWin platform.
2. Fill in the name, symbol, xWinMaster address (as get in step 1), xWinProtocoladdress (as you get in step 2 above), manager address and manager fee in basis point
3. You are done on smart contract deployment once it is deployed.
4. xWinFund only accept the tasks such as subscription or redemption from xWinDefi protocol.

## Smart Contract Deployed in Testnet
#### xWin Master
0x0ca3bf77eef4e643b8ea809746fe306274c3291d

#### xWin Protocol
0x4442929cc8ffd4536f0f847b252a79c93122a5bf

#### xWin Funds:
1. xWin Defi Investment Index: 0x6fcae44d39efc3f4e92dd633bc23766ee03cc4b4
2. xWin Defi Infra Index: 0x9d6640e7d9d42ab91523fdae39ed8dfee434d3d2
3. xWin Payment Exchange Index: 0x5d3d49b32e605080254350dd6cc51f10f2e9168d

### xWin Mock Tokens:
#### LINK: 
0x694d1af136c8112378e9f1f3bed16afd0dd22806

#### BAND: 
0x43a1c83ae15dd7e91baf2a7bb0d676dc695875cc

#### ATOM: 
0xa9b501ecf963032172f4614746372e754d6643a6

#### DOT: 
0xff478e9d692fc9658d3546f6b71b65a30cea6eae

# Client Side

1. There are some manual coordination needed with xWin team to put the configuration into our database to show them in the platform. Please contact info@wininnovation.net


## To compile client UI

1. Go to clients folder.
2. npm install
3. Replace the config-template.js to the firebase firestore configuration

## Subscribe to the xWin Sector Select Series Funds
Connect your Metamask wallet to BSC Testnet and subscribe to our sector series funds

https://xwininvestment.web.app/

### FAQ
Please visit our FAQ page at https://xwininvestment.web.app/faqbsc for the protocol explanation and etc.

## Contact Us:
Email us at info@wininnovation.net for any inquiry


