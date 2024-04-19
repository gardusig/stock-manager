export function main() {
    const stockWallet = new Stock.Wallet()
    stockWallet.processTransactions()
    stockWallet.createPositionSheet()
    stockWallet.createTradeSheet()
}
