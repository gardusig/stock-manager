export function generatePosition() {
    const positionMap = StockUtil.getPositionMap()
    for (const [key, value] of Object.entries(positionMap)) {
        Logger.log(`\t${key}: ${value}`)
    }
}
