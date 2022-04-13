import { useEffect, useState } from "react";
import { Container, VStack } from "@chakra-ui/react";
import { Layout, Loader, UserTable } from "./components";
import { web3Class } from "./Web3/web3Class";
import apiCall from "./services/apiCall";
import "./App.scss";

function App() {
  const [loading, setLoading] = useState(false);
  const [stakingDetailsList, setStakingDetailsList] = useState([]);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalLpStaked, setTotalLpStaked] = useState(0);

  const calculateApr = (rewardPercent, lockingPeriod) => {
    let calcApr = (rewardPercent / 100 / lockingPeriod) * 365;
    calcApr = parseFloat(parseFloat(calcApr).toFixed(2));
    return calcApr;
  };

  const calculateRemaingRewards = (
    totalRewardsToken,
    totalTokenStaked,
    rewardPercent
  ) => {
    let rewardsRemaining =
      totalRewardsToken - totalTokenStaked * (rewardPercent / (100 * 100));
    // rewardsRemaining = parseFloat(parseFloat(rewardsRemaining).toFixed(2));
    return parseInt(rewardsRemaining);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let tempTotalStaked = 0,
          tempTotalLpStaked = 0;
        const { data } = await apiCall.get("/stake-pool");
        const poolList = data.data;
        for (let i = 0; i < poolList.length; i++) {
          const web3Instance = new web3Class(poolList[i]);
          const totalRewardsToken = await web3Instance.getTotalRewardToken();
          const totalTokenStaked = await web3Instance.getTotalTokenStaked();
          const rewardPercent = await web3Instance.getRewardPercent();
          const lockingPeriod = await web3Instance.getLockingPeriod();
          poolList[i].totalRewardsToken = totalRewardsToken;
          poolList[i].totalTokenStaked = totalTokenStaked;
          poolList[i].apr = calculateApr(rewardPercent, lockingPeriod);
          poolList[i].lockingPeriod = lockingPeriod;
          poolList[i].rewardPercent = rewardPercent;

          poolList[i].rewardsRemaining = calculateRemaingRewards(
            totalRewardsToken,
            totalTokenStaked,
            rewardPercent
          );

          if (poolList[i].tokenOrLp.includes("LP")) {
            tempTotalLpStaked += totalTokenStaked;
          } else {
            tempTotalStaked += totalTokenStaked;
          }
        }
        setStakingDetailsList(poolList);
        setTotalLpStaked(tempTotalLpStaked);
        setTotalStaked(tempTotalStaked);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <Loader />
      </div>
    );
  }

  return (
    <Layout>
      <div className="App">
        <VStack>
          <Container maxW="container.xl">
            <UserTable
              stakingDetailsList={stakingDetailsList}
              totalLpStaked={totalLpStaked}
              totalStaked={totalStaked}
            />
          </Container>
        </VStack>
      </div>
    </Layout>
  );
}

export default App;
