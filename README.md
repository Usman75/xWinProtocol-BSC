# xWinProtocol-BSC
xWin is the one-stop token fund management platform to be built with Binance Smart Chain blockchain technology. It connects the best fund manager and trader to the investors around the world.

Deploy xWin Protocol To Binance Smart Chain
################################################

Tool to use for smart contract deployment: http://remix.ethereum.org/

Deploy xWinMaster
########################
1. First, you need to deploy xWinMaster.
2. After deploying xWinMaster, call "updateTokenNames" to pass in the underlying tokens supported in the platform and the relative token names. 
xWinMaster is used in xWinFund to retrieve the BSCSwap protocol address and also token names lookup when calling Band Protocol for onchain price fetching

Example Master token setup:

["0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867", "0x6ce8da28e2f864420840cf74474eff5fd80e65b8", "0x694d1af136c8112378e9f1f3bed16afd0dd22806", "0x43a1c83ae15dd7e91baf2a7bb0d676dc695875cc", "0xa9b501ecf963032172f4614746372e754d6643a6", "0xff478e9d692fc9658d3546f6b71b65a30cea6eae", "0xd48bff86c81c182c642f206a032a875020f71a34", "0x2354fc9abb0a6013f255417f60e6ef1325bed81e", "0x9cf3b64038ce02a80946c526aab1b527d6ad1b98", "0x63f6112e20b6dc8922dd3e9e666a5cb9fb841277", "0x49bfd7dcebccc88bb3f1746ea1b1d618c11ac026", "0xcf0660371235ef79f3644fcf1d47ebd0bec698d2", "0x0b79116939d1135ce06ceda61856918f9966ec58", "0x5b96a24602d6f98228226f16a1a7288797f758fe", "0x4dd1785f34d6da237fccf618fc56b4b0c18a3dd0"]

["DAI", "BTCB", "LINK", "BAND", "ATOM", "DOT", "YFI", "YFII", "LINA", "UNI", "CREAM", "XVS", "CRO", "SXP", "OKB"]


Next, Deploy xWinDefi
########################
1. Second step, deploy xWinDefi protocol. Passing in the platform wallet address and platform fee (in basis point) in the constructor. Platform wallet address is the destiny of the wallet that the platform fee to be transferred to 
2. Once deploy, keep the protocol address.
3. xWinDefi serve the interface to talk to any front end UI for the subscription, redemption or rebalance. The protocol will call the actual tasks in the xWinfund directly.


Last, Deploy xWinFund
########################
1. This is the contract used for deploying new fund in xWin platform.
2. Fill in the name, symbol, xWinMaster address (as get in step 1), xWinProtocoladdress (as you get in step 2 above), manager address and manager fee in basis point
3. You are done on smart contract deployment once it is deployed.
4. xWinFund only accept the tasks such as subscription or redemption from xWinDefi protocol.


Client Side
########################

1. There are some manual coordination needed with xWin team to put the configuration into our database to show them in the platform. Please contact info@wininnovation.net


To compile client UI
########################

1. Go to clients folder.
2. npm install
3. Replace the config-template.js to the firebase firestore configuration


Please visit our FAQ page at https://xwininvestment.web.app/faqbsc for the protocol explanation and etc.

Email us at info@wininnovation.net for any inquiry


