//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./StableCoin.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EtherVault is Ownable{

    struct Vault{
        uint256 etherCollateral;
        uint256 tokenDebt;
    }

    mapping (address => Vault) vaultBalance;
   
    StableCoin public token;
    AggregatorV3Interface public priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */

    event Deposit(uint deposit, uint mint);
    event Withdraw(uint withdraw, uint burn);
    constructor(StableCoin _token){
        token = _token;
        priceFeed = AggregatorV3Interface(0x04c5046A1f4E3fFf094c26dFCAA75eF293932f18);
    }

    

    function depositEther(uint256 etherDeposit) payable external{
        require(etherDeposit == msg.value, "wrong amount of ether sent");
        uint256 tokenToMint = etherDeposit * getEthUSDPrice();
        token.mint(msg.sender, tokenToMint);
        vaultBalance[msg.sender].etherCollateral += etherDeposit;
        vaultBalance[msg.sender].tokenDebt += tokenToMint;
        emit Deposit(etherDeposit, tokenToMint);
    }


    function withdrawEther(uint256 repayTokenAmount) external{
        require(repayTokenAmount <= vaultBalance[msg.sender].tokenDebt, "withdraw limit exceeded");
        require(token.balanceOf(msg.sender) >= repayTokenAmount, "not enough token balance");
        uint256 etherToWithdraw = repayTokenAmount / getEthUSDPrice();
        token.burn(msg.sender, repayTokenAmount);
       
        vaultBalance[msg.sender].etherCollateral -= etherToWithdraw;
        vaultBalance[msg.sender].tokenDebt -= repayTokenAmount;
        payable(msg.sender).transfer(etherToWithdraw);
        emit Withdraw(etherToWithdraw, repayTokenAmount);
    }

    function getBalance() external view returns(Vault memory vault){
        return vaultBalance[msg.sender];
    }

    function getEthUSDPrice() public view returns(uint){
        (,int price8,,,) = priceFeed.latestRoundData(); //8 decimals 
        return uint(price8*(10*10));
    }
}