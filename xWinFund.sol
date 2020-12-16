pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: GPL-3.0-or-later
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

import "./BandProtocolInterface.sol";
import "./xWinMasterInterface.sol";
import "./BscSwapRouterInterface.sol";
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


contract xWinFund is IERC20, ERC20 {
    
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    xWinMaster private _xWinMaster;

    address private protocolOwner;
    address private masterOwner;
    address[] private targetNamesAddress;
    address private managerOwner;
    uint256 private managerFeeBps;
    mapping(address => uint256) public TargetWeight;

    IERC20 internal constant BNB_TOKEN_ADDRESS = IERC20(0x0000000000000000000000000000000000000000);
    IERC20 internal constant NON_ADDRESS = IERC20(0x0000000000000000000000000000000000000000);
    
    address public BaseToken = address(0x0000000000000000000000000000000000000000);
    string public BaseTokenName = "BNB";
    IBSCswapRouter02 bscswapRouter;
    IStdReference chainPricesFeed;

    event Received(address, uint);
    
    struct transferData {
      
      address[] targetNamesAddress;
      uint256 totalTrfAmt;
      uint256 totalUnderlying;
      uint256 qtyToTrfAToken;
    }
    
    modifier onlyxWinProtocol {
        require(
            msg.sender == protocolOwner,
            "Only xWinProtocol can call this function."
        );
        _;
    }
    
    modifier onlyxWinMaster {
        require(
            msg.sender == masterOwner,
            "Only masterOwner can call this function."
        );
        _;
    }
    
     constructor (
            string memory name,
            string memory symbol,
            address _protocolOwner,
            address _managerOwner,
            uint256 _managerFeeBps,
            address _masterOwner
        ) public ERC20(name, symbol) {
            protocolOwner = _protocolOwner; //xwindefi contract
            masterOwner = _masterOwner;
            managerOwner = _managerOwner;
            managerFeeBps = _managerFeeBps;
            _xWinMaster = xWinMaster(masterOwner);
            bscswapRouter = IBSCswapRouter02(_xWinMaster.getBSCRouterAddress());
            chainPricesFeed = IStdReference(_xWinMaster.getPriceFeedAddress());
        }
    
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    
    function swapBNBToTokens(
            address toDest,
            uint amountIn, 
            uint amountOutMin, 
            uint deadline,
            address destAddress)
    internal {
            
            address[] memory path = new address[](2);
            path[0] = bscswapRouter.WBNB();
            path[1] = toDest;
            
            bscswapRouter.swapExactBNBForTokens{value: amountIn}(amountOutMin, path, destAddress, deadline);
            
        }
        
    function swapTokenToBNB(
            address token,
            uint amountIn, 
            uint amountOutMin, 
            uint deadline,
            address destAddress)
    internal {
            
            address[] memory path = new address[](2);
            path[0] = token;
            path[1] = bscswapRouter.WBNB();
            
            IERC20(token).approve(address(bscswapRouter), amountIn);
            
            bscswapRouter.swapExactTokensForBNB(
                amountIn,
                amountOutMin,
                path,
                destAddress,
                deadline
            );
            
        }
    
    /// @dev Issue Unit to investor by xWin protocol
    function TransferToken(
        IERC20 fromToken,
        uint256 srcQty,
        address payable toAddress
        ) internal onlyxWinProtocol {

        if (fromToken != BNB_TOKEN_ADDRESS) {
            require(fromToken.approve(address(this), srcQty), "approval to srcQty failed");
            require(fromToken.transferFrom(address(this), toAddress, srcQty), "transferFrom failed"); //transfer from contract to sender to this smartcontract
        }else{
            require(transfer(toAddress, srcQty), "transfer ETH failed"); 
        }
    }
    
    function GetFundDataAll() external view returns (
          IERC20 _baseToken,
          address[] memory _targetNamesAddress,
          address _managerOwner,
          uint256 totalUnitB4,
          uint256 baseBalance,
          uint256 unitprice,
          uint256 fundvalue,
          string memory fundName,
          string memory symbolName,
          uint256 managerFee
        ){
            return (
                IERC20(BaseToken), 
                targetNamesAddress, 
                managerOwner, 
                totalSupply(), 
                address(this).balance, 
                this.getUnitPrice(), 
                this.getFundValues(),
                name(),
                symbol(),
                managerFeeBps
            );
    }
   

    /// @dev Get token balance
    function getBalance(address fromAdd) external view returns (uint256){
        
        if(fromAdd == address(NON_ADDRESS)) return 0;
        if(IERC20(fromAdd) == BNB_TOKEN_ADDRESS) return address(this).balance;
        return IERC20(fromAdd).balanceOf(address(this));
    }

    /// @dev return target amount based on weight of each token in the fund
    function getTargetWeightQty(address targetAdd, uint256 srcQty) external view returns (uint256){
        return TargetWeight[targetAdd].mul(srcQty).div(10000);
    }
    
    /// @dev return weight of each token in the fund
    function getTargetWeight(address addr) external view returns (uint256){
        return TargetWeight[addr];
    }
 
    /// @dev return number of target names
    function CreateTargetNames(
        address[] calldata _toAddresses, 
        uint256[] calldata _targetWeight
    ) external onlyxWinProtocol payable {

        if(targetNamesAddress.length > 0){
            for (uint i = 0; i < targetNamesAddress.length; i++) {
                TargetWeight[targetNamesAddress[i]] = 0;
            }
            delete targetNamesAddress;
        }
        
        for (uint i = 0; i < _toAddresses.length; i++) {
            TargetWeight[_toAddresses[i]] = _targetWeight[i];
            targetNamesAddress.push(_toAddresses[i]);
        }
    }

    /// @dev update manager owner
    function updateManager(address newManager) external onlyxWinMaster payable {
        managerOwner = newManager;
    }
    
    /// @dev update manager fee
    function updateManagerFee(uint256 newFeebps) external onlyxWinMaster payable {
        managerFeeBps = newFeebps;
    }
    
    /// @dev return target address
    function getWhoIsManager() external view returns(address){
        return managerOwner;
    }
    
    /// @dev return target address
    function getManagerFee() external view returns(uint256){
        return managerFeeBps;
    }

    /// @dev return unit price
    function getUnitPrice()
        external view returns(uint256){
        
        uint256 totalValueB4 = this.getFundValues();
        if(totalValueB4 == 0) return 0;
        uint256 totalUnitB4 = totalSupply();
    	if(totalUnitB4 == 0) return 0;
        return totalValueB4.mul(1e18).div(totalUnitB4).mul(1000);
    }
    
    /**
     * Returns the latest price
     */
    function getLatestPrice(address _targetAdd) external view returns (uint256) {
        
        //string memory fromToken = tokenNamesString[_targetAdd];
        string memory fromToken = _xWinMaster.getTokenName(_targetAdd);
        IStdReference.ReferenceData memory data = chainPricesFeed.getReferenceData(fromToken, BaseTokenName);
        return data.rate;
    }
    
    /// @dev return fund total value in ETH
    function getFundValues() external view returns (uint256){
        
        //get ETH value first if any
        uint256 totalValue = address(this).balance;
        for (uint i = 0; i < targetNamesAddress.length; i++) {
            uint256 tokenBalance = this.getBalance(targetNamesAddress[i]);
            if(tokenBalance > 0){
                uint256 price = this.getLatestPrice(targetNamesAddress[i]); //price from token to ETH
                uint256 subValue = tokenBalance.mul(uint256(price)).div(1e18);
                totalValue = totalValue.add(subValue);
            }
        }
        return totalValue; 
    }
    
    /// @dev return token value in ETH
    function getTokenValues(address tokenaddress) external view returns (uint256){
        
        uint256 tokenBalance = this.getBalance(tokenaddress);
        uint256 price = this.getLatestPrice(tokenaddress); //price from token to ETH
        return tokenBalance.mul(uint256(price)).div(1e18);
    }
    
    /// @dev perform rebalance with new weight
    function RebalanceV2(
        xWinLib.TradePairData[] calldata _tradePairDataOverweight,
        xWinLib.TradePairData[] calldata _tradePairDataUnderweight,
        uint256 deadline
        ) external onlyxWinProtocol payable {
        
        //sell over weight name
        for (uint i = 0; i < _tradePairDataOverweight.length; i++) {
            require(IERC20(_tradePairDataOverweight[i].tokenAddress).approve(address(this), _tradePairDataOverweight[i].amountIn), "approval to tokenBalance failed");
            swapTokenToBNB(_tradePairDataOverweight[i].tokenAddress, _tradePairDataOverweight[i].amountIn, _tradePairDataOverweight[i].amountOutMin, deadline, address(this));
        }
        
        // buy under weight name
        for (uint i = 0; i < _tradePairDataUnderweight.length; i++) {
            swapBNBToTokens(_tradePairDataUnderweight[i].tokenAddress, _tradePairDataUnderweight[i].amountIn, _tradePairDataUnderweight[i].amountOutMin, deadline, address(this));
        }
    }
    
    /// @dev perform subscription based on ratio setup and put into lending if available 
    function Subscribe(
        xWinLib.TradePairData[] calldata _tradePairData,
        address payable _investorAddress,
        uint256 _subsAmt,
        uint256 deadline
        ) external onlyxWinProtocol payable {
        
        require(targetNamesAddress.length > 0, "no target setup");
        require(targetNamesAddress.length == _tradePairData.length, "target no match");
        
        (uint256 mintQty, uint256 fundvalue) = getMintQty(_subsAmt);
        _mint(_investorAddress, mintQty);
        
        uint256 totalSubs = address(this).balance;
        
        if(!isSmallSubs(fundvalue, totalSubs)){
            for (uint i = 0; i < _tradePairData.length; i++) {
                uint256 proposalQty = this.getTargetWeightQty(_tradePairData[i].tokenAddress, totalSubs);
                if(proposalQty > 0){
                    swapBNBToTokens(_tradePairData[i].tokenAddress, proposalQty, _tradePairData[i].amountOutMin, deadline, address(this));
                }
            }
        }
    }
    
    /// @dev perform redemption based on unit redeem
    function Redeem(
        address payable _investorAddress,
        xWinLib.TradePairData[] calldata _tradePairData,
        uint256 redeemUnit,
        bool _returnInBase,   
        uint256 deadline
        ) external onlyxWinProtocol payable {
        
        uint256 totalBaseBal = address(this).balance;
        uint256 redeemratio = redeemUnit.mul(10000).div(totalSupply());
            
        _burn(msg.sender, redeemUnit);

	    // refund BNB based on ratio
	    if(totalBaseBal > 0){
            _investorAddress.transfer(redeemratio.mul(totalBaseBal).div(10000));
	    }
	    //start to transfer back to investor based on the targets
        for (uint i = 0; i < _tradePairData.length; i++) {
            transferData memory _transferData = getTransferAmt(_tradePairData[i].tokenAddress, redeemratio);
            
            if(_transferData.totalTrfAmt > 0){
                if(!_returnInBase){
                    TransferToken(IERC20(_tradePairData[i].tokenAddress), _transferData.totalTrfAmt, _investorAddress);
                }else{
                    require(IERC20(_tradePairData[i].tokenAddress).approve(address(this), _transferData.totalTrfAmt), "approval to tokenBalance failed");
                    swapTokenToBNB(_tradePairData[i].tokenAddress, _transferData.totalTrfAmt, _tradePairData[i].amountOutMin, deadline, _investorAddress);
                }
            }
        }
    }
        
    /// @dev Get token balance
    function getTransferAmt(address underyingAdd, uint256 redeemratio) 
        internal view returns (transferData memory transData) {
       
        transferData memory _transferData;
        _transferData.totalUnderlying = this.getBalance(underyingAdd); 
        uint256 qtyToTrf = redeemratio.mul(_transferData.totalUnderlying).div(10000);
        _transferData.totalTrfAmt = qtyToTrf;
        return _transferData;
    }
    
    function getMintQty(uint256 srcQty) internal view returns (uint256 mintQty, uint256 totalFundB4)  {
        
        uint256 totalFundAfter = this.getFundValues();
        totalFundB4 = totalFundAfter.sub(srcQty);
        mintQty = getNewFundUnits(totalFundB4, totalFundAfter, totalSupply());
        return (mintQty, totalFundB4);
    }
    
    /// @dev Mint unit back to investor
    function getNewFundUnits(uint256 totalFundB4, uint256 totalValueAfter, uint256 totalSupply) 
        internal pure 
        returns (uint256){
          
        if(totalValueAfter == 0) return 0;
        if(totalFundB4 == 0) return totalValueAfter.mul(1000);

        uint256 totalUnitAfter = totalValueAfter.mul(totalSupply).div(totalFundB4);
        uint256 mintUnit = totalUnitAfter.sub(totalSupply);
        
        return mintUnit;
    }
    
    
    function isSmallSubs(uint256 fundvalue, uint256 subsAmt) 
        internal pure returns (bool)  {
        
        if(fundvalue == 0) return false;
        uint256 percentage = subsAmt.mul(10000).div(fundvalue);
        
        //if more than 5% to the fund, consider not small
        if(percentage > 500) return false;
        
        return true;
    }
    

}