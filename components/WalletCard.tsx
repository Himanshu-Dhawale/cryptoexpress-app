// src/components/WalletCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WalletCardProps {
  network: 'bitcoin' | 'polygon';
  walletAddress: string | null;
}

const WalletCard: React.FC<WalletCardProps> = ({ network, walletAddress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.networkText}>{network.toUpperCase()} Wallet</Text>
      {walletAddress ? (
        <Text style={styles.addressText}>{walletAddress}</Text>
      ) : (
        <Text style={styles.addressText}>No wallet imported</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  networkText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
});

export default WalletCard;