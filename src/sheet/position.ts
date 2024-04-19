namespace PositionSheet {
    export function getHeader() {
        return [
            Header.ticker,
            Header.avgPrice,
            Header.position,
        ]
    }

    export enum Header {
        ticker = 'ticker',
        avgPrice = 'avgPrice',
        position = 'qty',
    }
}
