namespace Output.Position {
    export class Model implements Output.Model {
        ticker: string
        position: number
        totalPurchasePrice: number
        totalPurchaseQuantity: number

        constructor(ticker: string, position?: number, totalPurchasePrice?: number, totalPurchaseQuantity?: number) {
            this.ticker = ticker
            this.position = position ?? 0
            this.totalPurchasePrice = totalPurchasePrice ?? 0.0
            this.totalPurchaseQuantity = totalPurchaseQuantity ?? 0
        }

        buildSheetObject(): Record<string, any> {
            return {
                [Header.ticker]: this.ticker,
                [Header.avgPrice]: this.getAveragePurchasePrice(),
                [Header.position]: this.position,
            }
        }

        static getHeader() {
            return [
                Header.ticker,
                Header.avgPrice,
                Header.position,
            ]
        }
    }

    export function createSheet(positionList: Output.Position.Model[], sheetName?: string, header?: string[]): void {
        sheetName = sheetName ?? 'generatedPosition'
        header = header ?? Output.Position.Model.getHeader()
        Library.createSheet(sheetName, header, positionList)
    }

    enum Header {
        ticker = 'ticker',
        avgPrice = 'avgPrice',
        position = 'qty',
    }
}
