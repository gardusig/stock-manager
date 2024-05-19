namespace Util {
    export function createSheet<T extends Output.Model>(sheetName: string, header: string[], values: IterableIterator<T> | T[]) {
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
        trimSheet(sheetName)
    }

    export function trimSheetRows(sheetName: string): void {
        const formatter = new ShitDb.Util.Formatter(sheetName)
        formatter.trimRows()
    }

    export function trimSheetColumns(sheetName: string): void {
        const formatter = new ShitDb.Util.Formatter(sheetName)
        formatter.trimColumns()
    }

    export function trimSheet(sheetName: string): void {
        const formatter = new ShitDb.Util.Formatter(sheetName)
        formatter.trimRows()
        formatter.trimColumns()
    }
}
