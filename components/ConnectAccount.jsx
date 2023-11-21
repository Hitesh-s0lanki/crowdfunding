"use client";

import clsx from "clsx";
import { ethers } from "ethers";
import { useState } from "react";

const networks = {
    polygon: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Polygon Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  };
  

const ConnectAccount = () => {

    const [userAddress, setUserAddress] = useState('Connect Wallet')
    const [balance, setBalance] = useState('');

    const connectWallet = async() => {
        await window.ethereum.request({ method: "eth_requestAccounts"});
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any")

        if (provider.network !== "matic") {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  ...networks["polygon"],
                },
              ],
            });
        } 

        const account = provider.getSigner()
        const address = await account.getAddress();
        const balance = ethers.utils.formatEther(await account.getBalance());

        setUserAddress(address)
        setBalance(balance)
    }

    return ( 
        <div onClick={connectWallet} className="cursor-pointer max-w-xs flex gap-2 items-center justify-center flex-wrap overflow-hidden ">
            <p className={clsx("text-ellipsis",balance && " w-2/3")}>{userAddress}</p>
            {balance && <p>{balance.slice(0,3)} Matic</p>}
        </div>
     );
}
 
export default ConnectAccount;