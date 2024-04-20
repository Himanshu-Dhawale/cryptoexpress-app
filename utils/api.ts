// // src/utils/api.ts
// const API_ENDPOINTS = {
//     bitcoin: {
//       importWallet: 'https://api.blockchain.com/v3/user/wallet/import',
//       sendTransaction: 'https://api.blockchain.com/v3/user/wallet/send',
//       getTransactionHistory: 'https://api.blockchain.com/v3/user/wallet/transactions',
//       getTransactionStatus: 'https://api.blockchain.com/v3/user/wallet/transaction',
//       getTransactionFee: 'https://api.blockchain.com/v3/user/wallet/transaction',
//     },
//     polygon: {
//       importWallet: 'https://api.polygonscan.com/api?module=account&action=importwallet',
//       sendTransaction: 'https://api.polygonscan.com/api?module=account&action=sendtx',
//       getTransactionHistory: 'https://api.polygonscan.com/api?module=account&action=txlist',
//       getTransactionStatus: 'https://api.polygonscan.com/api?module=transaction&action=getstatus',
//       getTransactionFee: 'https://api.polygonscan.com/api?module=transaction&action=gasprice',
//     },
//   };
  
//   export const importWallet = (network: 'bitcoin' | 'polygon', privateKey: string) => {
//     // Implement wallet import logic using the API endpoint
//     const response = await fetch(API_ENDPOINTS[network].importWallet, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ privateKey }),
//     });
//     const { walletAddress } = await response.json();
//     return walletAddress;
//   };
  
//   export const sendTransaction = async (
//     network: 'bitcoin' | 'polygon',
//     walletAddress: string,
//     receiver: string,
//     amount: string
//   ) => {
//     // Implement send transaction logic using the API endpoint
//     const response = await fetch(API_ENDPOINTS[network].sendTransaction, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ walletAddress, receiver, amount }),
//     });
//     const { transactionId, status, fee, link } = await response.json();
//     return { id: transactionId, receiver, amount, status, fee, link };
//   };
  
//   export const getTransactionHistory = async (
//     network: 'bitcoin' | 'polygon',
//     walletAddress: string
//   ) => {
//     // Implement get transaction history logic using the API endpoint
//     const response = await fetch(`${API_ENDPOINTS[network].getTransactionHistory}?address=${walletAddress}`);
//     const transactions = await response.json();
//     return transactions.map(({ id, receiver, amount, status, fee, link }) => ({
//       id,
//       receiver,
//       amount,
//       status,
//       fee,
//       link,
//     }));
//   };
  
//   export const getTransactionStatus = async (
//     network: 'bitcoin' | 'polygon',
//     transactionId: string
//   ) => {
//     // Implement get transaction status logic using the API endpoint
//     const response = await fetch(`${API_ENDPOINTS[network].getTransactionStatus}?txid=${transactionId}`);
//     const { status } = await response.json();
//     return status;
//   };
  
//   export const getTransactionFee = async (
//     network: 'bitcoin' | 'polygon',
//     transactionId: string
//   ) => {
//     // Implement get transaction fee logic using the API endpoint
//     const response = await fetch(`${API_ENDPOINTS[network].getTransactionFee}?txid=${transactionId}`);
//     const { fee } = await response.json();
//     return fee;
//   };


// src/utils/api.ts
const API_ENDPOINTS = {
  bitcoin: {
    importWallet: 'https://api.blockchain.com/v3/user/wallet/import',
    sendTransaction: 'https://api.blockchain.com/v3/user/wallet/send',
    getTransactionHistory: 'https://api.blockchain.com/v3/user/wallet/transactions',
    getTransactionStatus: 'https://api.blockchain.com/v3/user/wallet/transaction',
    getTransactionFee: 'https://api.blockchain.com/v3/user/wallet/transaction',
  },
  polygon: {
    importWallet: 'https://api.polygonscan.com/api?module=account&action=importwallet',
    sendTransaction: 'https://api.polygonscan.com/api?module=account&action=sendtx',
    getTransactionHistory: 'https://api.polygonscan.com/api?module=account&action=txlist',
    getTransactionStatus: 'https://api.polygonscan.com/api?module=transaction&action=getstatus',
    getTransactionFee: 'https://api.polygonscan.com/api?module=transaction&action=gasprice',
  },
};

export const fetchBitcoinPrice = async () => {
  const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  const data = await response.json();
  return data.bpi.USD.rate_float;
};

export const fetchUSDTPrice = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
  const data = await response.json();
  return data.tether.usd;
};

export const importWallet = async (network: 'bitcoin' | 'polygon', privateKey: string) => {
  const response = await fetch(API_ENDPOINTS[network].importWallet, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ privateKey }),
  });
  const { walletAddress } = await response.json();
  console.log("from api", walletAddress);
  
  return walletAddress;
};

export const sendTransaction = async (
  network: 'bitcoin' | 'polygon',
  walletAddress: string,
  receiver: string,
  amount: string
) => {
  const response = await fetch(API_ENDPOINTS[network].sendTransaction, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ walletAddress, receiver, amount }),
  });
  const { transactionId, status, fee, link } = await response.json();
  return { id: transactionId, receiver, amount, status, fee, link };
};

export const getTransactionHistory = async (
  network: 'bitcoin' | 'polygon',
  walletAddress: string
) => {
  const response = await fetch(`${API_ENDPOINTS[network].getTransactionHistory}?address=${walletAddress}`);
  const transactions = await response.json();
  return transactions.map(({ id, receiver, amount, status, fee, link }) => ({
    id,
    receiver,
    amount,
    status,
    fee,
    link,
  }));
};

export const getTransactionStatus = async (
  network: 'bitcoin' | 'polygon',
  transactionId: string
) => {
  const response = await fetch(`${API_ENDPOINTS[network].getTransactionStatus}?txid=${transactionId}`);
  const { status } = await response.json();
  return status;
};

export const getTransactionFee = async (
  network: 'bitcoin' | 'polygon',
  transactionId: string
) => {
  const response = await fetch(`${API_ENDPOINTS[network].getTransactionFee}?txid=${transactionId}`);
  const { fee } = await response.json();
  return fee;
};
