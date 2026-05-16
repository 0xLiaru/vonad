// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract UserProgress is Ownable, Pausable {
    struct ModuleCompletion {
        string topicName;
        string moduleName;
        uint256 completedAt;
    }

    mapping(address => ModuleCompletion[]) private _userProgress;
    mapping(address => uint256) public modulesCompleted;
    mapping(address => uint256) public topicsCompleted;
    mapping(address => mapping(string => bool)) public topicCompleted;

    address[] public allUsers;
    mapping(address => bool) public isUser;

    event ModuleCompleted(
        address indexed user,
        string topicName,
        string moduleName,
        uint256 timestamp,
        uint256 totalModules,
        uint256 totalTopics
    );

    constructor() Ownable(msg.sender) {}

    function completeModule(
        string calldata _topicName,
        string calldata _moduleName
    ) external whenNotPaused {
        require(bytes(_topicName).length > 0, "Empty topic name");
        require(bytes(_moduleName).length > 0, "Empty module name");
        require(bytes(_topicName).length <= 64, "Topic name too long");
        require(bytes(_moduleName).length <= 64, "Module name too long");

        if (!isUser[msg.sender]) {
            isUser[msg.sender] = true;
            allUsers.push(msg.sender);
        }

        _userProgress[msg.sender].push(
            ModuleCompletion({
                topicName: _topicName,
                moduleName: _moduleName,
                completedAt: block.timestamp
            })
        );

        modulesCompleted[msg.sender]++;

        if (!topicCompleted[msg.sender][_topicName]) {
            topicCompleted[msg.sender][_topicName] = true;
            topicsCompleted[msg.sender]++;
        }

        emit ModuleCompleted(
            msg.sender,
            _topicName,
            _moduleName,
            block.timestamp,
            modulesCompleted[msg.sender],
            topicsCompleted[msg.sender]
        );
    }

    function getUserProgress(
        address _user
    ) external view returns (ModuleCompletion[] memory) {
        return _userProgress[_user];
    }

    function getProgressCount(address _user) external view returns (uint256) {
        return _userProgress[_user].length;
    }

    function getUserCount() external view returns (uint256) {
        return allUsers.length;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
