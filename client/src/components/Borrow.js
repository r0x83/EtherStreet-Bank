// import { useState, useEffect } from "react";
// import {ethers, BigNumber} from 'ethers';
// import { Box, Button, Flex, Input, Text} from '@chakra-ui/react';

// const Transact = ({ signer, vaultContract }) => {
//     const [deposit, setDeposit] = useState(null);
//     const [withdraw, setWithdraw] = useState(null);
//     const isConnected = Boolean(accounts[0]);

//     useEffect(()=>{
//         transact();
//     },[]);

//     async function transact() {
//         if (signer) {

//             try{
//                 const response = await contract.mint(BigNumber.from(mintAmount),{
//                     value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
//                 }); //calls mint function from the contract
//                 console.log('response: ',response);
//             }catch (err) {
//                 console.log("error: ",err)
//             }
//         }
//     }

//     const handleDecrement = () => {
//         if (mintAmount <= 1) 
//             return;
//         setMintAmount(mintAmount - 1);
//     };

//     const handleIncrement = () => {
//         if (mintAmount >= 3) 
//             return;
//         setMintAmount(mintAmount + 1);
//     };

//     return(
//         <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
//             <Box width="520px">
//                 <div>
//                   <Text fontSize="48px" textShadow="0 8px #000000" >ARCANE NFTs</Text>
//                   <Text
//                     fontSize="50px"
//                     letterSpacing="-5.5%"
//                     fontFamily="VT323"
//                     textShadow="0 2px 2px #000000"
//                    > 
//                       Tribute to one of the best Animated Series ever made.
//                    </Text>   
//                 </div>

//                 {isConnected ? (
//                     <div>
//                         <Flex align="center" justify="center">
//                             <Button
//                              backgroundColor="#D6517D"
//                              borderRadius="5px"
//                              boxShadow="0px 2px 2px 1px #0F0F0F"
//                              color="white"
//                              cursor="pointer"
//                              fontFamily="inherit"
//                              padding="15px"
//                              marginTop="10px" 
//                              onClick={handleDecrement}
//                             >
//                               -
//                             </Button>
//                             <Input
//                             //   readOnly
//                               fontFamily="inherit"
//                               width="100px"
//                               height="40px"
//                               textAlign="center"
//                               paddingLeft="19px"
//                               marginTop="10px"
//                               type="number" 
//                               value={mintAmount} />
                            
//                             <Button
//                              backgroundColor="#D6517D"
//                              borderRadius="5px"
//                              boxShadow="0px 2px 2px 1px #0F0F0F"
//                              color="white"
//                              cursor="pointer"
//                              fontFamily="inherit"
//                              padding="15px"
//                              marginTop="10px" 
//                              onClick={handleIncrement}
//                             >
//                               +
//                             </Button>
//                         </Flex>
                        
//                          <Button
//                          backgroundColor="#D6517D"
//                          borderRadius="5px"
//                          boxShadow="0px 2px 2px 1px #0F0F0F"
//                          color="white"
//                          cursor="pointer"
//                          fontFamily="inherit"
//                          padding="15px"
//                          marginTop="10px" 
//                          onClick={handleMint}
//                         >
//                           Mint Now
//                         </Button>
//                     </div>
//                 ):(
//                     <Text
//                      marginTop="70px"
//                      fontSize="43px"
//                      letterSpacing="-5.5%"
//                      fontFamily="VT323"
//                      textShadow="0 1px #000000"
//                      color="#5EB8FE"
//                     > 
//                       You must be connected to Mint.
//                     </Text>
//                 )}
//             </Box>
//         </Flex>
//     )
// }

// export default MainMint;