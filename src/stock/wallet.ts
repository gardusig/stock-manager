namespace Stock {
    export class Wallet {
        positionMap: Map<string, Stock.Position>
        tradeList: Stock.Trade[]
        totalSoldPerYearPerMonth: Map<string, Map<string, number>>

        constructor() {
            this.tradeList = []
            this.positionMap = new Map<string, Stock.Position>()
            this.totalSoldPerYearPerMonth = new Map<string, Map<string, number>>()
        }

        processTransactions(): void {
            const stockTransactionList = Stock.getStockTransactionList()
            for (let i = stockTransactionList.length - 1; i >= 0; i--) {
                const stockTransaction = new Stock.Transaction(stockTransactionList[i])
                const trade = this.processTransaction(stockTransaction)
                if (trade) {
                    this.processTrade(trade)
                }
            }
        }

        generateSheets(): void {
            this.createPositionSheet()
            this.createTradeSheet()
            this.createMonthlyTradeReportSheet()
        }

        trimSheets(): void {
            this.trimWalletSheet()
            this.trimTradeSheet()
            this.trimMonthlyReportSheet()
        }

        private trimWalletSheet(): void {
            const formatter = new ShitDb.Util.Formatter('wallet')
            formatter.trimRows()
        }

        private trimTradeSheet(): void {
            const formatter = new ShitDb.Util.Formatter('trade')
            formatter.trimRows()
        }

        private trimMonthlyReportSheet(): void {
            const formatter = new ShitDb.Util.Formatter('monthlyReport')
            formatter.trimRows()
        }

        private createPositionSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedPosition'
            header = header ?? Stock.Position.getHeader()
            Stock.createSheet(sheetName, header, this.positionMap.values())
        }

        private createTradeSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedTrade'
            header = header ?? Stock.Trade.getHeader()
            Stock.createSheet(sheetName, header, this.tradeList)
        }

        private createMonthlyTradeReportSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedMonthlyReport'
            header = header ?? Stock.MonthlyTradeReport.getHeader()
            const monthlyTradeReport = this.generateMonthlyTradeReport()
            Stock.createSheet(sheetName, header, monthlyTradeReport)
        }

        private processTransaction(stockTransaction: Stock.Transaction): Stock.Trade | null {
            const ticker = stockTransaction.ticker
            if (!this.positionMap.has(ticker)) {
                this.positionMap.set(ticker, new Stock.Position(ticker))
            }
            const stockPosition = this.positionMap.get(ticker)!
            const trade = stockPosition.update(stockTransaction)
            if (stockPosition.position <= 0) {
                this.positionMap.delete(ticker)
            }
            return trade
        }

        private generateMonthlyTradeReport(): Stock.MonthlyTradeReport[] {
            const monthlyTradeReportList: Stock.MonthlyTradeReport[] = []
            for (const [year, totalSoldPerMonth] of this.totalSoldPerYearPerMonth) {
                for (const [month, totalSold] of totalSoldPerMonth) {
                    const report = new Stock.MonthlyTradeReport(year, month, totalSold)
                    monthlyTradeReportList.push(report)
                }
            }
            return monthlyTradeReportList
        }

        private processTrade(trade: Stock.Trade): void {
            this.tradeList.push(trade)
            const [year, month] = this.getYearAndMonthFromStockTrade(trade)
            this.increaseTotalSold(year, month, trade.quantity * trade.sellPrice)
        }

        private increaseTotalSold(year: string, month: string, amountToAdd: number): void {
            if (!this.totalSoldPerYearPerMonth.has(year)) {
                this.totalSoldPerYearPerMonth.set(year, new Map<string, number>())
            }
            const totalSoldPerMonth = this.totalSoldPerYearPerMonth.get(year)!
            if (!totalSoldPerMonth.has(month)) {
                totalSoldPerMonth.set(month, 0)
            }
            const previousValue = totalSoldPerMonth.get(month)!
            const newValue = previousValue + amountToAdd
            totalSoldPerMonth.set(month, newValue)
        }

        private getMonthFromStockTrade(stockTrade: Stock.Trade): string {
            const dateParts = stockTrade.date.split('/')
            return dateParts[1]
        }

        private getYearFromStockTrade(stockTrade: Stock.Trade): string {
            const dateParts = stockTrade.date.split('/')
            return dateParts[2]
        }

        private getYearAndMonthFromStockTrade(stockTrade: Stock.Trade): [string, string] {
            return [
                this.getYearFromStockTrade(stockTrade),
                this.getMonthFromStockTrade(stockTrade),
            ]
        }
    }
}
