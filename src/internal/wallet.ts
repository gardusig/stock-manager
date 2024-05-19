namespace Manager {
    export class Wallet {
        positionManagerMap: Map<string, Manager.Position>

        constructor() {
            this.positionManagerMap = new Map<string, Manager.Position>()
        }

        processTransactions(): void {
            for (const transaction of Input.Transaction.Reader.readSheet()) {
                this.processTransaction(transaction)
            }
        }

        private processTransaction(transaction: Input.Transaction.Model): void {
            const ticker = transaction.ticker
            if (!this.positionManagerMap.has(ticker)) {
                const positionManager = new Manager.Position(ticker)
                this.positionManagerMap.set(ticker, positionManager)
            }
            const positionManager = this.positionManagerMap.get(ticker)!
            positionManager.processTransaction(transaction)
        }
    }
}
