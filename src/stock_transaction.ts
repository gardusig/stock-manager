namespace StockUtil {
    export function getStockTransactionList() {
        const transactionSheet = ShitDb.createSheetToObjectMapper('transaction')
        const stockTransactionList = transactionSheet.getAllRows()
        stockTransactionList.sort(
            (a, b) => {
                return new Date(a.date) - new Date(b.date)
            }
        )
        return stockTransactionList
    }

    export function getPositionMap(): Map<string, StockPosition.StockPosition> {
        const positionMap = new Map<string, StockPosition.StockPosition>()
        const stockTransactionList = getStockTransactionList()
        for (let i = 0; i < stockTransactionList.length; i++) {
            const stockTransaction = stockTransactionList[i]
            const ticker = stockTransaction.ticker
            if (!positionMap.has(ticker)) {
                positionMap.set(ticker, new StockPosition.StockPosition(ticker))
            }
            const stockPosition = positionMap.get(ticker)!
            processTransaction(stockTransaction, stockPosition)
            if (stockPosition.position == 0) {
                positionMap.delete(ticker)
            }
        }
        return positionMap
    }

    export function processTransaction(stockTransaction: any, stockPosition: StockPosition.StockPosition): void {
        const side = stockTransaction.side
        const quantity = stockTransaction.quantity
        const price = stockTransaction.price
        if (side == 'BUY') {
            stockPosition.buy(quantity, price)
        } else if (side == 'SELL') {
            stockPosition.sell(quantity)
        }
    }
}
