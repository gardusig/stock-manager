namespace StockUtil {
    export interface SheetValue {
        buildSheetObject(): Record<string, any>
    }

    export function getStockTransactionList() {
        const transactionSheet = new ShitDb.SheetToObjectMapper.SheetToObjectMapper('transaction')
        const stockTransactionList = transactionSheet.getAllObjects()
        return stockTransactionList
    }

    export function createSheet<T extends StockUtil.SheetValue>(sheetName: string, header: string[], values: IterableIterator<T> | T[]) {
        const sheet = new ShitDb.ObjectToSheetMapper.ObjectToSheetMapper(sheetName, header)
        const serializedObjects = []
        for (const value of values) {
            const serializedObject = value.buildSheetObject()
            serializedObjects.push(serializedObject)
            Logger.log(`adding element to sheetName: ${sheetName}`)
            for (const [key, value] of Object.entries(serializedObject)) {
                Logger.log(`\t${key}: ${value}`)
            }
        }
        sheet.appendObjects(serializedObjects)
        sheet.trimRows()
        sheet.trimColumns()
    }
}
