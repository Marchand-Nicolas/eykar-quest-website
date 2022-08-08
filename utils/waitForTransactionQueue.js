export default async function waitForTransactionQueue (questId, tokenId, element) {
    return await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            fetch("https://api.eykar.org/get_quest_transaction", {
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
                    if (data.queuePosition) {
                        element.innerHTML = `Transaction queued. Position: ${data.queuePosition}`;
                    }
                }
            })
        }, 3000)
    })
}