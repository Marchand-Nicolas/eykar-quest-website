import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x041e1382e604688da7f22e7fbb6113ba3649b84a87b58f4dc1cf5bfa96dfc2cf',
  })
}