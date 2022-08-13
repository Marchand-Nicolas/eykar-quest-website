import styles from '../styles/components/Loading.module.css'

function Loading(props) {
    return (
        <div style={props.style} className={[styles.ldsRoller, props.className].join(" ")}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Loading;