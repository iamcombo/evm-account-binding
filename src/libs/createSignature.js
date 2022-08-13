import { createClaimSignature } from '@selendra/eth-transactions';
import { Wallet } from '@ethersproject/wallet';

export function create_signature({
  privateKey,
  genesisHash,
  chainId,
  substrateAddress
}){
  const wallet = new Wallet(privateKey);
  const signature = createClaimSignature(wallet.privateKey, {
    salt: genesisHash,
    chainId: chainId,
    substrateAddress: substrateAddress
  });

  return signature;
}