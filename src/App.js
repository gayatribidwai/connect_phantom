import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Connection } from '@solana/web3.js';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);

  // Use useEffect to fetch the account balance when the wallet address changes
  useEffect(() => {
    if (walletAddress) {
      getAccountBalance();
    }
  }, [walletAddress]);

  window.onload = async function () {
    try {
      if (window.solana) {
        if (window.solana.isPhantom) {
          console.log('Phantom wallet found!');
          const res = await window.solana.connect({ onlyTrustes: true });
          console.log('Connected with public key:', res.publicKey.toString());
          setWalletAddress(res.publicKey.toString());
        }
      } else {
        alert('Wallet not found! Get a Phantom wallet');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectwallet = async () => {
    if (window.solana) {
      const res = await window.solana.connect();
      setWalletAddress(res.publicKey.toString());
    } else {
      alert('Wallet not found');
    }
  };

  const getAccountBalance = async () => {
    try {
      if (walletAddress) {
        const connection = new Connection('https://api.mainnet-beta.solana.com');
        const publicKey = new publicKey(walletAddress); // Declare and assign the publicKey variable
  
        // Fetch the account balance
        const balance = await connection.getBalance(publicKey);
        console.log('Account balance:', balance);
        setAccountBalance(balance);
      } else {
        console.error('No wallet address found.');
      }
    } catch (error) {
      console.error('Error fetching account balance:', error);
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        {!walletAddress && (
          <div>
            <button className="btn" onClick={connectwallet}>
              Connect Wallet
            </button>
            <button className="btn" onClick={getAccountBalance}>
              balance
            </button>
          </div>
        )}
        {walletAddress && (
          <div>
            <p>
              Connected Account: <span className="address">{walletAddress}</span>
            </p>
            
            <p>
                Account Balance: {accountBalance} 0 lamports {/* 1 SOL = 1,000,000,000 lamports */}
              </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
