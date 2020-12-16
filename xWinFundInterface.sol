pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: GPL-3.0-or-later
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "./xWinLibrary.sol";

interface xWinFund {
    
    function getManagerFee() external view returns(uint256);
    function getTargetWeight(address addr) external view returns (uint256);
    function getWhoIsManager() external view returns(address mangerAddress);
    function getBalance(address fromAdd) external view returns (uint256 balance);
    function getFundValues() external view returns (uint256);
    function getTargetWeightQty(address targetAdd, uint256 srcQty) external view returns (uint256);
    function updateManager(address managerAdd) external payable;
    function updateManagerFee(address newFeebps) external payable;
    
    function Redeem(
        address payable _investorAddress,
        xWinLib.TradePairData[] calldata _tradePairData,
        uint256 redeemUnit,
        bool _returnInBase,   
        uint256 deadline
        ) external payable;
        
    function RebalanceV2(
        xWinLib.TradePairData[] calldata _tradePairDataOverweight,
        xWinLib.TradePairData[] calldata _tradePairDataUnderweight,
        uint256 deadline
        ) external payable;
        
    function Subscribe(
        xWinLib.TradePairData[] calldata _tradePairData,
        address payable _investorAddress,
        uint256 _subsAmt,
        uint256 deadline
        ) external payable; 
        
    function TransferToken(
        IERC20 fromToken,
        uint256 srcQty,
        address toAddress
        ) external payable;
    
    
    function CreateTargetNames(
        address[] calldata _toAddresses, 
        uint256[] calldata _targetWeight
    ) external payable;
    
   
    function getUnitPrice() external view returns(uint256 unitprice);
}
