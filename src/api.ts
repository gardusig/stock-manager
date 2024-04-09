export function generatePositionSheet() {
    const positionMap = StockUtil.getPositionMap()
    for (const stockPosition of positionMap.values()) {
        for (const [key, value] of Object.entries(stockPosition)) {
            Logger.log(`${key}: ${value}`)
        }
        StockUtil.savePositionMap(positionMap)
    }
}
