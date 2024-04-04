import { StockPosition } from './stock_position'

export function getStockTransactionList() {
    const transactionSheet = new ShitDb.createSheetToObjectMapper('transaction')
    const stockTransactionList = transactionSheet.getAllRows()
    stockTransactionList.sort(
        (a, b) => {
            return new Date(a.date) - new Date(b.date)
        }
    )
    return stockTransactionList
}

export function skibiribab() {
    const positionWallet = new Map<string, StockPosition>()
    const stockTransactionList = getStockTransactionList()
    for (let i = 0; i < stockTransactionList.length; i++) {
        const stockTransaction = stockTransactionList[i]
        const ticker = stockTransaction.ticker
        if (!positionWallet.has(ticker)) {
            positionWallet.set(ticker, new StockPosition(ticker))
        }
        const stockPosition = positionWallet.get(ticker)!
        Logger.log('current stock position:')
        for (const [key, value] of Object.entries(stockPosition)) {
            Logger.log(`\t${key}: ${value}`)
        }
        processTransaction(stockTransaction, stockPosition)
        if (stockPosition.position == 0) {
            Logger.log('deleting stock position with ticker:', ticker)
            positionWallet.delete(ticker)
        }
        Logger.log('updated stock position:')
        for (const [key, value] of Object.entries(stockPosition)) {
            Logger.log(`\t${key}: ${value}`)
        }
    }
}

function processTransaction(stockTransaction: any, stockPosition: StockPosition): void {
    const side = stockTransaction.side
    const quantity = stockTransaction.quantity
    const price = stockTransaction.price
    if (side == 'BUY') {
        stockPosition.buy(quantity, price)
    } else if (side == 'SELL') {
        stockPosition.sell(quantity)
    }
}
