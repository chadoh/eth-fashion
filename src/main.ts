import renderIdenticon from './renderIdenticon'

declare global {
  interface Window {
    ethereum: any; // No available typedefs for MetaMask?
  }
}

function signIn(account) {
  const web3off = document.getElementById('web3-off')
  const web3on = document.getElementById('web3-on')
  console.log(web3off, web3on)
  web3off.style.display = 'none'
  web3on.style.display = ''
}

(async () => {
  if (window.ethereum) {
    const [account] = await window.ethereum.enable()
    signIn(account)
    renderIdenticon(account)
  }
})();
