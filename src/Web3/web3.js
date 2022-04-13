import Web3 from "web3";
import { web3Configuration } from "./rpcConfig";

let web3 = new Web3(Web3.givenProvider);

// let contractInstance = "";

// export const web3Initialise = (details) => {
//   return new Promise(async (resolve) => {
//     web3 = await new Web3(
//       Web3.givenProvider || web3Configuration[details.networkId].rpc
//     );

//     resolve(true);
//   });
// };

export const fetchAccountDetails = () => {
  return new Promise(async (resolve, reject) => {
    const account = await web3.eth.requestAccounts();
    if (account.length < 1) {
      const notificaton = {
        message: "No Account Found",
        error: true,
      };
      reject(notificaton);
    } else {
      const details = {
        account: {
          address: account[0],
          balance: await web3.eth.getBalance(account[0]),
          isWhiteListed: false,
        },
        connection: {
          isConnected: true,
          network: await web3.eth.net.getNetworkType(),
          networkId: await web3.eth.net.getId(),
        },
        notification: {
          message: `BSC Testnet Network Connected`,
          error: false,
        },
      };
      resolve(details);
    }
  });
};

export function getChainId() {
  return new Promise(async (resolve, reject) => {
    try {
      let id = await web3.eth.getChainId();
      resolve(id);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
