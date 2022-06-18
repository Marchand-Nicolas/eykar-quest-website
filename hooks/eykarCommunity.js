import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x00f199f1d5c1c2d8498ad5b79b7eb736a12d109abde092a9030e4d7abaa62e2e',
  })
}