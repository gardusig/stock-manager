namespace Output.Trade {
    export class Model implements Output.Model {
        date: string
        ticker: string
        quantity: number
        avgBuyPrice: number
        sellPrice: number

        constructor(date: string, ticker: string, quantity: number, avgBuyPrice: number, sellPrice: number) {
            this.date = date
            this.ticker = ticker
            this.quantity = quantity
            this.avgBuyPrice = avgBuyPrice
            this.sellPrice = sellPrice
        }

        buildSheetObject(): Record<string, any> {
            return {
                [Header.date]: this.date,
                [Header.ticker]: this.ticker,
                [Header.quantity]: this.quantity,
                [Header.avgBuyPrice]: this.avgBuyPrice,
                [Header.sellPrice]: this.sellPrice,
                [Header.profit]: this.calculateTradeProfit(),
                [Header.profitPercentage]: this.calculateTradeProfitPercentage(),
            }
        }

        static getHeader(): string[] {
            return [
                Header.date,
                Header.ticker,
                Header.quantity,
                Header.avgBuyPrice,
                Header.sellPrice,
                Header.profit,
                Header.profitPercentage,
            ]
        }

        private calculateTradeProfit(): number {
            return (this.sellPrice - this.avgBuyPrice) * this.quantity
        }

        private calculateTradeProfitPercentage(): number {
            if (this.avgBuyPrice === 0) {
                return 1
            }
            return (this.sellPrice / this.avgBuyPrice) - 1
        }
    }

    export function createSheet(tradeList: Output.Trade.Model[], sheetName?: string, header?: string[]): void {
        sheetName = sheetName ?? 'generatedTrade'
        header = header ?? Output.Trade.Model.getHeader()
        Library.createSheet(sheetName, header, tradeList)
    }

    enum Header {
        date = 'date',
        ticker = 'ticker',
        quantity = 'quantity',
        avgBuyPrice = 'avgBuyPrice',
        sellPrice = 'sellPrice',
        profit = 'profit',
        profitPercentage = 'profitPercentage',
    }
}
