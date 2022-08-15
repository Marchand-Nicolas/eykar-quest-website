import { Html, Head, Main, NextScript } from 'next/document'

export default function App () {
    return (
        <Html>
            <Head />
            <title>Eykar Quests</title>

            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#cdc6aa" />
            <meta property="og:site_name" content="A decentralizied strategy game" />
            <meta property="og:title" content="Eykar Quests ⚔️" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="An infinite, unpredictable world driven by a decentralized smartcontract. Expand your empire and conquer the world." />
            <meta property="og:url" content="https://quests.eykar.org/" />
            <meta property="og:image" content="https://quests.eykar.org/background.webp" />
            <meta name="description" content="An infinite, unpredictable world driven by a decentralized smartcontract" />
            <link rel="icon" href="/favicon.ico" />

            <body className="default_background_color">
                <Main />
                <NextScript />
                <div id="popup" />
                <div id="notification" />
            </body>
        </Html>
    )
}