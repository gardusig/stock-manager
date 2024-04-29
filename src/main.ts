export function main() {
    const walletManager = new Manager.Wallet()
    walletManager.processTransactions()
    walletManager.generateSheets()
    walletManager.trimSheets()
}
