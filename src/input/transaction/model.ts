namespace Input.Transaction {
    export class Model {
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
            if (ticker[ticker.length - 1] === 'F') {
                return ticker.substring(0, ticker.length - 1)
            }
            return ticker
        }
    }

    export function getTransactionList(): Input.Transaction.Model[] {
        const transactionList: Input.Transaction.Model[] = []
        const rawTransactionList = readSheet()
        for (let i = rawTransactionList.length - 1; i >= 0; i--) {
            const transaction = new Input.Transaction.Model(rawTransactionList[i])
            transactionList.push(transaction)
        }
        return transactionList
    }

    export function readSheet(sheetName?: string): any[] {
        sheetName = sheetName ?? 'transaction'
        const transactionSheet = new ShitDb.Mapper.SheetToObject(sheetName)
        return transactionSheet.getAllObjects()
    }
}
