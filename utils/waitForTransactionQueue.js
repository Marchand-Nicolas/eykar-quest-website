import config from "../utils/config"

export default async function waitForTransactionQueue (questId, tokenId, element) {
    return await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            fetch(`${config.apiUrl}get_quest_transaction`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    tokenId: tokenId, questId: questId
                })
            }).then(async (response) => {
                const data = await response.json();
                if (data.transactionHash) {
                    clearInterval(interval);
                    resolve(data.transactionHash);
                }
                if (element) {
                    try {
                        if (data.queuePosition) {
                            element.innerHTML = `Queued, position: ${data.queuePosition}`;
                        }
                    }
                    catch {
                        reject();
                    }
                }
            })
        }, 3000)
    })
}