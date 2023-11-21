"use client";


import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useState } from "react";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";

import { ethers } from "ethers";
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json';
import { useRouter } from "next/navigation";


const options = [
    "Health",
    "Education",
    "Animal"
]

const page = () => {

    const [imageUploaded, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [start, setStart] = useState("Start Campaign")

    const [form, setForm] = useState({
        title:'',
        story:'',
        amount:'',
        category:'Health'
    });

    const router = useRouter()

    useState(() => {
        setIsMounted(true)
    },[])

    if(!isMounted) return null

    const handleUpload = (result) => {
        setImage(result?.info?.secure_url);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const {
            title,
            story,
            amount,
            category
        } = form;

        if(!title || !story || !amount || !category){
            toast.error("Information not complete")
            return ;
        }
        const defaultImage = "https://res.cloudinary.com/dt1ft3ssm/image/upload/v1692081505/cld-sample-4.jpg";
        

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        
        const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_ADDRESS,
            CampaignFactory.abi,
            signer
        )

        const campaignData = await contract.createCampaign(
            title,
            ethers.utils.parseEther(form.amount),
            defaultImage,
            category,
            story
        )

        await campaignData.wait()

        setStart(`Campaign Started at ${campaignData.to}`)
        toast.success("Campaign Created Successfully")
        setIsLoading(false)
        router.push('/')
    }

    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    return ( 
        <form onSubmit={onSubmit} className="p-10 w-full flex items-center justify-center border-3">
            <Loading  visible={isLoading} />
            <div className="grid grid-cols-2 gap-3 mx-auto w-5/6 h-40">
                <div className="flex flex-col gap-4" >
                    <Input
                        id={"title"}
                        type={"text"}
                        value={form.title}
                        onChange={onChange}
                        disabled={isLoading}
                        placeholder="Campaign Title"
                    />
                    <textarea 
                        name="story"
                        value={form.story}
                        onChange={onChange}
                        placeholder="Describe your story"
                        className="w-full h-[500px] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-600 text-xl rounded-md border-0 p-3"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4" >
                        <Input
                            id={"amount"}
                            type={"number"}
                            value={form.amount}
                            onChange={onChange}
                            disabled={isLoading}
                            placeholder="Required Amount"
                        />
                        <Select 
                            name="category"
                            onChange={onChange}
                            value={form.category}
                            options={options}
                        />
                    </div>
                    <div className="bg-white rounded-md font-semibold flex justify-center items-center text-xl p-5">
                        {!imageUploaded && (
                            <CldUploadButton
                                uploadPreset="l2pckmgu"
                                options={{ maxFiles: 1 }}
                                onUpload={handleUpload}
                            >
                            </CldUploadButton>
                        )}
                        {imageUploaded &&(
                            <div className="flex items-center justify-between">
                                <h2 className="p-5 font-semibold ">Image Uploaded</h2>
                                <div className="p-2" onClick={() => setImage('')}>
                                    <Button text="Cancel" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* <Button
                        text={"Upload Files to IPES"}
                    /> */}
                    <Button
                        type="submit"
                        text={start}
                    />
                </div>
            </div>
        </form>
     );
}
 
export default page;