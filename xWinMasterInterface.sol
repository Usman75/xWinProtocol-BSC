pragma solidity ^0.6.0;
// SPDX-License-Identifier: GPL-3.0-or-later
interface xWinMaster {
    
    function getPriceFeedAddress() external view returns (address priceFeedaddress);
    function getBSCRouterAddress() external view returns (address );
    function getTokenName(address _tokenaddress) external view returns (string memory tokenname);
}
