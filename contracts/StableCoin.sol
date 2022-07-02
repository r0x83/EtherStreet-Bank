// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StableCoin is ERC20, Ownable {
    constructor() ERC20("Stable Coin","STBLE") {
    }

    function mint(address account, uint256 amount) onlyOwner external  returns(bool){
        _mint(account, amount);
        return true;
    }

    function burn(address account, uint256 amount) onlyOwner external returns(bool){
        _burn(account, amount);
        return true;
    }
    
}