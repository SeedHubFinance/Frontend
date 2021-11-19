// metamask connections start
function isMetaMaskInstalled() {
  const { ethereum } = window;
  if (!Boolean(ethereum)) {
    return { isInstalled: false, provider: null };
  }
  if (!ethereum.isMetaMask) {
    return { isInstalled: false, provider: null };
  }
  if (ethereum.isMetaMask && !ethereum.providers) {
    // this check will be true when only metamask extension is installed and coinbase is not installed
    return { isInstalled: true, provider: ethereum };
  }
  if (ethereum.isMetaMask && ethereum.providers) {
    // this check will be true when coinbase extension is installed along with metamask
    const provider = ethereum.providers.find((provider) => provider.isMetaMask);
    return { isInstalled: true, provider: provider };
    // ethereum.providers.forEach((provider) => {
    //   if (provider.isMetaMask) return { isInstalled: true, provider: provider };
    // });
  }
  return { isInstalled: false, provider: null };
}
async function isMetaMaskConnected(provider) {
  const accounts = await provider.request({ method: "eth_requestAccounts" });
  return {
    isConnected: accounts && accounts.length > 0,
    address: accounts[0],
    provider,
  };
}
export async function initialiseMetamask() {
  const { isInstalled, provider } = isMetaMaskInstalled();
  if (!isInstalled) {
    window.alert(
      "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
    );
    return { isConnected: false, address: null, provider };
  }
  return await isMetaMaskConnected(provider);
}
