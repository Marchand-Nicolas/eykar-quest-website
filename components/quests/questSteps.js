import { useState } from "react";
import styles from "../../styles/components/quests/questSteps.module.css";
import waitForTransaction from "../../utils/waitForTransaction";
import { useEthContract  } from "../../hooks/ethContract";
import Loading from "../loading";

export default function questSteps(props) {
    const { contract: ethContract } = useEthContract()
    const [progress, setProgress] = useState(0);
    const steps = props.quest.steps;
    const [loading, setLoading] = useState(false);
    function Step() {
        let action = null
        switch (steps[progress]) {
            case 1:
                action = <>
                    <p>Allow Transaction</p>
                    <button disabled={loading} id="allowButton" onClick={() => {
                        ethContract.approve('0x6806c42960e739918af543b733e76eb4f52a99402ec00e57794cb26cb3a6723', [100000000, 0]).then(async (transaction) => {
                            setLoading(true);
                            await waitForTransaction(transaction, "allowButton")
                            setLoading(false);
                            setProgress(progress + 1)
                        })
                    }} className={styles.completeStepButton}>Allow</button>
                </>
            break;
            case 2:
                action = <>
                <p>Send goerli eth</p>
                <button disabled={loading} id="allowButton" onClick={() => {
                    ethContract.transfer('0x6806c42960e739918af543b733e76eb4f52a99402ec00e57794cb26cb3a6723', [100000000, 0]).then(async (transaction) => {
                        setLoading(true);
                        await waitForTransaction(transaction, "allowButton")
                        setLoading(false);
                        setProgress(progress + 1)
                    })
                }} className={styles.completeStepButton}>Send</button>
            </>
            break;
        }
        return (
            <div className={styles.stepActionContener}>
                {
                    progress < steps.length ? action : <h3 className={styles.questCompletedTitle}>Quest ompleted</h3>
                }
                {loading && <Loading className={styles.loading} />}
            </div>
        )
    }
    return (
        <>
            <br></br>
            {
                steps.length !== 0 && <>
                    <h2 className={styles.stepNumber}>{steps.length} steps</h2>
                    <div className={styles.container}>
                        <div className={styles.stepBar} style={{height: (steps.length - 1) * 100}}>
                            {
                                steps.map((step, index) => 
                                    <div className={styles.step} key={index} style={{top: index * 100}}>
                                        {
                                            progress > index ? <svg className={`${styles.stepIcon} ${styles.completed}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            : progress === index ? <svg className={styles.stepIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                            </svg> : <svg className={styles.stepIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                            </svg>
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <Step />
                    </div>
                    <br></br>
                </>
            }
            {
                progress === steps.length && <>
                    <br></br>
                    <button onClick={() => props.completeQuest(props.quest.id)} className="global button highlighted popup">{props.quest.custom_button ? props.quest.custom_button : "Done"}</button>
                </>
            }
        </>
    )
};