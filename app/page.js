"use client";

import Card from "@/components/Card";
import clsx from "clsx";
import { Webhook } from 'lucide-react';
import { useEffect, useState } from "react";

//ethers
import {ethers} from "ethers"
import CampaignFactory from "../artifacts/contracts/Campaign.sol/CampaignFactory.json"



const options = [
  "All",
  "Health",
  "Education",
  "Animal"
]

export default function Home() {

  const [navItems, setNavItems] = useState("All")

  const [items, setItems] = useState([])

  const getDataFromChain = async (category) => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ADDRESS,
      CampaignFactory.abi,
      provider
    );

    
    const getAllCampaigns = contract.filters.campaignCreated()
    const allCampaign = await contract.queryFilter(getAllCampaigns);

    const dataArray = allCampaign.map((e) => {
      return {
        title: e.args.title,
        image: e.args.imgURI,
        owner: e.args.owner,
        timeStamp: e.args.timestamp,
        amount: ethers.utils.formatEther(e.args.requiredAmount)
      }
    }) 

    return dataArray
  }

  useEffect(() => {
    async function func() {
      setItems(await getDataFromChain())
    }
    func()
  },[getDataFromChain, setItems])

  const onChange = async(category) =>{
    setNavItems(category)
  }

  return (
    <div className=" mx-32 p-10 flex flex-col gap-7">
      <nav className="w-full flex items-center gap-8">
        <div className="text-xl font-semibold">
          <Webhook />
        </div>
        {options.map((item) => (
          <div key={item} className={clsx("bg-black text-white font-semibold text-lg rounded-lg p-3 cursor-pointer hover:bg-[white] hover:text-black",navItems === item && "bg-[white] text-black")} onClick={() => onChange(item)}> 
            {item}
          </div>
        ))}
      </nav>
      <div className="w-full mx-auto grid grid-cols-3 gap-3">
        {items.map((item) => (
          <Card 
            title={item.title}
            owner={item.owner}
            imgURI={item.imgURI}
            timestamp={item.timeStamp}
            amount={item.amount}
          />
        ))}
      </div>
    </div>
  );
}
