namespace Stock {
    export class Wallet {
        positionMap: Map<string, Stock.Position>
        tradeList: Stock.Trade[]

        constructor() {
            this.tradeList = []
            this.positionMap = new Map<string, Stock.Position>()
        }

        createPositionSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedPosition'
            header = header ?? PositionSheet.getHeader()
            Stock.createSheet(sheetName, header, this.positionMap.values())
        }

        createTradeSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedTrade'
            header = header ?? TradeSheet.getHeader()
            Stock.createSheet(sheetName, header, this.tradeList)
        }

        processTransactions() {
            const stockTransactionList = Stock.getStockTransactionList()
            for (let i = stockTransactionList.length - 1; i >= 0; i--) {
                const stockTransaction = new Stock.Transaction(stockTransactionList[i])
                this.processTransaction(stockTransaction)
            }
        }

        private processTransaction(stockTransaction: Stock.Transaction): void {
            const ticker = stockTransaction.ticker
            if (!this.positionMap.has(ticker)) {
                this.positionMap.set(ticker, new Stock.Position(ticker))
            }
            const stockPosition = this.positionMap.get(ticker)!
            const trade = stockPosition.update(stockTransaction)
            if (trade) {
                this.tradeList.push(trade)
            }
            if (stockPosition.position <= 0) {
                this.positionMap.delete(ticker)
            }
        }
    }
}
