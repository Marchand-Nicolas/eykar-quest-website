import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x01ab9e8fea516a529a130ee715488bac1cbd0f369a317113a09960dc9a969e83',
  })
}