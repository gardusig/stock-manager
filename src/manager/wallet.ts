namespace Manager {
    export class Wallet {
        reportManager: Manager.Report
        positionManager: Manager.Position

        constructor() {
            this.reportManager = new Manager.Report()
            this.positionManager = new Manager.Position()
        }

        processTransactions(): void {
            const stockTransactionList = SheetUtil.getStockTransactionList()
            for (let i = stockTransactionList.length - 1; i >= 0; i--) {
                const stockTransaction = new Input.Transaction(stockTransactionList[i])
                const trade = this.positionManager.processTransaction(stockTransaction)
                this.reportManager.processTrade(trade)
            }
        }

        generateSheets(): void {
            this.positionManager.createPositionSheet()
            this.positionManager.createTradeSheet()
            this.reportManager.createMonthlyTradeReportSheet()
        }

        trimSheets(): void {
            const sheetNames = [
                'wallet',
                'trade',
                'monthlyReport',
            ]
            for (const sheetName of sheetNames) {
                SheetUtil.trimSheet(sheetName)
            }
        }
    }
}
