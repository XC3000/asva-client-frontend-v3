import Web3 from "web3";
import { web3Configuration } from "./rpcConfig";
import { convertToEther } from "../helpers/convertDecimals";
import STAKINGABI from "../config/abi/pools.json";

// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// const web3 = new Web3(
//   "https://speedy-nodes-nyc.moralis.io/31649378acd900255d51e632/polygon/mainnet" ||
//     Web3.givenProvider
// );

// let ABI = [];

// let web3;

// if (currentEnvironment === "development") {
//   ABI = NEWABI;
//   web3 = new Web3(
//     "https://matic.getblock.io/testnet/?api_key=11e35fe6-558a-4850-b56c-7e6cf1ea27ff" ||
//       Web3.givenProvider
//   );
// } else if (currentEnvironment === "production") {
//   ABI = MAINNETABI;
//   web3 = new Web3(
//     "https://speedy-nodes-nyc.moralis.io/31649378acd900255d51e632/bsc/mainnet" ||
//       Web3.givenProvider
//   );
// }

let web3 = "";

export class web3Class {
  constructor(contractDetails) {
    this.contractAddress = contractDetails.contractAddress;
    contractDetails.networkId = 56;
    web3 = new Web3(
      web3Configuration[contractDetails.networkId].rpc || Web3.givenProvider
    );
    this.contractInstance = new web3.eth.Contract(
      STAKINGABI,
      contractDetails.contractAddress
    );
  }

  getTotalRewardToken() {
    return new Promise(async (resolve, reject) => {
      try {
        const contractData = await this.contractInstance.methods
          .totalRewardToken()
          .call();
        // console.log(contractData);

        const value = await convertToEther(contractData, 18);

        resolve(parseFloat(parseFloat(value).toFixed(2)));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getTotalTokenStaked() {
    return new Promise(async (resolve, reject) => {
      try {
        const contractData = await this.contractInstance.methods
          .totalTokenStaked()
          .call();

        // console.log(contractData);

        const value = await convertToEther(contractData, 18);
        resolve(parseFloat(parseFloat(value).toFixed(2)));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getRewardPercent() {
    return new Promise(async (resolve, reject) => {
      try {
        const contractData = await this.contractInstance.methods
          .rewardPercent()
          .call();

        // console.log(contractData);

        // const value = await convertToEther(contractData, 18);
        // console.log(value);

        let value = parseFloat(parseFloat(contractData).toFixed(2));
        resolve(value);
        // resolve(parseFloat(parseFloat(value).toFixed(2)));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getRewardInterval() {
    return new Promise(async (resolve, reject) => {
      try {
        const contractData = await this.contractInstance.methods
          .rewardInterval()
          .call();

        // console.log(contractData);

        // const value = await convertToEther(contractData, 18);
        // console.log(value);

        let value = parseFloat(parseFloat(contractData).toFixed(2));
        resolve(value);
        // resolve(parseFloat(parseFloat(value).toFixed(2)));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getLockingPeriod() {
    return new Promise(async (resolve, reject) => {
      try {
        const contractData = await this.contractInstance.methods
          .rewardInterval()
          .call();

        const value = contractData / (60 * 60 * 24);

        resolve(value);
        // resolve(parseFloat(parseFloat(value).toFixed(2)));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  rewardInterval;
}
