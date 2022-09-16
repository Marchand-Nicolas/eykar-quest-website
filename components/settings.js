import { render, unmountComponentAtNode } from 'react-dom'
import styles from '../styles/components/Settings.module.css'
import StarknetIdentities from './starknetIdentities'
import V1ToV2Menu from './v1ToV2Menu'
import CloseButton from './buttons/closeButton'
import { useEffect, useState } from 'react'

export default function Settings(props) {
    const [tokens, setTokens] = useState([])
    
    useEffect(async () => {
        if (props.account) {
            fetch(`https://api-testnet.aspect.co/api/v0/assets?owner_address=${props.account}&contract_address=0x041e1382e604688da7f22e7fbb6113ba3649b84a87b58f4dc1cf5bfa96dfc2cf&sort_by=minted_at&order_by=asc`).then(res => res.json()).then(async res => {
                setTokens(res.assets)
            })
        }
    }, [props.account])

    return <>
        <section className={styles.button}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className={styles.content}>
                <h1 className={styles.title}>Settings</h1>
                <ul>
                    {tokens.length ? <li onClick={() => {
                        render(<div className={styles.container}>
                            <CloseButton onClick={() => unmountComponentAtNode(document.getElementById("popup"))} className={styles.close} />
                            <V1ToV2Menu contract={props.contract} assets={tokens} playerLevel={props.playerLevel} account={props.account} tokenId={props.tokenId[0]} />
                        </div>, document.getElementById("popup"))
                    }} className={styles.item}>Migrate V1 NFT to V2</li> : null}
                    {props.playerLevel > 1 ? <li onClick={() => {
                        render(<div className={styles.container}>
                            <CloseButton onClick={() => unmountComponentAtNode(document.getElementById("popup"))} className={styles.close} />
                            <StarknetIdentities account={props.account} tokenId={props.tokenId[0]} />
                        </div>, document.getElementById("popup"))
                    }} className={styles.item}>Starknet Identities</li> : null}
                </ul>
            </div>
        </section>
    </>
}