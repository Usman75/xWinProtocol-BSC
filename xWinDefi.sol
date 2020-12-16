pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: GPL-3.0-or-later

import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

import "./xWinFundInterface.sol";
import "./xWinLibrary.sol";


contract ReentrancyGuard {
    uint256 private _guardCounter;

    constructor () internal {
        _guardCounter = 1;
    }

    modifier nonReentrant() {
        _guardCounter += 1;
        uint256 localCounter = _guardCounter;
        _;
        require(localCounter == _guardCounter, "ReentrancyGuard: reentrant call");
    }
}

contract xWinDefi is ERC20, ReentrancyGuard {
    
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address payable private platformWallet;
    address private deployeraddress;
    uint256 public platformFeeBps;

    //IERC20 internal constant ETH_TOKEN_ADDRESS = IERC20(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
    IERC20 internal constant BNB_TOKEN_ADDRESS = IERC20(0x0000000000000000000000000000000000000000);

    event Received(address, uint);

    struct xWinFee {
      uint256 platformUnit;
      uint256 managerUnit;
      uint256 finalRedeemUnit;
      uint256 redeemratio;
    }
    
    modifier onlyDeployer {
        require(
            msg.sender == deployeraddress,
            "Only deployer can call this function."
        );
        _;
    }
    
    constructor (
            uint256 _platformFeeBps,
            address _platformWallet
        ) public ERC20(
            "xWinDefi BSC Investment",
            "xWinDefi"
    ) {
        platformWallet = address(uint160(_platformWallet));
        platformFeeBps = _platformFeeBps;
        deployeraddress = msg.sender;
    }
    
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
   
    /// @dev perform subscription based on ratio setup and put into lending if available 
    function Subscribe(
        address xFundAddress,
        xWinLib.TradePairData[] memory _tradePairData,
        uint256 deadline
        ) public nonReentrant payable {
        
        require(address(msg.sender).balance >= msg.value, "not enough BNB balance");
        xWinFund _xWinFund = xWinFund(xFundAddress);
        address payable investorAddress = msg.sender;
        uint256 subsAmt = msg.value;
        address payable contractAdd = address(uint160(xFundAddress));
        contractAdd.transfer(msg.value);

        _xWinFund.Subscribe(
            _tradePairData,
            investorAddress,
            subsAmt,
            deadline
            );
        
    }
    
    /// @dev perform redemption based on unit redeem
    function Redeem(
        address xFundAddress,
        xWinLib.TradePairData[] calldata _tradePairData,
        uint256 redeemUnit,
        bool _returnInBase,   
        uint256 deadline
        ) external nonReentrant payable {
        
        require(IERC20(xFundAddress).balanceOf(msg.sender) >= redeemUnit, "Not enough balance to redeem");
        require(IERC20(xFundAddress).transferFrom(msg.sender, address(this), redeemUnit), "transferFrom failed"); 

        xWinFund _xWinFund = xWinFund(xFundAddress);
        address payable investorAddress = msg.sender;
        
        uint256 platformUnit = redeemUnit.mul(platformFeeBps).div(10000);
        require(IERC20(xFundAddress).approve(address(this), platformUnit), "approval to xFee.platformUnit failed");
        IERC20(xFundAddress).transferFrom(address(this), platformWallet, platformUnit);

        uint256 managerUnit = redeemUnit.mul(_xWinFund.getManagerFee()).div(10000);
        address managerOwner = _xWinFund.getWhoIsManager();

        require(IERC20(xFundAddress).approve(address(this), managerUnit), "approval to xFee.managerUnit failed");
        IERC20(xFundAddress).transferFrom(address(this), managerOwner, managerUnit);

        uint256 finalRedeemUnit = redeemUnit.sub(platformUnit).sub(managerUnit);
        
        _xWinFund.Redeem(
            investorAddress,
            _tradePairData,
            finalRedeemUnit,
            _returnInBase,   
            deadline
            );

    }
    
    /// @dev perform rebalance with new weight
    function Rebalance(
        address xFundAddress,
        xWinLib.TradePairData[] calldata _tradePairDataOverweight,
        xWinLib.TradePairData[] calldata _tradePairDataUnderweight,
        uint256 deadline
        ) external nonReentrant payable {
        
        xWinFund _xWinFund = xWinFund(xFundAddress);
        require(msg.sender == _xWinFund.getWhoIsManager(), "not the manager to rebalance");
        
        _xWinFund.RebalanceV2(
            _tradePairDataOverweight,
            _tradePairDataUnderweight,
            deadline
            );
        
    }
    
    /// @dev create target ratio by portfolio manager
    function CreateTarget(
        address[] calldata _toAddresses, 
        uint256[] calldata _targetWeight,
        address xFundAddress 
        ) external nonReentrant payable {
        
        xWinFund _xWinFund = xWinFund(xFundAddress);
        require(msg.sender == _xWinFund.getWhoIsManager(), "only owner of the fund is allowed");
        _xWinFund.CreateTargetNames(_toAddresses, _targetWeight);
    }
    
    /// @dev update platform fee by deployer
    function updatePlatformFee(uint256 newPlatformFee) external onlyDeployer {
        platformFeeBps = newPlatformFee;
    }
}
