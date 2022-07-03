import {useState, useEffect } from "react";
import {ethers, BigNumber} from "ethers";
import Modal from "./Modal.js";


const Balances = ({signer,vaultContract}) => {
    const [etherDeposited, setEtherDeposited] = useState(null);
    const [tokenBorrowed, setTokenBorrowed] = useState(null);

    const [amount, setAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isDeposit, setIsDeposit] = useState(true);

    const toWei = ether => ( ethers.utils.parseEther(ether) );


    useEffect(()=>{
        getVaultBalances();
    },[]);

    async function getVaultBalances() {
        if(signer){
            const [eth,token] = await vaultContract.connect(signer).getBalance();
            setEtherDeposited((ethers.utils.formatEther(eth)).toString());
            setTokenBorrowed((ethers.utils.formatEther(token)).toString());
        
        try{
            console.log(etherDeposited);
        }catch (err) {
            console.log("error: ",err)
        }
    }
    }

    const deposit = async (wei) => {
        if(etherDeposited){
          try{
            const txn = await vaultContract.connect(signer).depositEther({ value: ethers.utils.parseEther(wei) });
            await txn.wait();
          }
          catch(err){
            alert('Transaction failed');
            console.log(amount)

          }
        }   
      }
    
      const withdraw = async (wei) => {
        try{
          const txn = await vaultContract.connect(signer).withdrawEther({ value: ethers.utils.parseEther(wei) });
          await txn.wait();
        }
        catch(err){
          alert('Transaction failed');
          console.log(amount)
        }
      }  

      const depositOrWithdraw = (e) => {
        e.preventDefault();
        const wei = toWei(amount)
    
        if(isDeposit) {
          deposit(wei)
        } else {
          withdraw(wei)
        }
      }

      const displayModal = () => {
        setShowModal(true)
      }

    return (
        <>
        <p>Vault Ether Balance: </p> {etherDeposited}
        <p>Vault Token Balance: </p> {tokenBorrowed}

        <div className="d-flex gap-4 col-md-6">
                        <button onClick={ () => displayModal() } className="btn btn-primary">Deposit/Withdraw</button>
                        <Modal
                          show={showModal}
                          onClose={() => setShowModal(false)}
                          // symbol={selectedSymbol}
                          depositOrWithdraw={depositOrWithdraw}
                          isDeposit={isDeposit}
                          setIsDeposit={setIsDeposit}
                          setAmount={setAmount}
                        />
                      </div>
        </>
    )
}

export default Balances;