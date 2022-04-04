import { Contract, ethers, utils } from "ethers";

const addresses = {
  WETH: '0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4',
  router: '0xf564ef0034bb7d7cd84412275e1e51364d4d7734',
  USDC: '0x321106E51b78E0E9CEBcFeC63C5250F0F3CcB82b',
  recipient: '0x007E8cAdB9221690fdf4A84acDc9A567D91FC2b4'
}

const myWalletKey = "NotToday"
const myWalletAddr = "0x7ed8cEDbd9c07F66b60ED846e2b710d40A44bC00"
const url = "http://localhost:8545"

const provider = new ethers.providers.JsonRpcProvider(url);
// const signer = new ethers.Wallet(myWalletKey, provider);
const signer = provider.getSigner("0x7ed8cEDbd9c07F66b60ED846e2b710d40A44bC00")

const usdcContract = new Contract(
  addresses.USDC,
  [
    'function balanceOf(address owner) external view returns (uint)',
    'function approve(address spender, uint amount) public returns(bool)'
  ],
  signer
);

const wethContract = new ethers.Contract(
  addresses.WETH,
  [
    'function approve(address spender, uint amount) public returns(bool)',
  ],
  signer
);

const router = new ethers.Contract(
  addresses.router,
  [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
    'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
  ],
  signer
);


const main = async () => {

  console.log("------- Balances of sender before -------")
  const usdcBalanceB4 = await usdcContract.balanceOf(myWalletAddr);
  const ethBalanceB4 = await provider.getBalance(myWalletAddr)
  console.log("USDC Balance is ", utils.formatUnits(usdcBalanceB4, 6))
  console.log("ETH balance is ", utils.formatEther(ethBalanceB4))

  console.log("------- Balances of recipient before -------")
  const ethBalanceRecB4 = await provider.getBalance(addresses.recipient)
  console.log("ETH balance is ", utils.formatEther(ethBalanceRecB4))

  const txApprove = await usdcContract.approve(
    router.address,
    utils.parseUnits("30", 6)
  )

  const approveReceipt = await txApprove.wait();

  console.log("\nWithdrawal Approved\n")

  const deadline = Math.floor(Date.now() / 1000) + 60 * 5;

  const tx = await router.swapExactTokensForETH(
    utils.parseUnits("30", 6),
    utils.parseUnits("0.001", 18),
    [
      addresses.USDC,
      addresses.WETH
    ],
    addresses.recipient,
    deadline,
    { gasPrice: 5000000000000, gasLimit: 1000000 }
  )

  const receipt = await tx.wait();

  const usdcBalanceAfter = await usdcContract.balanceOf(myWalletAddr);
  const ethBalanceAfter = await provider.getBalance(myWalletAddr)
  console.log("------- Balances of sender after -------")
  console.log("USDC Balance is ", utils.formatUnits(usdcBalanceAfter, 6))
  console.log("ETH balance is ", utils.formatEther(ethBalanceAfter))

  console.log("------- Balances of recipient before -------")
  const ethBalanceReceipientAfter = await provider.getBalance(addresses.recipient)
  console.log("ETH balance is ", utils.formatEther(ethBalanceReceipientAfter), "\n\n")


  console.log("At http://localhost:4000/address/0x007E8cAdB9221690fdf4A84acDc9A567D91FC2b4/transactions tx is not shown and balance is incorrect")

}


main();