import { options } from "@selendra/api";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { create_signature } from "./createSignature";
import { evm_address, evm_balances } from "./evm";
import toast from "react-hot-toast";

export const bindAccount = async({
  substrateProvider, 
  privateKey, 
  evmProvider, 
  password,
  keyring
}) => {
  try {
    const provider = new WsProvider(substrateProvider);
    const api = new ApiPromise(options({ provider }));
    await api.isReadyOrError;

    // const substrateWallet = keyring.addFromMnemonic('');
    const _account = localStorage.getItem('current-account');
    const substrateWallet = keyring.getPair(_account);
    substrateWallet.decodePkcs8(password);
    console.log(substrateWallet);
    const genesisHash = api.genesisHash.toString();
    const chainId = parseInt(api.consts.evmAccounts.chainId.toString());
    const evmAddress = evm_address(privateKey);
    const balance = await evm_balances(evmProvider, evmAddress);
    console.log(balance);

    if (balance > 0) {
      throw new Error('Account already exit, please use new evm account');
    };

    const signature = create_signature({privateKey, genesisHash, chainId, substrateAddress: _account});

    const hash = await api.tx.evmAccounts
      .claimAccount(evmAddress, signature)
      .signAndSend(substrateWallet);

    return hash;
  } catch (error) {
    toast.error('Something went wrong');
    console.log(error);
  }
}