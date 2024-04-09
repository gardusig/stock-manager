namespace StockWallet {
    export class StockWallet {
        positionMap: Map<string, StockPosition.StockPosition>
        tradeList: StockTrade.StockTrade[]

        constructor() {
            this.tradeList = []
            this.positionMap = new Map<string, StockPosition.StockPosition>()
            const stockTransactionList = StockUtil.getStockTransactionList()
            for (let i = 0; i < stockTransactionList.length; i++) {
                this.processTransaction(stockTransactionList[i])
            }
        }

        createPositionSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedPosition'
            header = header ?? StockPosition.getHeader()
            StockUtil.createSheet(sheetName, header, this.positionMap.values())
        }

        createTradeSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedTrade'
            header = header ?? StockTrade.getHeader()
            StockUtil.createSheet(sheetName, header, this.tradeList)
        }

        private processTransaction(stockTransaction: any): void {
            const ticker = stockTransaction.ticker
            if (!this.positionMap.has(ticker)) {
                this.positionMap.set(ticker, new StockPosition.StockPosition(ticker))
            }
            const stockPosition = this.positionMap.get(ticker)!
            this.updateStockPosition(stockTransaction, stockPosition)
            if (stockPosition.position <= 0) {
                this.positionMap.delete(ticker)
            }
        }

        private updateStockPosition(stockTransaction: any, stockPosition: StockPosition.StockPosition): void {
            const side = stockTransaction.side
            const quantity = stockTransaction.quantity
            const price = stockTransaction.price
            if (side === 'BUY') {
                stockPosition.buy(quantity, price)
            } else if (side === 'SELL') {
                const trade = stockPosition.sell(quantity, price)
                this.tradeList.push(trade)
            }
        }
    }
}
