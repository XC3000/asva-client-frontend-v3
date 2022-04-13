import { useState, useEffect } from "react";
import { fetchAccountDetails, getChainId } from "../Web3/web3";

const useNetworkChange = () => {
  const [networkId, setNetworkId] = useState(undefined);
  useEffect(() => {
    if (window.ethereum !== undefined)
      window.ethereum.on("networkChanged", async (networkId) => {
        // console.log("networkChanged", networkId);
        if (parseFloat(networkId) === 1) {
          let chainId = await getChainId();
          setNetworkId(parseFloat(chainId));
        } else setNetworkId(parseFloat(networkId));
      });

    const getNetwork = async () => {
      let data = await fetchAccountDetails();
      if (parseFloat(data.connection.networkId) === 1) {
        let chainId = await getChainId();
        setNetworkId(parseFloat(chainId));
        return;
      }
      setNetworkId(parseFloat(data.connection.networkId));
    };

    getNetwork();
  }, []);
  return networkId;
};

export default useNetworkChange;
