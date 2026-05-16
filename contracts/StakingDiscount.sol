// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract StakingDiscount is Ownable, Pausable, ReentrancyGuard, ERC721Holder {
    IERC721 public achievementNFT;

    struct StakeInfo {
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => StakeInfo) public stakedNFTs;
    mapping(address => uint256[]) public userStakes;
    mapping(address => uint256) public stakedCount;

    uint256 public constant LEVEL_1 = 1;
    uint256 public constant LEVEL_2 = 3;
    uint256 public constant LEVEL_3 = 5;

    uint256 public constant DISCOUNT_LEVEL_1 = 10;
    uint256 public constant DISCOUNT_LEVEL_2 = 25;
    uint256 public constant DISCOUNT_LEVEL_3 = 40;

    event NFTStaked(address indexed user, uint256 indexed tokenId);
    event NFTUnstaked(address indexed user, uint256 indexed tokenId);

    constructor(address _achievementNFT) Ownable(msg.sender) {
        require(_achievementNFT != address(0), "Zero NFT address");
        achievementNFT = IERC721(_achievementNFT);
    }

    function stake(uint256 _tokenId) external nonReentrant whenNotPaused {
        require(
            achievementNFT.ownerOf(_tokenId) == msg.sender,
            "Not the owner"
        );
        require(
            achievementNFT.getApproved(_tokenId) == address(this) ||
                achievementNFT.isApprovedForAll(msg.sender, address(this)),
            "Contract not approved"
        );

        achievementNFT.safeTransferFrom(msg.sender, address(this), _tokenId);

        stakedNFTs[_tokenId] = StakeInfo({
            owner: msg.sender,
            timestamp: block.timestamp
        });

        userStakes[msg.sender].push(_tokenId);
        stakedCount[msg.sender]++;
        emit NFTStaked(msg.sender, _tokenId);
    }

    function unstake(uint256 _tokenId) external nonReentrant {
        require(stakedNFTs[_tokenId].owner == msg.sender, "Not the staker");

        delete stakedNFTs[_tokenId];
        stakedCount[msg.sender]--;
        _removeFromUserStakes(msg.sender, _tokenId);

        achievementNFT.safeTransferFrom(address(this), msg.sender, _tokenId);
        emit NFTUnstaked(msg.sender, _tokenId);
    }

    function unstakeAll() external nonReentrant {
        uint256[] memory stakes = userStakes[msg.sender];
        uint256 len = stakes.length;
        require(len > 0, "No stakes");

        for (uint256 i = len; i > 0; i--) {
            uint256 tokenId = stakes[i - 1];
            delete stakedNFTs[tokenId];
            achievementNFT.safeTransferFrom(address(this), msg.sender, tokenId);
            emit NFTUnstaked(msg.sender, tokenId);
        }
        delete userStakes[msg.sender];
        stakedCount[msg.sender] = 0;
    }

    function _removeFromUserStakes(address _user, uint256 _tokenId) internal {
        uint256[] storage stakes = userStakes[_user];
        uint256 len = stakes.length;
        for (uint256 i = 0; i < len; i++) {
            if (stakes[i] == _tokenId) {
                stakes[i] = stakes[len - 1];
                stakes.pop();
                break;
            }
        }
    }

    function getDiscount(address _user) external view returns (uint256) {
        uint256 count = stakedCount[_user];
        if (count >= LEVEL_3) return DISCOUNT_LEVEL_3;
        if (count >= LEVEL_2) return DISCOUNT_LEVEL_2;
        if (count >= LEVEL_1) return DISCOUNT_LEVEL_1;
        return 0;
    }

    function getUserStakes(address _user)
        external
        view
        returns (uint256[] memory)
    {
        return userStakes[_user];
    }

    function getStakeInfo(uint256 _tokenId)
        external
        view
        returns (StakeInfo memory)
    {
        return stakedNFTs[_tokenId];
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
