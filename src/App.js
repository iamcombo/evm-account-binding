import React, { useState } from 'react';
import { useGlobal } from './context/globalContext';
import { bindAccount } from './libs/bindAccount';
import { shortenAddress } from './utils';

export default function App() {
  const { keyring } = useGlobal();
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const wallet = localStorage.getItem('current-account') ? shortenAddress(localStorage.getItem('current-account')) : '';

  async function handleBind() {
    try {
      await bindAccount({
        substrateProvider: "wss://rpc-testnet.selendra.org", 
        privateKey: privateKey, 
        evmProvider: 'https://testnet-evm.selendra.org', 
        password: password,
        keyring: keyring
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="max-w-[71rem] mx-auto">
      <div className="flex justify-center">
        <div className="card inline-block p-4 mt-8">
          <h1 className="text-2xl text-center text-[#f5f5f5] font-bold tracking-wider">EVM Accounts Binding</h1>
          <input value={privateKey} onChange={e => setPrivateKey(e.target.value)} type="text" placeholder="EVM Private key" className="bg-transparent input text-[#f5f5f5] input-bordered input-warning w-full max-w-md mt-8 rounded-full" />
          <label className='block mt-4'>Password for {wallet}:</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="bg-transparent input text-[#f5f5f5] input-bordered input-warning w-full max-w-md mt-2 rounded-full" />
          <button onClick={handleBind} className="btn btn-warning w-full max-w-md mt-4 rounded-full">Bind Account</button>
        </div>
      </div>
    </div>
  );
}
