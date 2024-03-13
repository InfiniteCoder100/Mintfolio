import Head from "next/head";
import Title from "@/components/title";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { CONTRACT_ADDRESS, abi } from "@/contract/contract";

interface BalanceCardProps {
  title: string;
  desc: number;
  icon: string;
}

const BalanceCard = ({ title, desc, icon }: BalanceCardProps) => {
  return (
    <div className="relative p-5 rounded-2xl border-2 border-purple-300/80 bg-white/30 bg-opacity-20">
      <dt className="flex flex-col items-center md:items-start">
        <div className="bg-purple-400/20 w-[60px] h-[60px] flex items-center justify-center mx-auto p-[5px] rounded-full">
          <Image
            src={icon}
            className="rounded-full overflow-hidden"
            width="15"
            height="12"
            alt="icon"
          />
        </div>
        <p className="pt-5 text-lg leading-6 mx-auto font-medium font-semibold text-[#732fff]">
          {title}
        </p>
        <p className="pt-5 text-2xl mx-auto font-medium text-[#732fff]">
          {desc}
        </p>
      </dt>
    </div>
  );
};

export default function Collection() {
  class PaginatedResponseAdapter<Result, JSONResult> {
    private jsonResponse: JSONResult;

    constructor(jsonResponse: JSONResult) {
      this.jsonResponse = jsonResponse;
    }
    getJsonResponse(): JSONResult {
      return this.jsonResponse;
    }
  }
  const [shardeumBalance, setShardeumBalance] = useState(0);
  const [sepoliaBalance, setSepoliaBalance] = useState(0);
  const [polygonMumbaiBalance, setPolygonMumbaiBalance] = useState(0);
  const account = useAccount();

  // Using multi-call of Moralis to fetch all the NFTs cross-chain
  const runApp = async () => {
    await Moralis.start({
      apiKey:
        "jix5TU2gmxHR68sJDDuWhBAkDJJ65NC9btbyvB6gKOXd6OCLhd529IlMdHVtBRia",
    });
    const allNFTBalance = [];
    const address = account.address;
    const chains = [EvmChain.MUMBAI, EvmChain.SEPOLIA];
    for (const chain of chains) {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address: address ?? "",
        chain,
      });
      allNFTBalance.push(response);
    }
    console.log(allNFTBalance);
    const adapter = new PaginatedResponseAdapter(allNFTBalance);
    const mumbaiBalance = adapter.getJsonResponse()[0].result.length;
    const sepoliaBalance = adapter.getJsonResponse()[1].result.length;
    console.log(mumbaiBalance, sepoliaBalance);
    setPolygonMumbaiBalance(mumbaiBalance);
    setSepoliaBalance(sepoliaBalance);
  };

  // Getting balance of Shardeum Liberty from the contract
  const { data: response } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "balanceOf",
    args: [account.address],
    onError: (error) => {
      console.log("Error", error);
    },
    onSuccess: (result) => {
      runApp();
      console.log("Success", result);
      console.log("response", Number(response as any));
      if (!isNaN(Number(response))) {
        setShardeumBalance(Number(response));
      }
    },
  });

  return (
    <>
      <Head>
        <title>NFT Balance</title>
        <meta name="description" content="mintfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 my-14 mx-auto max-w-[1080px]">
        <Title title="Your All NFT Balance" />
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 mt-10">
          <BalanceCard
            icon="/shardeum.jpeg"
            title="Shardeum Dev Network"
            desc={shardeumBalance}
          />
          <BalanceCard
            icon="/polygonMumbai.png"
            title="Polygon Mumbai"
            desc={polygonMumbaiBalance}
          />
          <BalanceCard
            icon="/sepolia.png"
            title="Sepolia"
            desc={sepoliaBalance}
          />
        </dl>
      </main>
    </>
  );
}
