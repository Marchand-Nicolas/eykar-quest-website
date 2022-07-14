import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x04e6a7859b43f298fa57d910a524df28097a23ef5b5fc8e4c0a577bc2fcd88ae',
  })
}