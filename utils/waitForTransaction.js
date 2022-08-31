export default async function waitForTransaction(transactionHash, statusElementId) {
    return await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            fetch("https://alpha4.starknet.io/feeder_gateway/get_transaction_receipt?transactionHash=" + transactionHash).then(async (response) => {
                const data = await response.json();
                if (data.status === 'ACCEPTED_ON_L2' || data.status === 'ACCEPTED_ON_L1') {
                    clearInterval(interval);
                    resolve(data);
                }
                else {
                    const statusElement = document.getElementById(statusElementId);
                    if (statusElement) {
                        statusElement.textContent = data.status;
                    } else {
                        if (statusElementId) {
                            clearInterval(interval);
                            reject();
                        }
                    }
                }
            })
        }, 3000)
    })
}