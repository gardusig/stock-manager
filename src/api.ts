export function getStockTransactionList() {
    const transactionSheet = new ShitDb.createSheetToObjectMapper("transaction");
    let stockTransactionList = transactionSheet.getAllRows();
    stockTransactionList.sort(
        (a, b) => {
            return new Date(a.date) - new Date(b.date);
        }
    );
    return stockTransactionList
}

function skibiribab() {
    const stockTransactionList = getStockTransactionList();
    for (let i = 0; i < stockTransactionList.length; i++) {
        const stockTransaction = stockTransactionList[i];
        Logger.log("stockTransaction:");
        for (const [key, value] of Object.entries(stockTransaction)) {
            Logger.log(`\t${key}: ${value}`);
        }
    }
}
