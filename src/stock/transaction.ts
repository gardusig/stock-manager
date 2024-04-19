namespace Stock {
    export class Transaction {
        date: string
        side: string
        ticker: string
        quantity: number
        unitPrice: number
        totalValue: number

        constructor(stockTransaction: any) {
            if (
                !stockTransaction.date ||
                !stockTransaction.side ||
                !stockTransaction.ticker ||
                !stockTransaction.quantity ||
                !stockTransaction.unitPrice ||
                !stockTransaction.totalValue
            ) {
                throw new Error('Missing required properties in stockTransaction')
            }
            this.date = stockTransaction.date
            this.side = stockTransaction.side
            this.ticker = getTrimmedTicker(stockTransaction.ticker)
            this.quantity = stockTransaction.quantity
            this.unitPrice = stockTransaction.unitPrice
            this.totalValue = stockTransaction.totalValue
        }

        isBuyOperation(): boolean {
            return this.side === 'Compra'
        }

        isSellOperation(): boolean {
            return this.side === 'Venda'
        }
    }
}

function getTrimmedTicker(ticker: string): string {
    return ticker.substring(0, 5)
}
