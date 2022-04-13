import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Stack,
  Button,
  Heading,
  HStack,
} from "@chakra-ui/react";
import UserRow from "./UserRow";

const UserTable = ({ stakingDetailsList, totalLpStaked, totalStaked }) => {
  return (
    <>
      <Heading as="h4" size="lg" isTruncated mb={4} textAlign="center">
        Stake and LP Dashboard
      </Heading>
      <HStack spacing="24px" mt={6} mb={6} justifyContent="center">
        <Heading as="h5" size="md">
          Total Staked: {totalStaked.toLocaleString()}
        </Heading>

        <Heading as="h5" size="md">
          Total LP Staked: {totalLpStaked.toLocaleString()}
        </Heading>
      </HStack>
      <Table variant="simple" size='sm'>
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th textAlign="center">Pool (Chain)</Th>
            <Th textAlign="center">Contact Address</Th>
            <Th textAlign="center">Lockin Period (Contract)</Th>
            <Th textAlign="center">APR (Contract)</Th>
            <Th textAlign="center">Total Rewards Supplied (Contract)</Th>
            <Th textAlign="center" background="#fff1f3">Rewards Remaining </Th>
            <Th textAlign="center">Total Staked (Contract)</Th>
            <Th textAlign="center" background="#fff1f3">Max Stakig Allowed</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stakingDetailsList.map((user, index) => (
            <UserRow user={user} key={index} />
          ))}
        </Tbody>
        {/* <Tfoot>
        <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
        </Tr>
      </Tfoot> */}
      </Table>
    </>
  );
};

export default UserTable;
