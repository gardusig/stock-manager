namespace StockWallet {
    export class StockWallet {
        positionMap: Map<string, StockPosition.StockPosition>

        constructor() {
            this.positionMap = new Map<string, StockPosition.StockPosition>()
            const stockTransactionList = getStockTransactionList()
            for (let i = 0; i < stockTransactionList.length; i++) {
                processTransaction(stockTransactionList[i], this.positionMap)
            }
        }

        createSheet(): void {
            const sheetName = 'generatedPosition'
            const positionSheet = ShitDb.createObjectToSheetMapper(sheetName, getHeader())
            const serializedObjects = []
            for (const positionObject of this.positionMap.values()) {
                const serializedObject = buildSheetObject(positionObject)
                serializedObjects.push(serializedObject)
                Logger.log(`adding element to sheetName: ${sheetName}`)
                for (const [key, value] of Object.entries(serializedObject)) {
                    Logger.log(`\t${key}: ${value}`)
                }
            }
            positionSheet.appendObjects(serializedObjects)
        }
    }
}

function getStockTransactionList() {
    const transactionSheet = ShitDb.createSheetToObjectMapper('transaction')
    const stockTransactionList = transactionSheet.getAllObjects()
    return stockTransactionList
}

function processTransaction(stockTransaction: any, positionMap: Map<string, StockPosition.StockPosition>): void {
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

function updateStockPosition(stockTransaction: any, stockPosition: StockPosition.StockPosition): void {
    const side = stockTransaction.side
    const quantity = stockTransaction.quantity
    const price = stockTransaction.price
    if (side == 'BUY') {
        stockPosition.buy(quantity, price)
    } else if (side == 'SELL') {
        stockPosition.sell(quantity)
    }
}

enum PositionTableHeader {
    ticker = 'ticker',
    avgPrice = 'avgPrice',
    position = 'qty',
}

function buildSheetObject(stockPosition: StockPosition.StockPosition) {
    return {
        [PositionTableHeader.ticker]: stockPosition.ticker,
        [PositionTableHeader.avgPrice]: stockPosition.getAveragePurchasePrice(),
        [PositionTableHeader.position]: stockPosition.position,
    }
}

function getHeader() {
    return [
        PositionTableHeader.ticker,
        PositionTableHeader.avgPrice,
        PositionTableHeader.position,
    ]
}
