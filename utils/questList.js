import styles from '../styles/Quests.module.css'

export default [{
    name: "First NFT",
    id: 1,
    description: "We'll mint your first NFT on Eykar!",
    long_description: "Let's mint your first NFT on Eykar! You will keep it throughout your journey. As you complete quests (like this one), your NFT will gain levels and evolve! Good luck ;-)",
    icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    actionName: "Minting your first NFT",
    actionDescription: "Please wait...",
    actionType: "invoke",
    transactionType: 1,
    custom_button: "Mint",
    connected: [{
        name: "Eligibility",
        id: 2,
        steps: [1, 2],
        description: "Let's check if you have the prerequisites to join the future beta of Eykar!",
        dependent: true,
        icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>,
        content: <>
            <p className="global description">Please provide your wallet with goerli eth and allow us to collect some of it.</p>
        </>,
            connected: [{
                devOnly: true,
                name: "Discord",
                id: 4,
                description: "Login with your Discord account, and get access to exclusive roles on the official Eykar server",
                long_description: "",
                dependent: true,
                icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            },
            {
                devOnly: true,
                name: "Tweet",
                id: 3,
                description: "Make a tweet mentioning Eykar to support us ❤️",
                long_description: "Make a tweet containing at least @AgeOfEykar or eykar.org, with more than 50 characters.",
                content: <>
                        <input className="global input" placeholder="Please enter your exact twitter username"></input>
                        <br></br>
                        <p className="global description">After the tweet is sent, you have 10 minutes to click on the button below</p>
                    </>,
                    icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>,
                dependent: true
                }
        ] 
    }]
}]