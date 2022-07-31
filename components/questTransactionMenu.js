import styles from '../styles/Quests.module.css'
import styles2 from '../styles/components/quests/questTransactionMenu.module.css'
import LoadingScreen from "./loadingScreen";

export default function QuestTransactionMenu(props) {
  return (
    (!props.questCompleted && props.questAction) ? <LoadingScreen title={props.questAction} description={props.transaction ? props.questActionDescription : "Please confirm the transaction."} content={
        <>
          <br></br><br></br>
          {
            props.transaction ? null : <><div className={styles2.warningContainer}>
                <p>
                  If you don&apos;t have enough goerli Eth to cover fee, please go to <a href='https://faucet.goerli.starknet.io/' target="_blank" rel='noreferrer'>Starknet faucet</a> and enter your wallet address
                </p>
              </div>
              <div className={`${styles2.errorContainer} line`}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
                <p>
                  Be sure to use a testnet wallet
                </p>
              </div>
            </>
          }
          <p className={[styles.transaction_status, props.transaction && (props.transaction.status === "REJECTED" && styles.transaction_status_rejected)].join(" ")}>{props.transaction ? "Current status : " + props.transaction.status || "..." : "..."}</p>
          <br></br><br></br>
          {props.content ? props.content : null}
        </>
      }/> : null
  )
}