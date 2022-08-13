import { useState } from "react";
import { toast } from "react-hot-toast";
import { useGlobal } from "../context/globalContext";
import { shortenAddress } from "../utils";

export default function ImportAccount() {
  const { keyring } = useGlobal();
  const [files, setFiles] = useState();
  const [password, setPassword] = useState("");

  const handleFileChosen = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = e => {
      setFiles(e.target.result);
    };
  }

  const handleRestore = async() => {
    try {
      const json = JSON.parse(files);
      const pair = keyring.restoreAccount(json, password);
      localStorage.setItem('current-account', pair.address);
      toast.success('Wallet Imported!');
    } catch (error) {
      toast.error('something went wrong!');
      console.log(error);
    }
  }

  return (
    <div>
      <label htmlFor="my-modal-3" className="btn modal-button">Import Account</label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Import Account</h3>
          <label className="rounded-full btn w-full mt-6" htmlFor="upload">
            { files ? 
              shortenAddress(JSON.parse(files).address)
              :
              <p>Upload keystore file</p>
            }
          </label>
          <input
            id="upload"
            type="file"
            label="JSON File"
            accept=".json"
            onChange={handleFileChosen}
            hidden
          />
          <input 
            className="input input-bordered w-full rounded-full mt-4"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
          <button onClick={handleRestore} className="btn btn-warning w-full rounded-full mt-4">Import</button>
        </div>
      </div>
    </div>
  )
}
