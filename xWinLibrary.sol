pragma solidity ^0.6.0;
// SPDX-License-Identifier: GPL-3.0-or-later
library xWinLib {
   
   struct TradePairData {
      address tokenAddress;
      uint256 amountIn;
      uint256 amountOutMin;
    }  
    
    struct TargetPairData {
      address tokenAddress;
      bytes32 tokenName;
      uint256 tokenWeight;
    }  
}