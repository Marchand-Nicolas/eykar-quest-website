import { useContract } from '@starknet-react/core'
import mainContractAbi from '../abi/mainContract.json'
import config from '../utils/config.json'

export function useMainContract() {
  return useContract({
    abi: mainContractAbi,
    address: config.mainContractAddress,
  })
}