import BigNumber from "bignumber.js/bignumber";
import web3 from "web3";

// Convert amount into decimal :
export const convertToDecimal = (amount, decimal = 18) => {
  // Not working for value = 1000 18 decimals
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof amount !== "string") amount = amount.toString();
      const _amount = !amount ? "0" : amount;
      if (decimal === 18) {
        let value = await web3.utils.toWei(amount);
        resolve(value);
      } else {
        let value = new BigNumber(_amount)
          .times(new BigNumber(10).pow(decimal))
          .toString();
        resolve(value);
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Convert decimal into Ether:
export const convertToEther = (amount, decimal = 18) => {
  return new Promise(async (resolve, reject) => {
    // if (typeof amount !== "string") amount = amount.toString();
    const _amount = !amount ? "0" : amount;
    if (decimal === 18) {
      // amount = parseFloat(amount);
      let value = await web3.utils.fromWei(amount);
      resolve(value);
    } else {
      try {
        const value = await new BigNumber(_amount)
          .dividedBy(new BigNumber(10).pow(decimal))
          .toString();

        resolve(value);
      } catch (error) {
        reject(error);
      }
    }
  });
};

export const trySwitchConvert = (amount, decimals) => {
  return web3.utils.toWei(amount, decimals);
};
