import './App.css';
import {ethers} from 'ethers';
import {useEffect, useState} from 'react';

import VaultArtifact from './EtherVault.json';
import TokenArtifact from './StableCoin.json';
import { Signer } from 'ethers';


function App() {
  const [provider, setProvider] = useState(undefined);
  // const [signer, setSigner] = useState(undefined);
  const [accounts, setAccounts] = useState([]);

  // const [signerAddress, setSignerAddress] = useState(undefined);
  const [vaultContract, setVaultContract] = useState(undefined);

  const toBytes32 = text => ( ethers.utils.formatBytes32String(text));
  // const toString = bytes32 => (ethers.utils.parseBytes32String(bytes32));
  // const toWei = ether => (ethers.utils.parseEther(ether));
  const toEther = wei => (ethers.utils.formatEther(wei).toString());
  // const toRound = num => (Number(num).toFixed(2));

  useEffect(()=> {
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const vaultContract = await new ethers.Contract(0x0b82fA709CC4c4e026e4F05eE4D13Fa9C11cfd33,VaultArtifact.abi)
      setVaultContract(vaultContract)
    }
  })

  const isConnected = () => Boolean(accounts[0]);

  const connectAccount = async () => {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  const getTokenBalance = async () =>{
    const balance = await vaultContract.connect(accounts[0]).getBalance( toBytes32(accounts[0]))
    return toEther(balance)
  }

  return (
    <div className="App">
      <header className="App-header">
        {isConnected() ? (
          <div>
            <p>
              Welcome {accounts[0]?.substring(0,10)}...
            </p>
            <div>
              <div className="token balance">
                <p>
                  Token Balance = {getTokenBalance}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
          <p>
            You are not connected
          </p>
          <button onClick={connectAccount} className="btn btn-primary">Connssect Metamask</button>
        </div>
        )} 
      </header>
    </div>
  );
}

export default App;
