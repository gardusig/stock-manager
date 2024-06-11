namespace Util {
  export function createSheet<T extends Output.Model>(
    sheetName: string,
    header: string[],
    values: IterableIterator<T> | T[],
  ) {
    const sheet = new ShitDb.Mapper.ObjectToSheet(sheetName, header);
    const serializedObjects = [];
    for (const value of values) {
      const serializedObject = value.buildSheetObject();
      serializedObjects.push(serializedObject);
    }
    sheet.appendObjects(serializedObjects);
    trimSheet(sheetName);
    Logger.log(
      `Util: added ${serializedObjects.length} row(s) to sheet ${sheetName}`,
    );
  }

  export function trimSheetRows(sheetName: string): void {
    const formatter = new ShitDb.Util.Formatter(sheetName);
    formatter.trimRows();
    Logger.log(`Util: trimmed rows, sheetName: ${sheetName}`);
  }

  export function trimSheetColumns(sheetName: string): void {
    const formatter = new ShitDb.Util.Formatter(sheetName);
    formatter.trimColumns();
    Logger.log(`Util: trimmed columns, sheetName: ${sheetName}`);
  }

  export function trimSheet(sheetName: string): void {
    const formatter = new ShitDb.Util.Formatter(sheetName);
    formatter.trimRows();
    formatter.trimColumns();
  }
}
