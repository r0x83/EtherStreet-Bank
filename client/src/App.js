import './App.css';
import {ethers} from 'ethers';
import {useState} from 'react';
import Vault from './EtherVault.json';
import Balances from './components/Balances.js';


const vaultAddress = "0x6067938cfaEcB52fe6E16a95148e8dfd245b28b8"; //address of the deployed vault

function App() {
  // const [provider, setProvider] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [signer, setSigner] = useState(undefined);
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
      setSigner(signer);
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
              <Balances signer={signer} vaultContract={vaultContract}/>
              
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
