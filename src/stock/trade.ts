namespace Stock {
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
                [TradeSheet.Header.date]: this.date,
                [TradeSheet.Header.ticker]: this.ticker,
                [TradeSheet.Header.quantity]: this.quantity,
                [TradeSheet.Header.avgBuyPrice]: this.avgBuyPrice,
                [TradeSheet.Header.sellPrice]: this.sellPrice,
                [TradeSheet.Header.profit]: this.calculateTradeProfit(),
                [TradeSheet.Header.profitPercentage]: this.calculateTradeProfitPercentage(),
            }
        }
    }
}
