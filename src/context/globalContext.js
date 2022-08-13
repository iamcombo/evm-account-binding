import { ApiPromise, WsProvider } from "@polkadot/api";
import { createContext, useContext, useEffect, useState } from "react";
import { keyring as Keyring } from "@polkadot/ui-keyring";

export const GlobalContext = createContext();
export const GlobalProvider = ({children}) => {
  const [api, setApi] = useState(null);
  const [keyring, setKeyring] = useState(null);

  useEffect(() => {
    async function connect() {
      const provider = new WsProvider('wss://rpc-testnet.selendra.org');
      const _api = new ApiPromise({ provider });
    
      // const decimals = _api.registry.chainDecimals;
      _api.on('ready', () => setApi(_api));
      _api.on('error', err => {
        console.log(err);
        setApi(null);
      });
    };
    connect();
  },[]);

  useEffect(() => {
    async function loadKeyring() {
      try {
        Keyring.loadAll({ ss58Format: 204, type: 'sr25519' });
        setKeyring(Keyring);
      } catch(e) {
        console.error(e);
      }
    }
    loadKeyring();
  },[]);

  return (
    <GlobalContext.Provider
      value={{
        api, 
        keyring
      }}
    >{children}</GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext);