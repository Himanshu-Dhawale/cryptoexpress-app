// // src/stores/WalletStore.tsx
// import { makeAutoObservable } from 'mobx';
// import { importWallet, sendTransaction, getTransactionHistory, getTransactionStatus, getTransactionFee } from '../utils/api';

// class WalletStore {
//   currentNetwork: 'bitcoin' | 'polygon' = 'bitcoin';
//   walletAddress: string | null = null;
//   transactionHistory: Array<{
//     id: string;
//     receiver: string;
//     amount: string;
//     status: 'pending' | 'completed' | 'failed';
//     fee: string;
//     link: string;
//   }> = [];

//   constructor() {
//     makeAutoObservable(this);
//   }

//   setCurrentNetwork(network: 'bitcoin' | 'polygon') {
//     this.currentNetwork = network;
//   }

//   importWallet(privateKey: string) {
//     this.walletAddress = importWallet(this.currentNetwork, privateKey);
//   }

//   async sendTransaction(receiver: string, amount: string) {
//     const transaction = await sendTransaction(this.currentNetwork, this.walletAddress!, receiver, amount);
//     this.transactionHistory.push(transaction);
//   }

//   async fetchTransactionHistory() {
//     this.transactionHistory = await getTransactionHistory(this.currentNetwork, this.walletAddress!);
//   }

//   async getTransactionStatus(transactionId: string) {
//     return await getTransactionStatus(this.currentNetwork, transactionId);
//   }

//   async getTransactionFee(transactionId: string) {
//     return await getTransactionFee(this.currentNetwork, transactionId);
//   }
// }

// export default WalletStore;


// src/stores/WalletStore.tsx
import { makeAutoObservable } from 'mobx';
import { importWallet, sendTransaction, getTransactionHistory, getTransactionStatus, getTransactionFee } from '../utils/api';

class WalletStore {
  currentNetwork: 'bitcoin' | 'polygon' = 'bitcoin';
  walletAddress: string|any  ;
  transactionHistory: Array<{
    id: string;
    receiver: string;
    amount: string;
    status: 'pending' | 'completed' | 'failed';
    fee: string;
    link: string;
  }> = [
    {
      id: '0x1234',
      receiver: '0x5678',
      amount: '0.5 BTC',
      status: 'completed',
      fee: '0.0001 BTC',
      link: 'https://blockchain.com/tx/0x1234',
    },
    {
      id: '0x9012',
      receiver: '0x3456',
      amount: '0.1 USDT',
      status: 'pending',
      fee: '0.0005 MATIC',
      link: 'https://polygonscan.com/tx/0x9012',
    },
    {
      id: '0x7890',
      receiver: '0xabcd',
      amount: '1 BTC',
      status: 'failed',
      fee: '0.0002 BTC',
      link: 'https://blockchain.com/tx/0x7890',
    },
  ];

 
  constructor() {
    makeAutoObservable(this);
  }

  setCurrentNetwork(network: 'bitcoin' | 'polygon') {
    this.currentNetwork = network;
  }

   importWallet(privateKey: string|any) {
    this.walletAddress = importWallet(this.currentNetwork, privateKey);
    // console.log(this.currentNetwork, privateKey);
   console.log(this.currentNetwork, "currentNetwork");
   
    // console.log(this.walletAddress, "Honey Singh");
    
    // if(this.walletAddress === undefined){
    //   console.log("This doesn't");
      
    // }else{
    //   // console.log(this.currentNetwork, privateKey);
    //   console.log(this.walletAddress);  
    // }
  }

  
  

  async sendTransaction(receiver: string, amount: string) {
    const transaction = await sendTransaction(this.currentNetwork, this.walletAddress!, receiver, amount);
    this.transactionHistory.push(transaction);
  }

  async fetchTransactionHistory() {
    this.transactionHistory = await getTransactionHistory(this.currentNetwork, this.walletAddress!);
  }

  async getTransactionStatus(transactionId: string) {
    return await getTransactionStatus(this.currentNetwork, transactionId);
  }

  async getTransactionFee(transactionId: string) {
    return await getTransactionFee(this.currentNetwork, transactionId);
  }
}

export default WalletStore;