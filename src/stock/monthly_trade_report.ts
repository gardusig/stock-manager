namespace Stock {
    export class MonthlyTradeReport implements Sheet.Convertible {
        year: string
        month: string
        totalSold: number

        constructor(year: string, month: string, totalSold: number) {
            this.year = year
            this.month = month
            this.totalSold = totalSold
        }

        buildSheetObject(): Record<string, any> {
            return {
                [Header.year]: this.year,
                [Header.month]: this.month,
                [Header.sold]: this.totalSold,
            }
        }

        static getHeader() {
            return [
                Header.year,
                Header.month,
                Header.sold,
            ]
        }
    }

    enum Header {
        year = 'year',
        month = 'month',
        sold = 'sold',
    }
}
