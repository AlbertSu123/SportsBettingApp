// import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import Web3 from 'web3';
import { betAbi } from './abi/abis';
const web3 = new Web3(Web3.givenProvider);

function App() {
  // const [number, setNumber] = useState(0);
  const contractAddr = '0x92E57A92a365e47380e0a7F94a0b1a9c7edb292D'
  const bet = new web3.eth.Contract(betAbi, contractAddr);
  const [getAmountOne, setAmountOne] = useState('0x00');
  
  const handleAmountOne = async(e) => {
    e.preventDefault();
    const result = await bet.methods.AmountOne.call();
    setAmountOne(result);
    console.log(result);
  };
  const handleSet = async (e) => {
    e.preventDefault();    
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await contract.methods.set(number)
                        .estimateGas();
    const result = await contract.methods.set(number).send({
      from: account,
      gas 
    })
    console.log(result);
  }

  return (
      <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input 
              type="text"
              name="name"
              value={number}
              onChange={ e => setNumber(e.target.value) } />
          </label>
          <input type="submit" value="Set Number" />
        </form>
        <br/>
        <button
          onClick={handleAmountOne}
          type="button" > 
          Get Team 1 Total 
        </button>
        { getAmountOne }
      </header>
    </div> 
  );
}

export default App;
  //  <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>