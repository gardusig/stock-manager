namespace Manager {
    export class Position {
        tradeList: Sheet.Trade[]
        positionMap: Map<string, Sheet.Position>

        constructor() {
            this.tradeList = []
            this.positionMap = new Map<string, Sheet.Position>()
        }

        processTransaction(stockTransaction: Input.Transaction): Sheet.Trade | null {
            const ticker = stockTransaction.ticker
            if (!this.positionMap.has(ticker)) {
                const position = new Sheet.Position(ticker)
                this.positionMap.set(ticker, position)
            }
            const stockPosition = this.positionMap.get(ticker)!
            const trade = stockPosition.update(stockTransaction)
            if (stockPosition.position <= 0) {
                this.positionMap.delete(ticker)
            }
            if (trade !== null) {
                this.tradeList.push(trade)
            }
            return trade
        }

        createPositionSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedPosition'
            header = header ?? Sheet.Position.getHeader()
            SheetUtil.createSheet(sheetName, header, this.positionMap.values())
        }

        createTradeSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedTrade'
            header = header ?? Sheet.Trade.getHeader()
            SheetUtil.createSheet(sheetName, header, this.tradeList)
        }
    }
}
