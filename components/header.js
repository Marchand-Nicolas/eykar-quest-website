import styles from '../styles/components/Header.module.css'
import Link from 'next/link'
import { useStarknet } from '@starknet-react/core'

function Header() {
    return (
        <nav className={styles.game_nav}>
            <div className={styles.icons}>
                <Link href="/" passHref>
                    <img className={styles.logo} width={80} height={60} src="/logo.svg" alt="Eykar Logo" />
                </Link>
                <Link href="/" passHref>
                <div className={[styles.button, styles.normal, styles.button_div, "link"].join(" ")}>
                    <svg className={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>          
                    <p className={styles.button_text}>
                        Home
                    </p>
                </div>
                </Link>
                <Link href="/quests" passHref>
                <div className={[styles.button, styles.normal, styles.button_div, "link"].join(" ")}>
                    <svg className={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                    </svg>
                    <p className={styles.button_text}>
                        Quests
                    </p>
                </div>
                </Link>
            </div>
        </nav>
    );

}
export default Header;