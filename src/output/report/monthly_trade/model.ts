namespace Output.Report.MonthlyTrade {
    export class Model implements Output.Model {
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

        static getHeader(): string[] {
            return [
                Header.year,
                Header.month,
                Header.sold,
            ]
        }
    }

    export function createSheet(monthlyTradeReportList: Output.Report.MonthlyTrade.Model[], sheetName?: string, header?: string[]): void {
        sheetName = sheetName ?? 'generatedMonthlyReport'
        header = header ?? Output.Report.MonthlyTrade.Model.getHeader()
        Library.createSheet(sheetName, header, monthlyTradeReportList)
    }

    enum Header {
        year = 'year',
        month = 'month',
        sold = 'sold',
    }
}
