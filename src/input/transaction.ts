namespace Input {
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
            this.ticker = this.getNonFractionalTicker(stockTransaction.ticker)
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

        private getNonFractionalTicker(ticker: string): string {
            if (ticker[ticker.length - 1] == 'F') {
                return ticker.substring(0, ticker.length - 1)
            }
            return ticker
        }
    }
}
