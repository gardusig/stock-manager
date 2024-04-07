namespace StockUtil {
    export function getPositionMap(): Map<string, StockPosition.StockPosition> {
        const positionMap = new Map<string, StockPosition.StockPosition>()
        const stockTransactionList = getStockTransactionList()
        for (let i = 0; i < stockTransactionList.length; i++) {
            processTransaction(stockTransactionList[i], positionMap)
        }
        for (const stockPosition of positionMap.values()) {
            for (const [key, value] of Object.entries(stockPosition)) {
                Logger.log(`${key}: ${value}`)
            }
        }
        return positionMap
    }

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

    export function processTransaction(stockTransaction: any, positionMap: Map<string, StockPosition.StockPosition>): void {
        const ticker = stockTransaction.ticker
        if (!positionMap.has(ticker)) {
            positionMap.set(ticker, new StockPosition.StockPosition(ticker))
        }
        const stockPosition = positionMap.get(ticker)!
        updateStockPosition(stockTransaction, stockPosition)
        if (stockPosition.position == 0) {
            positionMap.delete(ticker)
        }
    }

    export function updateStockPosition(stockTransaction: any, stockPosition: StockPosition.StockPosition): void {
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
