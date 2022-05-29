import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x07c02a678b0b8e58e292a9988764419282802520d535c27909dd00a3b6bd29c3',
  })
}