import styles from '../../styles/components/buttons/closeButton.module.css'

export default function CloseButton(props) {
    return <button onClick={props.onClick} className={[props.className, styles.button].join(" ")}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
    </button>
}