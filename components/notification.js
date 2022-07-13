import styles from '../styles/components/Notification.module.css'
import Image from 'next/image'

export default function Notification (props) {
    return (
        <div key={Math.random()} className={styles.container}>
            <Image alt='Medal' src={props.icon} width={40} height={40} />
            <h2>{props.message}</h2>
        </div>
    )
}