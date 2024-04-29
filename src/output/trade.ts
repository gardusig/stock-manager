namespace Sheet {
    export class Trade implements Sheet.Convertible {
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

        calculateTradeProfit(): number {
            return (this.sellPrice - this.avgBuyPrice) * this.quantity
        }

        calculateTradeProfitPercentage(): number {
            if (this.avgBuyPrice === 0) {
                return 1
            }
            return (this.sellPrice / this.avgBuyPrice) - 1
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

        static getHeader() {
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
