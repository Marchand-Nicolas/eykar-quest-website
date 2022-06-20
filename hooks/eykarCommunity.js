import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x039222b536fed37d065716b6c05e7f0e5baaa76fd26fe86ce6c3c266e2976345',
  })
}