import styles from '../styles/components/V1ToV2Menu.module.css'
import { useEffect, useState } from 'react'
import config from '../utils/config'
import callApi from '../utils/callApi'

export default function V1ToV2Menu(props) {
    const [selectedNft, setSelectedNft] = useState(false)
    const [signatures, setSignatures] = useState([])

    useEffect(() => {
        if (selectedNft) {
            if (selectedNft) callApi(config.apiUrl + "generate_signatures", {
                newTokenId: props.tokenId,
                oldTokenId: selectedNft.token_id,
            }).then(async (res) => {
                setSignatures(res)
            })
        }
    }, [selectedNft])

    return <>
        <h1 className={styles.title}>Migrate V1 NFT to V2</h1>
        <br></br>
        <p className={styles.subtitle}>Did you participate in the V1 of Eykar Quests? Get your NFT back on Eykar Quests V2!</p>
        <br></br>
        {
            props.playerLevel ? 
            selectedNft ? 
            <>
                <p>Please approve the following transactions :</p>
                {
                    signatures.map((signature, index) => {
                        return <div key={index}>
                            <div className={['line', styles.sigs].join(" ")}>
                                <p>Transaction {index + 1}</p>
                                <button className='button gold normal' onClick={() => {
                                    props.contract.completeQuest(signature.questId, [props.tokenId, 0], signature.signatures).then(async (transaction) => {
                                        console.log(completeQuest)
                                    })
                                }}
                                >Approve</button>
                            </div>
                        </div>
                    })
                }
            </>
            :
            <>
                <p>Please select the V1 NFT you want to migrate :</p>
                {
                    props.assets.map((asset, index) => 
                        <div key={index} className='line'>
                            <a href={"https://testnet.aspect.co/asset/0x041e1382e604688da7f22e7fbb6113ba3649b84a87b58f4dc1cf5bfa96dfc2cf/" + asset.token_id} target="_blank" rel="noreferrer" className="button gold">View on Aspect</a>
                            <button className="button gold" onClick={() => setSelectedNft(asset)}>Migrate</button>
                        </div>
                    )
                }
            </>
            :
            <p>
                To start, please mint a new NFT. Then we will import the completed quests into it.<br></br>
                To mint the NFT, you can close this menu and complete the first quest, "First NFT".<br></br>
                Once this is done, reopen this menu
            </p>
        }
    </>
}