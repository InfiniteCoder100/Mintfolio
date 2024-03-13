// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YourERC721Contract is ERC721, Ownable {
    uint256 public maxSupply;
    uint256 public cost;
    uint256 public maxMintAmount;
    uint256 public nftPerAddressLimit;
    string public baseURI;
    string public baseExtension;
    string public notRevealedUri;
    bool public revealed;
    bool public paused;
    bool public onlyWhitelisted;
    uint256 public totalTokensMinted;

    mapping(address => uint256) public addressMintedBalance;
    mapping(address => bool) public whitelistedAddresses;

    event SetBaseURI(string indexed newBaseURI);
    event SetBaseExtension(string indexed newBaseExtension);
    event SetNotRevealedURI(string indexed notRevealedURI);
    event SetCost(uint256 indexed newCost);
    event SetmaxMintAmount(uint256 indexed newmaxMintAmount);
    event SetNftPerAddressLimit(uint256 indexed limit);
    event SetOnlyWhitelisted(bool indexed state);
    event Mint(address indexed to, uint256 indexed tokenId);
    event Paused(bool indexed state); // renamed event to avoid conflict
    event ContractOwnershipTransferred(address indexed previousOwner, address indexed newOwner); // renamed event to avoid conflict

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        address _initialOwner
    ) ERC721(_name, _symbol) Ownable(_initialOwner) {
        baseURI = _initBaseURI;
        baseExtension = ".json";
        notRevealedUri = _initNotRevealedUri;
        revealed = false;
        paused = false;
        onlyWhitelisted = false;
    }

    function mint(uint256 _mintAmount) public payable {
        require(!paused, "Minting is paused");
        require(!onlyWhitelisted || whitelistedAddresses[msg.sender], "You're not whitelisted");
        require(!revealed, "Sale has ended");
        require(addressMintedBalance[msg.sender] + _mintAmount <= nftPerAddressLimit, "Exceeds address mint limit");
        require(totalTokensMinted + _mintAmount <= maxSupply, "Exceeds max supply");
        require(msg.value == cost * _mintAmount, "Incorrect Ether value");

        for (uint256 i = 0; i < _mintAmount; i++) {
            uint256 tokenId = totalTokensMinted + i;
            _safeMint(msg.sender, tokenId);
            emit Mint(msg.sender, tokenId);
        }

        totalTokensMinted += _mintAmount;
        addressMintedBalance[msg.sender] += _mintAmount;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
        emit SetBaseURI(_newBaseURI);
    }

    function setBaseExtension(string memory _newBaseExtension) external onlyOwner {
        baseExtension = _newBaseExtension;
        emit SetBaseExtension(_newBaseExtension);
    }

    function setNotRevealedURI(string memory _notRevealedURI) external onlyOwner {
        notRevealedUri = _notRevealedURI;
        emit SetNotRevealedURI(_notRevealedURI);
    }

    function setCost(uint256 _newCost) external onlyOwner {
        cost = _newCost;
        emit SetCost(_newCost);
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) external onlyOwner {
        maxMintAmount = _newmaxMintAmount;
        emit SetmaxMintAmount(_newmaxMintAmount);
    }

    function setNftPerAddressLimit(uint256 _limit) external onlyOwner {
        nftPerAddressLimit = _limit;
        emit SetNftPerAddressLimit(_limit);
    }

    function setOnlyWhitelisted(bool _state) external onlyOwner {
        onlyWhitelisted = _state;
        emit SetOnlyWhitelisted(_state);
    }

    function pause(bool _state) external onlyOwner {
        paused = _state;
        emit Paused(_state);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function whitelistUsers(address[] calldata _users) external onlyOwner {
        for (uint256 i = 0; i < _users.length; i++) {
            whitelistedAddresses[_users[i]] = true;
        }
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit ContractOwnershipTransferred(owner(), newOwner);
        _transferOwnership(newOwner);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
