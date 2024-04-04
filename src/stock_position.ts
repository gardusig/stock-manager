export class StockPosition {
    ticker: string
    position: number
    totalPurchasePrice: number
    totalPurchaseQuantity: number

    constructor(ticker: string) {
        this.ticker = ticker
        this.position = 0
        this.totalPurchasePrice = 0.0
        this.totalPurchaseQuantity = 0.0
    }

    getAveragePurchasePrice() {
        return this.totalPurchasePrice / this.totalPurchaseQuantity
    }

    buy(quantity: number, price: number) {
        this.position += quantity
        this.totalPurchaseQuantity += quantity
        this.totalPurchasePrice += (quantity * price)
    }

    sell(quantity: number) {
        this.position -= quantity
    }
}
