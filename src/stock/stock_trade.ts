namespace StockTrade {
    export class StockTrade implements StockUtil.SheetValue {
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

        buildSheetObject(): Record<string, any> {
            return {
                [TradeTableHeader.ticker]: this.ticker,
                [TradeTableHeader.quantity]: this.quantity,
                [TradeTableHeader.avgBuyPrice]: this.avgBuyPrice,
                [TradeTableHeader.sellPrice]: this.sellPrice,
                [TradeTableHeader.profit]: this.calculateTradeProfit(),
                [TradeTableHeader.profitPercentage]: this.calculateTradeProfitPercentage(),
            }
        }

        private calculateTradeProfit(): number {
            return (this.sellPrice - this.avgBuyPrice) * this.quantity
        }

        private calculateTradeProfitPercentage(): number {
            return (this.sellPrice / this.avgBuyPrice) - 1
        }
    }

    export function getHeader() {
        return [
            TradeTableHeader.ticker,
            TradeTableHeader.quantity,
            TradeTableHeader.avgBuyPrice,
            TradeTableHeader.sellPrice,
            TradeTableHeader.profit,
            TradeTableHeader.profitPercentage,
        ]
    }
}

enum TradeTableHeader {
    ticker = 'ticker',
    quantity = 'quantity',
    avgBuyPrice = 'avgBuyPrice',
    sellPrice = 'sellPrice',
    profit = 'profit',
    profitPercentage = 'profitPercentage',
}
