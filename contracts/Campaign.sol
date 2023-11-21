// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Campaign {
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receiveAmount;

    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);

    constructor(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory imgURI,
        string memory storyURI,
        address CampaignOwner
     ) {
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        image = imgURI;
        story = storyURI;
        owner = payable (CampaignOwner);
    }

    function donate() public payable {
        owner.transfer(msg.value);
        receiveAmount += msg.value;
        require(receiveAmount <= requiredAmount, "required Amount is fullfilled");

        emit donated(msg.sender, msg.value, block.timestamp);
    }
}

contract CampaignFactory {

    address[] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imgURI,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory imgURI,
        string memory category,
        string memory storyURI
    ) public {
        Campaign newCampaign = new Campaign(campaignTitle, requiredCampaignAmount, imgURI, storyURI, msg.sender);

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(
            campaignTitle,
            requiredCampaignAmount,
            msg.sender, 
            address(newCampaign), 
            imgURI, 
            block.timestamp,
            category
        );
    }
}