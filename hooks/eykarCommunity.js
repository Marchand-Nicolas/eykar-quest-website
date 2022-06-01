import { useContract } from '@starknet-react/core'
import EykarCommunityAbi from '../abi/eykarCommunity.json'

export function useEykarCommunityContract() {
  return useContract({
    abi: EykarCommunityAbi,
    address: '0x07abbd7e4a04e1d34c370b78ea16cbcda6707b8455f2c7b7f5b583ad28cc93d7',
  })
}