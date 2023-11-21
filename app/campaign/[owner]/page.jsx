"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import Campaign from "../../../artifacts/contracts/Campaign.sol/Campaign.json"
// import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json';

const Page = () => {

    const { owner } = useParams()

    // const getStaticPaths = async () =>{
    //     const provider = new ethers.providers.JsonRpcProvider(
    //         process.env.NEXT_PUBLIC_RPC_URL
    //     )

    //     const contract = new ethers.Contract(
    //         process.env.NEXT_PUBLIC_ADDRESS,
    //         CampaignFactory.abi,
    //         provider
    //     )

    //     const getAllCampaigns = contract.filters.campaignCreated()
    // } 

    const [amount, setAmount] = useState(0.00)

    useEffect(() => {
        async function request() {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = Web3provider.getSigner();
            const Address = await signer.getAddress();

            const provider = new ethers.providers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_RPC_URL
              );
            
              const contract = new ethers.Contract(
                owner,
                Campaign.abi,
                provider
              );


              const MyDonations = contract.filters.donated(Address);
              const MyAllDonations = await contract.queryFilter(MyDonations);
        
              setMydonations(MyAllDonations.map((e) => {
                return {
                  donar: e.args.donar,
                  amount: ethers.utils.formatEther(e.args.amount),
                  timestamp : parseInt(e.args.timestamp)
                }
              }));
        
              setStory(storyData);
        }

        request()
    },[owner])


    const onChange = (e) => {
        setAmount(e.target.value)
    }

    return ( 
        <div className="mx-auto grid grid-cols-2 gap-10 p-20">
            <div className="mx-auto p-4" >
                <Image 
                    height={200}
                    width={200}
                    src = "https://res.cloudinary.com/dt1ft3ssm/image/upload/v1692081505/cld-sample-4.jpg"
                    alt = "title image"
                    className="w-full object-contain p-4"
                />
                <p className="p-10 font-sans text-md text-black font-semibold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam qui repellat debitis! Aliquam ab optio aspernatur sit! Ducimus, voluptatem quaerat. Officiis reiciendis atque error quaerat cupiditate porro harum voluptatum ratione!
                </p>
            </div>
            <div className="mx-auto p-4 w-full space-y-2">
                <h2 className=" font-bold text-2xl text-start">Need Funds for surgery</h2>
                <div className="w-full grid grid-cols-2 gap-4 p-6">
                    <Input
                                id={"amount"}
                                type={"number"}
                                value={amount}
                                onChange={onChange}
                                placeholder="Enter the Amount to Donate"
                    />
                    <div className="w-full">
                        <Button 
                            text="Donate"
                        />
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-4 p-2">
                    <div className="p-2 bg-black text-white font-semibold text-lg flex flex-col justify-center items-center rounded-lg">
                        <h2>Required Amount</h2>
                        <p>100.0 Matic</p>
                    </div>
                    <div className="p-2 bg-black text-white font-semibold text-lg flex flex-col justify-center items-center rounded-lg">
                        <h2>Received Amount</h2>
                        <p>0.0 Matic</p>
                    </div>
                </div>
                <div className="h-60 bg-black rounded-lg overflow-auto">
                    <p className="w-full bg-green-300 text-black font-semibold text-center text-md p-1">RECENT DONATION</p>
                    <ul className="p-1 space-y-1">
                        <li className="w-full bg-gray-600 text-white flex justify-between items-center p-2 shadow-lg gap-4">
                            <h2 className="font-semibold w-1/3 text-ellipsis text-center">Owner</h2>
                            <h2 className="font-semibold w-1/3 text-ellipsis text-center">Owner</h2>
                            <h2 className="font-semibold w-1/3 text-ellipsis text-center">Owner</h2>
                        </li>
                    </ul>
                </div>
                <div className="h-60 bg-black rounded-lg">
                    <p className="w-full bg-green-300 text-black font-semibold text-center text-md p-1">MY PAST DONATION</p>
                </div>
            </div>
        </div>
     );
}
 
export default Page;