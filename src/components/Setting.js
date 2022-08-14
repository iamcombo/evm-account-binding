import React, { useState } from 'react'
import { CogIcon } from '@heroicons/react/outline'

export default function Setting() {
  const [evmProvider, setEvmProvider] = useState("https://testnet-evm.selendra.org");
  const [substrateProvider, setSubstrateProvider] = useState("wss://rpc-testnet.selendra.org");

  function handleDone() {
    localStorage.setItem('evm', evmProvider);
    localStorage.setItem('substrate', substrateProvider);
  }

  return (
    <div>
      <label for="my-modal" class="btn modal-button"><CogIcon className='w-6 h-6 mr-2' />Setting</label>

      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Setting</h3>
          <label className='block mt-4'>EVM Provider:</label>
          <input value={evmProvider} onChange={e => setEvmProvider(e.target.value)} type="text" placeholder="EVM Private key" className="bg-transparent input text-[#f5f5f5] input-bordered input-warning w-full max-w-md mt-2 rounded-full" />
          <label className='block mt-4'>Substrate Provider:</label>
          <input value={substrateProvider} onChange={e => setSubstrateProvider(e.target.value)} type="text" placeholder="EVM Private key" className="bg-transparent input text-[#f5f5f5] input-bordered input-warning w-full max-w-md mt-2 rounded-full" />
          <div class="modal-action">
            <label for="my-modal" class="btn" onClick={handleDone}>Done</label>
          </div>
        </div>
      </div>
    </div>
  )
}
