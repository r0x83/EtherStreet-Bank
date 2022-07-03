import './App.css';
import {ethers} from 'ethers';
import {useState} from 'react';
import Vault from './EtherVault.json';
import Balances from '.components/Balances.js';
import Borrow from '.components/Borrow.js';
import Repay from '.components/Repay.js';


const vaultAddress = "0x0b82fA709CC4c4e026e4F05eE4D13Fa9C11cfd33"; //address of the deployed vault

function App() {
  // const [provider, setProvider] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [vaultContract, setVaultContract] = useState(undefined);


  const isConnected = () => Boolean(accounts[0]);

  const connectAccount = async () => {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
      initialize();
    }
  }

  async function initialize() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); //to sign the transaction
      const vaultContract = new ethers.Contract(
        vaultAddress,
        Vault.abi,
        signer
      );
      setVaultContract(vaultContract);
    }  
  }

  return (
    <div className="App">
      <header className="App-header">
        {isConnected() ? (
          <div>
            <p>
              Welcome {accounts[0]?.substring(0,10)}...
            </p>
            <div className='components'>
              <Balances/>
              <Borrow/>
              <Repay/>
            </div>
          </div>
        ) : (
          <div>
          <p>
            You are not connected
          </p>
          <button onClick={connectAccount} className="btn btn-primary">Connect Metamask</button>
        </div>
        )} 
      </header>
    </div>
  );
}

export default App;
