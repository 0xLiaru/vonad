// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract AchievementNFT is ERC721URIStorage, Ownable, Pausable, ReentrancyGuard {
    uint256 private _nextTokenId;
    uint256 public mintFee = 0.001 ether;

    struct Achievement {
        string moduleName;
        string topicName;
        uint256 completedAt;
    }

    mapping(uint256 => Achievement) public achievements;
    mapping(address => uint256[]) public userTokens;

    event AchievementMinted(
        uint256 indexed tokenId,
        address indexed to,
        string moduleName,
        string topicName,
        uint256 completedAt
    );

    constructor() ERC721("Vonad Achievement", "VACH") Ownable(msg.sender) {}

    function setMintFee(uint256 _fee) external onlyOwner {
        mintFee = _fee;
    }

    function mintAchievement(
        address _to,
        string memory _moduleName,
        string memory _topicName
    ) external payable nonReentrant whenNotPaused returns (uint256) {
        require(_to != address(0), "Zero address");
        require(bytes(_moduleName).length > 0, "Empty module name");
        require(bytes(_topicName).length > 0, "Empty topic name");
        require(msg.value >= mintFee, "Insufficient mint fee");

        uint256 tokenId = ++_nextTokenId;

        achievements[tokenId] = Achievement({
            moduleName: _moduleName,
            topicName: _topicName,
            completedAt: block.timestamp
        });

        string memory uri = _generateTokenURI(tokenId);
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, uri);

        userTokens[_to].push(tokenId);

        emit AchievementMinted(tokenId, _to, _moduleName, _topicName, block.timestamp);

        return tokenId;
    }

    function getUserTokens(address _user) external view returns (uint256[] memory) {
        return userTokens[_user];
    }

    function getAchievement(uint256 _tokenId)
        external
        view
        returns (Achievement memory)
    {
        return achievements[_tokenId];
    }

    function _generateTokenURI(uint256 _tokenId)
        internal
        view
        returns (string memory)
    {
        Achievement memory a = achievements[_tokenId];

        string memory json = string(
            abi.encodePacked(
                '{"name":"Vonad Achievement #',
                Strings.toString(_tokenId),
                '","description":"Completed: ',
                a.moduleName,
                ' in ',
                a.topicName,
                '","image":"data:image/svg+xml;base64,',
                _generateSVG(a.moduleName, a.topicName, a.completedAt),
                '","attributes":[',
                '{"trait_type":"Module","value":"',
                a.moduleName,
                '"},{"trait_type":"Topic","value":"',
                a.topicName,
                '"},{"trait_type":"Completed","value":"',
                Strings.toString(a.completedAt),
                '"}]}'
            )
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(bytes(json))
            )
        );
    }

    function _generateSVG(
        string memory _module,
        string memory _topic,
        uint256 _timestamp
    ) internal pure returns (string memory) {
        return string(
            abi.encodePacked(
                Base64.encode(
                    bytes(
                        string(
                            abi.encodePacked(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">',
                                '<rect width="400" height="400" fill="#1e1b4b"/>',
                                '<text x="200" y="120" text-anchor="middle" fill="#a78bfa" font-size="24" font-family="monospace">Vonad</text>',
                                '<text x="200" y="180" text-anchor="middle" fill="#60a5fa" font-size="18" font-family="monospace">',
                                _topic,
                                '</text>',
                                '<text x="200" y="230" text-anchor="middle" fill="#e2e8f0" font-size="14" font-family="monospace">',
                                _module,
                                '</text>',
                                '<text x="200" y="280" text-anchor="middle" fill="#64748b" font-size="12" font-family="monospace">',
                                Strings.toString(_timestamp),
                                '</text>',
                                '<circle cx="200" cy="340" r="25" fill="#8b5cf6"/>',
                                '<text x="200" y="348" text-anchor="middle" fill="white" font-size="20">',
                                unicode'✓',
                                '</text>',
                                '</svg>'
                            )
                        )
                    )
                )
            )
        );
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance");
        payable(owner()).transfer(balance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
