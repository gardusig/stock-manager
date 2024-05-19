export function main() {
    const walletManager = new Manager.Wallet()
    walletManager.processTransactions()
    // walletManager.generateSheets()
    // walletManager.trimSheets()
}

// generateSheets(): void {
//     this.transactionInputReader.processTransactions()
//     this.positionManager.createPositionSheet()
//     this.positionManager.createTradeSheet()
//     this.reportManager.createMonthlyTradeReportSheet()
// }

// trimSheets(): void {
//     const sheetNames = [
//         'wallet',
//         'trade',
//         'monthlyReport',
//     ]
//     for (const sheetName of sheetNames) {
//         Library.trimSheet(sheetName)
//     }
// }
