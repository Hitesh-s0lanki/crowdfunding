const CampaignFactory = require("./artifacts/contracts/Campaign.sol/CampaignFactory.json");
const Campaign = require("./artifacts/contracts/Campaign.sol/Campaign.json");
const { ethers } = require("ethers");
require("dotenv").config({ path: "./.env.local" });

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    Campaign.abi,
    provider
  );

  // const title = await contract.title();
  // const requiredAmount = await contract.requiredAmount();
  // const image = await contract.image();
  // const storyUrl = await contract.story();
  // const owner = await contract.owner();
  // const receivedAmount = await contract.receivedAmount();

  const Donations = contract.filters.donated();
  const AllDonations = await contract.queryFilter(Donations);

  const DonationsData =  AllDonations.map((e) => {
    return {
      donar: e.args.donar,
      amount: ethers.utils.formatEther(e.args.amount),
      timestamp : parseInt(e.args.timestamp)
  }});


  // const Data = {
  //   address: "0xA85f8c4eEFe1436cA20e706C8936D36CA29b1Bf6",
  //   title, 
  //   requiredAmount: ethers.utils.formatEther(requiredAmount), 
  //   image, 
  //   receivedAmount: ethers.utils.formatEther(receivedAmount), 
  //   storyUrl, 
  //   owner,
  // } 

  console.log(DonationsData)
};

main();