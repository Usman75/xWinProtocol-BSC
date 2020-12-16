pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: GPL-3.0-or-later
import "./xWinFundInterface.sol";

contract xWinMaster  {
    
    string public name;
    address private deployeraddress;

    mapping(address => string) public TokenNames;
    mapping(address => address) public PriceFeeds;
    address private BscRouterV2 = address(0xd954551853F55deb4Ae31407c423e67B1621424A);
    
    //Testnet bscswap router set
    //IBSCswapRouter02 internal bscswapRouter = IBSCswapRouter02(0xd954551853F55deb4Ae31407c423e67B1621424A);
    
    address private priceFeedAddress = address(0xDA7a001b254CD22e46d3eAB04d937489c93174C3);
    
    constructor() public {
        name = "xWin Master";
        deployeraddress = msg.sender;
    }
    
    modifier onlyDeployer {
        require(
            msg.sender == deployeraddress,
            "Only deployer can call this function."
        );
        _;
    }

    /// @dev return aave and chainlink price address
    function getPriceFeedAddress() external view returns (
            address priceFeedaddress){
         return priceFeedAddress;
    }
    
    /// @dev return aave and chainlink price address
    function getTokenName(address _tokenaddress) external view returns (
            string memory tokenname){
         return TokenNames[_tokenaddress];
    }
    
    /// @dev return BscRouterV2 address
    function getBSCRouterAddress() external view returns (address ){
         return BscRouterV2;
    }
    
    /// @dev update new manager address
    function updateManager(address xFundAddress, address newManager) external payable {
        
        xWinFund _xWinFund = xWinFund(xFundAddress);
        require(msg.sender == _xWinFund.getWhoIsManager(), "not manager to update");
        _xWinFund.updateManager(newManager);
    }
    
    /// @dev update new manager address
    function updateManagerFee(address xFundAddress, address newManagerFee) external payable {
        
        xWinFund _xWinFund = xWinFund(xFundAddress);
        require(msg.sender == _xWinFund.getWhoIsManager(), "not manager to update");
        _xWinFund.updateManagerFee(newManagerFee);
    }
    
    /// @dev return aave and chainlink price address
    function updateTokenNames(
        address[] calldata underlyingAddress, 
        string[] calldata tokennames) external onlyDeployer payable {
        
        for (uint i = 0; i < underlyingAddress.length; i++) {
            TokenNames[underlyingAddress[i]] = tokennames[i];
        }
    }
    
}