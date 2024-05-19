export function main() {
    const walletManager = new Internal.Wallet()
    walletManager.processTransactions()
    walletManager.processSheets()
}
