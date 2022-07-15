import Loading from './loading'
import styles from '../styles/components/LoadingScreen.module.css'

function LoadingScreen(props) {
    return (
        <div className='foreground'>
            <div className={styles.container}>
                <h2 className={['title gold', styles.title].join(" ")}>{props.title}</h2>
                <Loading/>
                <p className={['description white', styles.description].join(" ")}>{props.description}</p>
                {props.content}
            </div>
        </div>
    )
}

export default LoadingScreen;