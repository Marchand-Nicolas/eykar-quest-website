import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x02d5d2897fc15dcf62018fbdf6071645f067417d7f69b3e9ac226fd46cffdd5b',
  })
}