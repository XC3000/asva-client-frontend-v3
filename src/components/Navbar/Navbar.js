import React from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { useAccountChange, useNetworkChange } from '../../hooks'
import { fetchAccountDetails } from '../../Web3/web3'

function Navbar() {
  const account = useAccountChange()
  const network = useNetworkChange()

  console.log(account)

  return (
    <Stack direction="row" spacing={4} align="center" p={4}>
      {account === undefined ? (
        <Button
          loadingText="connecting"
          colorScheme="pink"
          // variant="outline"
          spinnerPlacement="start"
          onClick={fetchAccountDetails}
        >
          Connect Wallet
        </Button>
      ) : (
        <Stack direction="row" spacing={4} align="center">
          <Button>{account}</Button>
          <Button>{network}</Button>
        </Stack>
      )}
    </Stack>
  )
}

export default Navbar
