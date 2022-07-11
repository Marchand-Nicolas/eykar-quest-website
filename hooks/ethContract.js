import { useContract } from '@starknet-react/core'
import ethContractAbi from '../abi/ethContract.json'

export function useEthContract() {
  return useContract({
    abi: ethContractAbi,
    address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  })
}