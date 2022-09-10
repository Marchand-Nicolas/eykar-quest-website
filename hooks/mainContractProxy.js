import { useContract } from '@starknet-react/core'
import mainContractProxyAbi from '../abi/mainContractProxy.json'
import config from '../utils/config.json'

export function useMainContractProxy() {
  return useContract({
    abi: mainContractProxyAbi,
    address: config.mainContractProxyAddress,
  })
}