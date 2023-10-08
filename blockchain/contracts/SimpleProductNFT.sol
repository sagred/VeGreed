// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleProductNFT is ERC721 {
    uint256 public tokenCounter;

    mapping(uint256 => string) public tokenURIs;

    constructor() ERC721("SimpleProductNFT", "SPNFT") {
        tokenCounter = 0;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter = tokenCounter + 1;
        return newTokenId;
    }

    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        tokenURIs[tokenId] = _tokenURI;
    }

    function burn(uint256 tokenId) public virtual {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "SimpleProductNFT: caller is not owner nor approved"
        );
        _burn(tokenId);
    }
}
