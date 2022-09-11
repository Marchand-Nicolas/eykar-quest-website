import styles from '../styles/Quests.module.css'

export default [{
    name: "First NFT",
    id: 1,
    description: "We'll mint your first NFT on Eykar!",
    long_description: "Let's mint your first NFT on Eykar! You will keep it throughout your journey. As you complete quests (like this one), your NFT will gain levels and evolve! Good luck ;-)",
    icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
        icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>,
        content: <>
            <p className="global description">Please provide your wallet with goerli eth and allow us to collect some of it.</p>
        </>,
        connected: [
            {
                connected: [
                    {
                        name: "Identities",
                        id: 4,
                        description: "Create an identity on Starknet.id to link your account with Discord and Twitter",
                        icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>,
                        steps: [5],
                        connected: [
                            {
                                name: "Discord",
                                id: 7,
                                description: "Verify your Discord account on Starknet.id, and get access to exclusive roles on the official Eykar server",
                                icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>,
                                steps: [6, 4],
                                customContent: [
                                    <p>
                                        Verify your Discord account on Starknet.id, then click Okay
                                    </p>,
                                ],
                                details: {
                                    0: {
                                        buttons: [
                                            <a href="https://starknet.id" target="_blank" rel="noreferrer"><button className="button gold">Open Starknet.id</button></a>
                                        ]
                                    }
                                },
                                connected: [
                                    {
                                        name: "Server",
                                        id: 10,
                                        description: "Join our Discord server ❤️",
                                        icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>,
                                        steps: [6, 4],
                                        customContent: [
                                            <p>
                                                Join our Discord server, then click Okay
                                            </p>,
                                        ],
                                        details: {
                                            0: {
                                                buttons: [
                                                    <a href="https://discord.gg/E8yUd3SHqv" target="_blank" rel="noreferrer"><button className="button gold">Join</button></a>
                                                ]
                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                name: "Twitter",
                                id: 8,
                                description: "Verify your Twitter account on Starknet.id, and unlock exclusive quests.",
                                icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>,
                                steps: [6, 4],
                                customContent: [
                                    <p>
                                        Verify your Twitter account on Starknet.id, then click Okay
                                    </p>,
                                ],
                                details: {
                                    0: {
                                        buttons: [
                                            <a href="https://starknet.id" target="_blank" rel="noreferrer"><button className="button gold">Open Starknet.id</button></a>
                                        ]
                                    }
                                },
                                connected: [
                                    {
                                        name: "Tweet",
                                        id: 9,
                                        description: "Make a tweet mentioning Eykar to support us ❤️",
                                        icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                                        </svg>,
                                        steps: [6, 4],
                                        customContent: [
                                            <p>
                                                Post <a className='link' href="https://twitter.com/intent/tweet?text=I'm%20leveling%20my%20@AgeOfEykar%20Quest%20%23NFT%20on%20https://quests.eykar.org/%20to%20get%20an%20early%20access%20to%20the%20game.%20%23StarkNet" target="_blank" rel="noreferrer">this tweet</a>, then click Okay
                                            </p>,
                                        ],
                                        connected: [
                                            {
                                                name: "Follow",
                                                id: 11,
                                                description: "Follow us on Twitter",
                                                icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                </svg>,
                                                steps: [6, 4],
                                                customContent: [
                                                    <p>
                                                        <a className='link' href="https://twitter.com/intent/user?screen_name=AgeOfEykar" target="_blank" rel="noreferrer">Follow us</a>, then click Okay
                                                    </p>,
                                                ],
                                            }
                                        ]
                                    }
                                ]
                            }
                            ]
                    },
                    {
                        name: "Get a domain",
                        id: 12,
                        description: <>Get a domain name on <a className='link' href='https://www.starknet.id/' target="_blank" rel="noreferrer">Starknet Id</a></>,
                        icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                        </svg>
                        ,
                        steps: [6, 4],
                        customContent: [
                            <p>
                                Create a domain name on <a className='link' href="https://www.starknet.id/" target="_blank" rel="noreferrer">Starknet Id</a>, then click Okay
                            </p>,
                        ],
                    }
                ]
            },
            {
                name: "Quiz",
                id: 5,
                description: <>Let's test your knowledge of Eykar! You can find the necessary informations <a className='link' href='https://eykar.org/discover' target="_blank" rel="noreferrer">here</a></>,
                icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>,
                steps: [3, 3, 3, 3, 4],
                questions : [
                    {
                        name: "How big is the map of Eykar ?",
                        choices: [
                            {
                                name: "Small"
                            },
                            {
                                name: "Medium"
                            },
                            {
                                name: "Large"
                            },
                            {
                                name: "Extra Large"
                            },
                            {
                                name: "Bigger than our universe",
                                correct: true
                            },
                            {
                                name: "Infinite"
                            }
                        ]
                    },
                    {
                        name: "Can we make money playing the game?",
                        choices: [
                            {
                                name: "Yes",
                                correct: true
                            },
                            {
                                name: "No"
                            }
                        ]
                    },
                    {
                        name: "How to earn real money playing the game?",
                        choices: [
                            {
                                name: "By building diamond mines"
                            },
                            {
                                name: "By earning Eykar tokens"
                            },
                            {
                                name: "By having the most prestigious Guild.",
                                correct: true
                            },
                            {
                                name: "By attacking other players to steal the money they have invested"
                            }
                        ]
                    },
                    {
                        name: "How can you participate in the creation of the game?",
                        multiple: true,
                        choices: [
                            {
                                name: "By participating in the development, all the code is open source on Github",
                                correct: true
                            },
                            {
                                name: "By making suggestions (on the Discord server for example)",
                                correct: true
                            },
                            {
                                name: "By inviting lots of bots to the Discord server 😡😠😠"
                            },
                        ]
                    },
                ],
                /*connected: [
                    {
                        clear: true
                    },
                    {
                        name: "Combat system",
                        id: 6,
                        description: <>Let's test your knowledge of Eykar's combat system! You can find the necessary informations <a className='link' href='https://wiki.eykar.org/rules-and-mechanics/combat' target="_blank" rel="noreferrer">here</a></>,
                        icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>,
                        steps: [3, 3, 4],
                        questions : [
                            {
                                name: "What are the benefits of attacking other players?",
                                multiple: true,
                                choices: [
                                    {
                                        name: "Small"
                                    },
                                    {
                                        name: "Medium"
                                    },
                                    {
                                        name: "Large"
                                    },
                                    {
                                        name: "Extra Large"
                                    },
                                    {
                                        name: "Super mega big",
                                        correct: true
                                    },
                                    {
                                        name: "Infinite"
                                    }
                                ]
                            },
                            {
                                name: "What are the interests of attacking other players?",
                                multiple: true,
                                choices: [
                                    {
                                        name: "Theft of resources"
                                    },
                                    {
                                        name: "The use of means of production"
                                    },
                                    {
                                        name: "The theft of territories"
                                    },
                                ]
                            },
                        ]
                    }
                ]*/
            },
        ] 
    }]
}]