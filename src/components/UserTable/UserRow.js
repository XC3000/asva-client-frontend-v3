import { Td, Tr } from "@chakra-ui/react";
import React from "react";
import copy from "copy-to-clipboard";

import { CopyIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

import "./UserRow.css"

const UserRow = ({ user }) => {
  const copyContractAddress = (tokenContractAddress) => {
    copy(tokenContractAddress);
    toast.success("Copied to Clipboard");
  };

  const formatUserAddress = (address) => {
    // return address;
    return (
      address.substr(0, 5) +
      "..." +
      address.substr(address.length - 5, address.length - 1)
    );
  };

  return (
    <Tr>
      <Td textAlign="center" minWidth="150px">
        {user.tokenOrLp} ({user.network})
      </Td>
      <Td textAlign="center" minWidth="180px">
        {formatUserAddress(user.contractAddress)}{" "}
        <CopyIcon onClick={() => copyContractAddress(user.contractAddress)} />
      </Td>
      <Td textAlign="center">{user.lockingPeriod} Days</Td>
      <Td textAlign="center">{user.apr}</Td>
      <Td textAlign="center">{user.totalRewardsToken.toLocaleString()}</Td>
      <Td textAlign="center" background="#fff1f3">{user.rewardsRemaining.toLocaleString()}</Td>
      <Td textAlign="center">{user.totalTokenStaked.toLocaleString()}</Td>
      <Td textAlign="center" background="#fff1f3">
        {(user.rewardsRemaining / ((user.rewardPercent / 100) * 0.01)).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0} )}
      </Td>
    </Tr>
  );
};

export default UserRow;
