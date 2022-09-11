import styles from '../styles/components/WalletMenu.module.css'
import { useStarknet } from '@starknet-react/core'
import { setCookie } from '../functions'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function WalletMenu({ close }) {
    const { connectors } = useStarknet()
    const [device, setDevice] = useState(0)
    const router = useRouter()

    useEffect(() => {
        setDevice(1)
    }, [])

    
    return (
        device ?
        <div className={styles.menu}>
            {close ? <button className={styles.menu_close} onClick={() => { close() }} >
                <svg alt="close icon" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
                : null}
            <p className={styles.menu_title}>{connectors.length ? "Please select a wallet" : "You need a Starknet wallet"}</p>
            {
                connectors.length === 0 ? 
                <a className={styles.button} href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb" target="_blank" rel="noreferrer" >
                    <svg className={styles.button_icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <p className={styles.button_text}>Install Argent X Wallet on Chrome</p>
                </a> :
                connectors.map((connector, index) => 
                    <button onClick={() => {
                        setCookie("connector", connector.id(), 10000)
                        router.push("/quests")
                    }} className={styles.button} key={"connector_" + index}>
                        <p className={styles.button_text}>{connector.name()}</p>
                    </button>
                )
            }
        </div>
        : null
    );

}
export default WalletMenu;