import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "sepolia",
  networks: {
    goerli: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    }
  },
  solidity: "0.8.9",
  etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`
	}
};

export default config;
