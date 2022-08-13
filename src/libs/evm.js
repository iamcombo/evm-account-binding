import { ethers } from 'ethers';
import { Wallet } from '@ethersproject/wallet';

export async function evm_balances(rpcProvider, address){   
  const provider = new ethers.providers.StaticJsonRpcProvider(rpcProvider);
  const balance = ethers.utils.formatEther(await provider.getBalance(address));
  return parseFloat(balance);
};

export function evm_address(privateKey) {
  const wallet = new Wallet(privateKey);
  return wallet.address;
}