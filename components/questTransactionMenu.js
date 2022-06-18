import styles from '../styles/Quests.module.css'
import LoadingScreen from "./loadingScreen";

export default function questTransactionMenu(props) {
  return (
    (!props.questCompleted && props.questAction) ? <LoadingScreen title={props.questAction} description={props.transaction ? props.questActionDescription : "Please confirm the transaction"} content={
        <>
          <p className={[styles.transaction_status, props.transaction && (props.transaction.status === "REJECTED" && styles.transaction_status_rejected)].join(" ")}>{props.transaction ? "Current status : " + props.transaction.status || "..." : "..."}</p>
          <button onClick={() => {
            const closeQuestMenu = new Event('closeQuestMenu');
            document.querySelector('body').dispatchEvent(closeQuestMenu);
          }} className="global button highlighted popup v2">
            Close
          </button>
        </>
      }/> : null
  )
}