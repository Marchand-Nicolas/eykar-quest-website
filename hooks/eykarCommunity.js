import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x07366f5b7b18e55ea93c3d7fa878c03a8640168a10982663c9e4ecff074f6c2b',
  })
}