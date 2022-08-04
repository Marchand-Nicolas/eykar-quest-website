import { unmountComponentAtNode } from 'react-dom'
import Popup from './popup'
import Loading from '../components/loading'

export default function waitForIndexation(account, contract, setToken, setTokenIds, setTokenId, setReloadDatas) {
    if (!account || !contract) return
    if (typeof window === 'undefined') return
    Popup("Indexing the NFT on Aspect", `Please wait...`,
        "", undefined, "", {button: <div className="center"><Loading className="center line" /></div>})
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            fetch(`https://api-testnet.aspect.co/api/v0/assets?owner_address=${account}&contract_address=${contract.address}`).then(res => res.json()).then(res => {
                if (res.assets.length > 0) {
                    const assets = res.assets.map(asset => asset.token_id)
                    setToken(res.assets[0])
                    setTokenIds(assets)
                    setTokenId([assets[0], 0])
                    setReloadDatas(true)
                    resolve()
                    unmountComponentAtNode(document.getElementById('popup'))
                    clearInterval(interval)
                }
            })
        }, 1000)
    })
}