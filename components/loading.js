import styles from '../styles/components/Loading.module.css'

function Loading(className) {
    return (
<div className={[styles.ldsRoller, className].join(" ")}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Loading;