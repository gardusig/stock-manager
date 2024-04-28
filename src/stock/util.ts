namespace Stock {
    export function getStockTransactionList() {
        const transactionSheet = new ShitDb.Mapper.SheetToObject('transaction')
        const stockTransactionList = transactionSheet.getAllObjects()
        return stockTransactionList
    }

    export function createSheet<T extends Sheet.Convertible>(sheetName: string, header: string[], values: IterableIterator<T> | T[]) {
        const sheet = new ShitDb.Mapper.ObjectToSheet(sheetName, header)
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
        const formatter = new ShitDb.Util.Formatter(sheetName)
        formatter.trimRows()
        formatter.trimColumns()
    }
}
