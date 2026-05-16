// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Leaderboard is Ownable {
    mapping(address => uint256) public modulesCompleted;
    mapping(address => uint256) public nftsEarned;
    mapping(address => uint256) public topicsCompleted;
    mapping(address => mapping(string => bool)) public topicCompleted;

    address[] public allUsers;
    mapping(address => bool) public isUser;

    struct Score {
        address user;
        uint256 modules;
        uint256 nfts;
        uint256 topics;
    }

    event ScoreUpdated(
        address indexed user,
        string topicName,
        string moduleName,
        uint256 modules,
        uint256 nfts,
        uint256 topics
    );

    constructor() Ownable(msg.sender) {}

    function updateScore(
        address _user,
        string calldata _topicName,
        string calldata _moduleName
    ) external {
        if (!isUser[_user]) {
            isUser[_user] = true;
            allUsers.push(_user);
        }

        modulesCompleted[_user]++;
        nftsEarned[_user]++;

        if (!topicCompleted[_user][_topicName]) {
            topicCompleted[_user][_topicName] = true;
            topicsCompleted[_user]++;
        }

        emit ScoreUpdated(
            _user,
            _topicName,
            _moduleName,
            modulesCompleted[_user],
            nftsEarned[_user],
            topicsCompleted[_user]
        );
    }

    function getScore(address _user) external view returns (Score memory) {
        return Score({
            user: _user,
            modules: modulesCompleted[_user],
            nfts: nftsEarned[_user],
            topics: topicsCompleted[_user]
        });
    }

    function getAllUsers() external view returns (address[] memory) {
        return allUsers;
    }

    function getUserCount() external view returns (uint256) {
        return allUsers.length;
    }

    function getTopUsers(uint256 _limit, uint8 _category)
        external
        view
        returns (address[] memory users, uint256[] memory scores)
    {
        uint256 total = allUsers.length;
        uint256 limit = _limit < total ? _limit : total;

        users = new address[](limit);
        scores = new uint256[](limit);

        address[] memory tempUsers = new address[](total);
        uint256[] memory tempScores = new uint256[](total);

        for (uint256 i = 0; i < total; i++) {
            address u = allUsers[i];
            tempUsers[i] = u;
            if (_category == 0) {
                tempScores[i] = modulesCompleted[u];
            } else if (_category == 1) {
                tempScores[i] = nftsEarned[u];
            } else {
                tempScores[i] = topicsCompleted[u];
            }
        }

        for (uint256 i = 0; i < limit; i++) {
            uint256 bestIdx = 0;
            uint256 bestScore = 0;
            for (uint256 j = 0; j < total; j++) {
                if (tempScores[j] > bestScore) {
                    bestScore = tempScores[j];
                    bestIdx = j;
                }
            }
            users[i] = tempUsers[bestIdx];
            scores[i] = bestScore;
            tempScores[bestIdx] = 0;
        }
    }

    /// @notice Find a user's rank in a given category (1-indexed)
    function getUserRank(address _user, uint8 _category)
        external
        view
        returns (uint256 rank, uint256 score)
    {
        uint256 userScore;
        if (_category == 0) userScore = modulesCompleted[_user];
        else if (_category == 1) userScore = nftsEarned[_user];
        else userScore = topicsCompleted[_user];

        if (userScore == 0) return (0, 0);

        uint256 higher = 0;
        uint256 total = allUsers.length;

        for (uint256 i = 0; i < total; i++) {
            address u = allUsers[i];
            uint256 s;
            if (_category == 0) s = modulesCompleted[u];
            else if (_category == 1) s = nftsEarned[u];
            else s = topicsCompleted[u];

            if (s > userScore) higher++;
        }

        return (higher + 1, userScore);
    }
}
