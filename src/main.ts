export function fetchWallet() {
  const walletManager = new Internal.Wallet();
  walletManager.processTransactions();
  walletManager.processSheets();
}
