import Notification from './notification'

export default function TransactionCompleted () {
    return (
        <Notification message={"Successful transaction"} icon={"/icons/medals.svg"} />
    )
}