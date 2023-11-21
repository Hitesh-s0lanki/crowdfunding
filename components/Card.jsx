import Image from "next/image";
import { Contact2, CircleDollarSign ,Calendar } from 'lucide-react';
import Button from "./Button";
import { useRouter } from "next/navigation";

const Card = ({
    title,
    imgURI,
    owner,
    timestamp,
    amount
}) => {

    const router = useRouter()

    const goToCampaign = () => {
        router.push(`/campaign/${owner}`)
    } 

    return ( 
        <div className="w-full bg-slate-100 flex text-start flex-col gap-1 p-1 rounded-lg shadow-lg hover:-translate-y-5 hover:-translate-x-2">
            <Image 
                height={400}
                width={400}
                src = "https://res.cloudinary.com/dt1ft3ssm/image/upload/v1692081505/cld-sample-4.jpg"
                alt = "title image"
                className="w-full object-contain"
            />
            <h2 className="text-start font-semibold text-lg p-2 rounded-lg shadow-lg">{title}</h2>
            <div className="flex justify-between items-center shadow-lg p-2 w-full">
                <h2 className="font-semibold text-lg rounded-lg flex items-center gap-1 justify-center">Owner <Contact2 /></h2>
                <p className="w-1/3 text-ellipsis">{owner}</p>
            </div>
            <div className="flex justify-between items-center shadow-lg p-2">
                <h2 className="font-semibold text-lg rounded-lg flex items-center gap-1 justify-center">Amount <CircleDollarSign /></h2>
                <p className="w-1/3 text-ellipsis text-end">{parseInt(amount)} Matic</p>
            </div>
            <div className="flex justify-between items-center shadow-lg p-2">
                <h2 className="font-semibold text-lg rounded-lg flex items-center gap-1 justify-center"><Calendar /></h2>
                <p className="w-2/3 text-ellipsis text-end">{new Date(parseInt(timestamp * 1000)).toLocaleString()}</p>
            </div>
            <div onClick={goToCampaign} className="w-full">
                <Button 
                    text="Go to Campaign"
                />
            </div>
        </div>
     );
}
 
export default Card;