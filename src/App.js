import React, { useState } from 'react';
import { useGlobal } from './context/globalContext';
import { bindAccount } from './libs/bindAccount';
import { shortenAddress } from './utils';

export default function App() {
  const { keyring } = useGlobal();
  const [privateKey, setPrivateKey] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [evmProvider, setEvmProvider] = useState("https://testnet-evm.selendra.org");
  const [loading, setLoading] = useState(false);
  // const wallet = localStorage.getItem('current-account') ? shortenAddress(localStorage.getItem('current-account')) : '';

  async function handleBind() {
    try {
      setLoading(true);
      await bindAccount({
        substrateProvider: "wss://rpc-testnet.selendra.org", 
        privateKey, 
        evmProvider, 
        mnemonic,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="max-w-[71rem] mx-auto">
      <div className="flex justify-center">
        <div className="card inline-block p-4 mt-8">
          <h1 className="text-2xl text-center text-[#f5f5f5] font-bold tracking-wider">EVM Accounts Binding</h1>
          <label className='block mt-4'>EVM Provider:</label>
          <input value={evmProvider} onChange={e => setEvmProvider(e.target.value)} type="text" placeholder="EVM Private key" className="bg-transparent input text-[#f5f5f5] input-bordered input-warning w-full max-w-md mt-2 rounded-full" />
          <label className='block mt-4'>EVM Private Key:</label>
          <input value={privateKey} onChange={e => setPrivateKey(e.target.value)} type="text" placeholder="EVM Private key" className="bg-transparent input text-[#f5f5f5] input-bordered input-warning w-full max-w-md mt-2 rounded-full" />
          <label className='block mt-4'>Mnemonic:</label>
          <input type='text' value={mnemonic} onChange={e => setMnemonic(e.target.value)} placeholder="Mnemonic" className="bg-transparent input text-[#f5f5f5] input-bordered input-warning w-full max-w-md mt-2 rounded-full" />
          <button onClick={handleBind} className={`btn btn-warning w-full max-w-md mt-4 rounded-full ${loading ? 'loading' : ''}`}>Bind Account</button>
        </div>
      </div>
    </div>
  );
}
