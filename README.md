# mintfolio

It is basic implementation of ERC721 with multi-chain support using rainbowkit. Mintfolio provides simple and easy user interface to mint the NFT and get all NFT balance at one place behind the scenes multi-call is made using a Moralis API which fetches NFT balance from cross-chain. The smart conract is deployed on Shardeum Liberty 2.1 and integrated with frontend using wagmi. 

<img width="1422" alt="mintfolio" src="https://user-images.githubusercontent.com/79443588/233185557-d6c653d2-9fc0-40f7-bc7f-2706db6cdaa4.png">

## Prerequisites

Every user must have Metamask wallet to interact with this product. Checkout how to create Metamask wallet from [here](https://polygon.technology/blog/getting-started-with-metamask-on-polygon). To use this platform, you can add the Shardeum network from [here](https://docs.shardeum.org/network/endpoints). 

Follow the instructions for local environment: The user must have Node.js and npm to run this platform. Just download Node.js from [here](https://nodejs.org/en/download/).

### Setup Instructions

Clone the repo via CLI:

```sh
git clone https://github.com/smitsgithub/mintfolio.git
cd mintfolio
```

Install the required packages:

```sh
npm install
yarn install   #or
```

In the project directory, you can run:

```sh
npm run dev
yarn dev   #or
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
