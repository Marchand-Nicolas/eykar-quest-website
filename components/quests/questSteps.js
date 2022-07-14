import { useState } from "react";
import styles from "../../styles/components/quests/questSteps.module.css";
import waitForTransaction from "../../utils/waitForTransaction";
import { useEthContract  } from "../../hooks/ethContract";
import { useEykarCommunityContract } from '../../hooks/eykarCommunity'
import Loading from "../loading";
import Popup from '../../functions/popup'
import { unmountComponentAtNode } from "react-dom";
import { useStarknet } from '@starknet-react/core'

export default function QuestSteps(props) {
    const { contract } = useEykarCommunityContract()
    const { contract: ethContract } = useEthContract()
    const [progress, setProgress] = useState(0);
    const steps = props.quest.steps;
    const [loading, setLoading] = useState(false);
    const quest = props.quest
    const { account } = useStarknet()

    /*
    fetch("https://api.eykar.org/complete_quest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        player: account,
        questId: 2
      })
    })
    */


    function Step() {
        let action = null
        switch (steps[progress]) {
            case 1:
                action = <>
                    <p>Allow Transaction</p>
                    <button key={"button_step_" + progress} disabled={loading} id="allowButton" onClick={() => {
                        ethContract.approve(contract.address, [900000000000000, 0]).then(async (transaction) => {
                            setLoading(true);
                            await waitForTransaction(transaction.transaction_hash, "allowButton")
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
                    contract.addToApiContract([900000000000000, 0]).then(async (transaction) => {
                        setLoading(true);
                        await waitForTransaction(transaction.transaction_hash, "allowButton")
                        setLoading(false);
                        setProgress(progress + 1)
                    })
                }} className={styles.completeStepButton}>Send</button>
            </>
            break;
            case 3:
                const question = quest.questions[progress]
                action = <>
                    <h2>{question.name}</h2>
                    {
                        question.choices.map((choice, index) => <div className={styles.quizChoice} key={`choice_${quest}_${progress}_${index}`}>
                            <input name="choices" type={question.multiple ? "checkbox" : "radio"} />{choice.name}
                        </div>
                        )
                    }
                    <button onClick={() => {
                        if (question.choices) {
                            const choices = document.querySelectorAll("input[name=choices]")
                            let score = 0
                            for (let index = 0; index < choices.length; index++) {
                                const element = choices[index];
                                const correct = question.choices[index].correct
                                if ((!correct && element.checked) || (correct && !element.checked)) {
                                    score = score - 1
                                }
                            }
                            if (score < 0) {
                                Popup("Wrong !", <strong id="timer">Try again in 15 seconds</strong>, "", null,
                                    <>
                                        <Loading className={styles.center} />
                                        <br></br>
                                        <h2 id="stupidPlaceholderText" className="title center">
                                            Is patience a virtue?
                                        </h2>
                                    </>, {
                                        button:<></>
                                    }, function() {
                                        setTimeout(() => {
                                            unmountComponentAtNode(document.getElementById("popup"))
                                        }, 30000)
                                        let time = 15
                                        let realTime = 30

                                        const interval = setInterval(() => {
                                            time = time - 1
                                            realTime = realTime - 1
                                            const placeholder = document.getElementById("stupidPlaceholderText")
                                            if (realTime === 25) {
                                                placeholder.innerText = "No."
                                            }
                                            if (realTime === 19) {
                                                placeholder.innerText = "Almost there..."
                                            }
                                            if (realTime === 14) {
                                                placeholder.innerText = "Oops, I probably counted wrong."
                                            }
                                            if (realTime === 10) {
                                                placeholder.innerText = "This time it's almost over."
                                            }
                                            if (realTime === 5) {
                                                placeholder.innerText = "it would have been faster to reload the page."
                                            }
                                            if (time === 0) time = 15
                                            const timer = document.getElementById("timer")
                                            if (!timer || realTime === 0) return clearInterval(interval)
                                            timer.innerText = `Try again in ${time} seconds`
                                        }, 1000)
                                    }
                                )
                            }
                            else {
                                setProgress(progress + 1)
                            }
                        }
                    }} className={styles.completeStepButton}>
                        Check
                    </button>
                </>
            break;
            case 4:
                document.getElementById("closeButtonContainer").innerHTML = ""
                action = <>
                    <h2>Validate the quest on the blockchain</h2>
                    <button id="completeStepButton" onClick={async () => {
                        const button = document.getElementById("completeStepButton")
                        button.disabled = true
                        button.innerText = "Contacting the server..."
                        const result = await (await fetch("https://api.eykar.org/complete_quest", { method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({player: account, questId: quest.id})
                        })).json()
                        console.log(result)
                        button.innerText = "Transaction in progress..."
                        await waitForTransaction(result.transactionHash, "completeStepButton")
                        setProgress(progress + 1)
                    }} className={[styles.completeStepButton, styles.v2].join(" ")}>Validate</button>
                    <p id=""></p>
                </>
            break;
        }
        return (
            <div className={styles.stepActionContener}>
                {
                    progress < steps.length ? action : <h3 className={styles.questCompletedTitle}>Quest completed</h3>
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
                    <h2 className={styles.stepNumber}>{steps.length} step{steps.length !== 1 && "s"}</h2>
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
                    <button onClick={() => props.completeQuest()} className="global button highlighted popup">{props.quest.custom_button ? props.quest.custom_button : "Done"}</button>
                </>
            }
        </>
    )
};