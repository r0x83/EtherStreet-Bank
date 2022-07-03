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
            const [eth,token] = await vaultContract.getBalance(signer.getAddress());
            setEtherDeposited(eth/(10**18).toString());
            setTokenBorrowed(token/(10**18).toString());
            console.log(eth.toString())
            console.log(token/(10**36).toString())
        
        try{
            // console.log(etherDeposited);
        }catch (err) {
            console.log("error: ",err)
        }
    }
    }

    const deposit = async (wei) => {
        if(signer){
          try{
            // console.log('blaaaaah')
            console.log(wei.toString())
            console.log({value:wei.toString()})
            const Deposit = await vaultContract.depositEther(
              (wei.toString()),
              { value:wei.toString() }); //msg.value is passed as wei
            await Deposit.wait();
           
            // console.log('blaaaaah')
          }
          catch(err){
            alert('Deposit failed');
            // console.log(amount)

          }
        }   
      }
    
      const withdraw = async (wei) => {
        try{
          console.log(wei.toString())
          console.log(amount)
          const Withdraw = await vaultContract.connect(signer).withdrawEther(wei.toString());
          await Withdraw.wait();
        }
        catch(err){
          alert('Withdraw failed');
          // console.log(amount)
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
        <p>Vault Ether Balance: </p> {etherDeposited} ether
        <p>Vault Token Balance: </p> {tokenBorrowed} tokens

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