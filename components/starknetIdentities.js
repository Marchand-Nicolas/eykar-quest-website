import { useState, useEffect } from "react"
import { useStarknet} from '@starknet-react/core'
import styles from '../styles/components/StarknetIdentities.module.css'
import Loading from "./loading"
import waitForTransaction from "../utils/waitForTransaction"
import waitForTransactionQueue from "../utils/waitForTransactionQueue"
import callApi from "../utils/callApi"

export default function StarknetIdentities(props) {
    const [identities, setIdentities] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const { account } = useStarknet()
    useEffect(async () => {
        setLoading(true)
        if (refresh) return setRefresh(false)
        if (!account) return
        const res = await (await fetch("https://api-testnet.aspect.co/api/v0/assets?owner_address=" + account + "&contract_address=0x0798e884450c19e072d6620fefdbeb7387d0453d3fd51d95f5ace1f17633d88b")).json()
        setIdentities(res.assets)
        setLoading(false)
    }, [account, refresh])
    return <>
        <h1>Your identities</h1>
        <br></br>
        {identities.length > 1 ? <>
            <p>{identities.length} identities found! Choose well, this step is irreversible.</p>
        </> : null}
        {
            loading ? <Loading className={styles.loading} /> : identities.length ? identities.map((identity, index) => <div className={styles.idContainer} key={identity.id}>
                <img src={identity.image_uri ? identity.image_uri : "/starknet_logo.svg"}></img>
                <a href={identity.aspect_link} target="_blank" rel="noreferrer"><button className="button gold" id={"aspectButton" + index}>View on Aspect</button></a>
                <button id={"selectButton" + index} onClick={async () => {
                            const button = document.getElementById("selectButton" + index)
                            button.disabled = true
                            button.innerText = "Contacting the server..."
                            const result = await callApi("https://api.eykar.org/complete_quest", {tokenId: props.tokenId, questId: 4, player: account, identityTokenId:identity.token_id, aspectTokenId:identity.id})
                            if (!result || result ? result.error : false) {
                                button.disabled = false
                                button.innerText = "Try again"
                                return;
                            }
                            button.innerText = "Transaction queued"
                            const transactionHash = await waitForTransactionQueue(4, props.tokenId)
                            button.innerText = "Transaction sent"
                            document.getElementById("aspectButton" + index).innerText = "Aspect"
                            document.getElementById("transaction" +  index).innerText = "Open in voyager"
                            document.getElementById("transaction" +  index).href = "https://beta-goerli.voyager.online/tx/" + transactionHash
                            await waitForTransaction(transactionHash, "selectButton" + index)
                            props.setProgress(props.progress + 1)
                }} className="button gold">Select</button>
                <a className={styles.link} href="#" target="_blank" rel="noreferrer" id={"transaction" +  index}></a>
            </div>) :
            <p>You haven&apos;t minted any idendity for the moment.</p>
        }
        <div className="line">
            <a href="https://starknet.id/" target="_blank" rel="noreferrer"><button className="button gold">Mint new idendity</button></a>
            <button onClick={() => setRefresh(true)} className="button gold">Refresh</button>
        </div>
    </>
}