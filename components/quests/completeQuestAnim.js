import styles from '../../styles/components/quests/completeQuestAnim.module.css';

export default function CompleteQuestAnim(props) {
    return (
        <>
            <div className={styles.goldAnimation} />
            <div className={[styles.goldAnimation, styles.v2].join(" ")} />
            <div className={[styles.goldAnimation, styles.v3].join(" ")} />
            <div className={styles.nftCard}>
                <img src={`https://nft.eykar.org/quest-nft/${props.playerLevel ? props.playerLevel : 0}`} />
            </div>
        </>
    )
}