import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x021261d2d02e079643d335ab21546845d18d81abb3df3ab8244bd7caa9ea21b2',
  })
}