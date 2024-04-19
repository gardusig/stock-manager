namespace Stock {
    export class Trade implements Sheet.Convertible {
        ticker: string
        quantity: number
        avgBuyPrice: number
        sellPrice: number

        constructor(ticker: string, quantity: number, avgBuyPrice: number, sellPrice: number) {
            this.ticker = ticker
            this.quantity = quantity
            this.avgBuyPrice = avgBuyPrice
            this.sellPrice = sellPrice
        }

        calculateTradeProfit(): number {
            return (this.sellPrice - this.avgBuyPrice) * this.quantity
        }

        calculateTradeProfitPercentage(): number {
            return (this.sellPrice / this.avgBuyPrice) - 1
        }

        buildSheetObject(): Record<string, any> {
            return {
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
