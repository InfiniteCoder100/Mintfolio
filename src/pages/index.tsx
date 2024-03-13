import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";
import { GiWallet, GiChaingun } from "react-icons/gi";
import { SiSemanticweb } from "react-icons/si";

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: any;
}

const FeatureCard = ({ title, desc, icon }: FeatureCardProps) => {
  return (
    <div className="relative p-5 rounded-lg bg-white/40 bg-opacity-20">
      <dt className="flex flex-col items-center md:items-start">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#732fff] text-white">
          {icon}
        </div>
        <p className="pt-5 text-lg leading-6 font-medium font-semibold text-[#732fff]">
          {title}
        </p>
      </dt>
      <dd className="mt-2 text-base text-center text-gray-600 md:text-left">
        {desc}
      </dd>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>mintfolio</title>
        <meta name="description" content="mintfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px]">
        <div className="md:text-left h-[calc(100vh-60px)] flex justify-center flex-row">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block text-gray-600 xl:inline">Welcome to</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#a13bf7] to-[#732fff] pb-4">
                mintfolio
              </span>
              <span className="block font-semibold text-[#732fff] font-medium text-2xl">
                Collection of your NFTs
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Check your all NFTs from multiple chain at one place. Get your
              first NFT now!
            </p>
            <div className="mt-5 sm:mt-8 sm:flex lg:justify-start md:flex-col lg:flex-row">
              <div>
                <Link
                  href="/mintNFT"
                  className="w-full md:w-[70%] lg:w-full flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-3xl text-white bg-gradient-to-r from-[#a13bf7] to-[#7500ff] hover:drop-shadow-[0_3px_5px_#7d7d7d] md:py-2 md:text-lg md:px-8"
                >
                  Mint now
                </Link>
              </div>
            </div>
          </div>
          <div className="md:flex hidden my-auto w-[30%] md:w-[60%] ml-10 items-end">
            <Image
              src="/mintNFT.png"
              width="500"
              height="450"
              className="ml-10"
              alt="Banner"
            />
          </div>
        </div>

        <div className="pt-5 pb-20 mx-auto max-w-7xl">
          <div className="flex flex-col w-full mb-5 text-center md:mb-10">
            <h1 className="text-4xl mb-10 font-bold title-font mb-4 text-[#732fff]">
              Features
            </h1>
          </div>
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <FeatureCard
              icon={<GiWallet size={25} />}
              title="Mint Your Own NFTs"
              desc="With our easy-to-use platform, you can mint your own unique NFTs in minutes. Whether you're an artist, musician, or content creator, you can showcase your work and sell it to your fans."
            />
            <FeatureCard
              icon={<GiChaingun size={25} />}
              title="Multi-chain Support"
              desc="Our platform supports multiple chains, so you can manage all your NFTs in one place. Whether you're using Shardeum, Polygon Mumbai, or any other supported chain, you can easily keep track of your assets."
            />
            <FeatureCard
              icon={<SiSemanticweb size={25} />}
              title="Semantic UI"
              desc="Our platform features a visually appealing interface that's designed to showcase your NFTs in the best possible light. With Rainbow Kit, I've created a beautiful and engaging experience that's sure to impress the users."
            />
          </dl>
        </div>
      </main>
    </>
  );
};

export default Home;
