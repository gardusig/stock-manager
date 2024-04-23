namespace Sheet {
    export interface Convertible {
        buildSheetObject(): Record<string, any>
    }
}
