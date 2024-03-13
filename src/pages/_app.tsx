import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import wagmiClient from "../utils/wagmi";
import { chains } from "../utils/wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        theme={lightTheme({
          accentColor: "#732fff",
          borderRadius: "large",
          overlayBlur: "small",
          fontStack: "system",
        })}
        chains={chains}
      >
        <Header />
        <div className="min-h-[calc(100vh-68px)] pt-16 px-2 sm:px-4">
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </div>
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
