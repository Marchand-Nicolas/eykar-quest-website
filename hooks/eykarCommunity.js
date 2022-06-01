import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x07ccf5e7d7bfec10d39ec13c505326bf75b8402d8af76969bb7e8e008b15e411',
  })
}