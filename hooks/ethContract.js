import { useContract } from '@starknet-react/core'
import ethContractAbi from '../abi/ethContract.json'

export function useEthContract() {
  return useContract({
    abi: ethContractAbi,
    address: '0x4bb0f7af15a5469be4a571c8660d9aaf39e7e67f27f774702d75e77141ef90',
  })
}