namespace Input.Transaction {
  export interface StockTransaction {
    date: string;
    side: string;
    market: string;
    expiration: string;
    institution: string;
    ticker: string;
    quantity: string;
    unitPrice: string;
    totalValue: string;
  }
}
