import styles from '../styles/components/Notification.module.css'
import Image from 'next/image'
import { render } from 'react-dom'

export default function notify(props) {
    if (typeof window !== 'undefined') render(
        <div key={"notification_" + Math.random()}>
        {
            props.warning ?
            <div style={{ animationDuration: "12s"}} className={[styles.container, styles.warning].join(" ")}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
                <h2>{props.message}</h2>
            </div> 
            : 
            <div className={styles.container}>
                <Image alt='Medal' src={props.icon} width={40} height={40} />
                <h2>{props.message}</h2>
            </div>
        }
        </div>,
        document.getElementById("notification")
    );
}