// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

contract ProductNFT is ERC721A {
    constructor() ERC721A("VeGreed", "VGRD") {}

    function mint(uint256 quantity) external payable {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(msg.sender, quantity);
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId, true);
    }
}
