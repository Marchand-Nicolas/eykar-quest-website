export function useDisplayName(account, x, y) {
    if (account === undefined)
        return "unknown";
    return account.substring(0, x) + "..." + account.substring(account.length - y);
}