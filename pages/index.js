import { useState, useEffect } from "react";
import { useStarknet } from '@starknet-react/core'
import styles from '../styles/Home.module.css'
import React from 'react'
import Powered from '../components/powered'
import WalletMenu from '../components/walletmenu'
import Loading from '../components/loading'
import { useRouter } from 'next/router'
import Header from '../components/header' 
import Image from 'next/image'
import { getCookie } from "../functions";

export default function Home() {;
  const [connectMenuToggled, setConnectMenuToggled] = useState(false);
  let [connectionStatus, setConnectionStatus]  = useState(0) 
  const { account, connect, connectors } = useStarknet()
  const router = useRouter()  

    useEffect(() => {
      const connectorId = getCookie("connector")
      const connector = connectors.find(connector => connector.id() === connectorId)
      console.log(connector)
      if (!connector) return;
      connector.ready().then(ready => {
        connect(connector)
      }) 
    }, [connectors])
  
    return (
    <div className="default_background">
      <Powered />
      {account && <Header/>} 
      {connectMenuToggled ? <WalletMenu close={() => setConnectMenuToggled(false)} /> : null}
      <nav className={styles.nav}>
        {/*!account && <Image className={styles.logo} width={300} height={100} src="/logo.svg" alt="Eykar Logo" />*/}
        {/*account && */<div className={styles.logo_banner}/>}
        <button onClick={(async () => {
                if (account) {
                  router.push("/quests")
                }
                else {
                  setConnectMenuToggled(true)
                }

            })} className={
            [styles.button, styles.play].join(" ")} >
            <div className={styles.button_div}></div>
            <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {(connectionStatus && !account) ? <Loading className={styles.button_loading} /> : null} 
            <p id="playButtonText" className={styles.button_text}>
            {(!connectionStatus || account)  && "View quests"}
            {(connectionStatus && !account) ? "Connecting..." : null}
            </p> 
          </button>
      </nav>
    </div>
  );
}