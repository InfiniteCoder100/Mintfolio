import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { polygonMumbai, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Chain } from "@rainbow-me/rainbowkit";

const shardeum: Chain = {
  id: 8081,
  name: "Shardeum",
  network: "Shardeum Dev Network",
  nativeCurrency: {
    decimals: 18,
    name: "Shardeum",
    symbol: "SHM",
  },
  iconUrl:
    "https://bafkreic7ujchsg65vi7b26vkititbq2k3fddwhcutq3fpmraxj4sfjhyli.ipfs.nftstorage.link",
  rpcUrls: {
    default: {
      http: ["https://hackathon.shardeum.org/"],
    },
    public: {
      http: ["https://hackathon.shardeum.org/"],
    },
  },
  testnet: true,
};

export const { chains, provider } = configureChains(
  [shardeum, polygonMumbai, sepolia],
  [
    alchemyProvider({ apiKey: "4F6oTb7aJNGKrmj3HYMP1E0ITsP3ZZER" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "mintfolio",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default wagmiClient;
