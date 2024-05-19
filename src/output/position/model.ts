namespace Output.Position {
    export class Model implements Output.Model {
        ticker: string
        position: number
        avgPrice: number

        constructor(ticker: string, position: number, avgPrice: number) {
            this.ticker = ticker
            this.position = position
            this.avgPrice = avgPrice
        }

        buildSheetObject(): Record<string, any> {
            return {
                [Header.ticker]: this.ticker,
                [Header.avgPrice]: this.avgPrice,
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
        Util.createSheet(sheetName, header, positionList)
    }

    enum Header {
        ticker = 'ticker',
        avgPrice = 'avgPrice',
        position = 'qty',
    }
}
