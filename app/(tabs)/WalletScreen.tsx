import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, Linking } from 'react-native';
import { useLocalObservable } from 'mobx-react-lite';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import WalletStore from '../../stores/Walletstore';

const WalletScreen: React.FC = observer(() => {
  const walletStore = useLocalObservable(() => new WalletStore());
  const [privateKey, setPrivateKey] = useState('');
  const navigation = useNavigation();

  const handleImportWallet = async () => {
    try {
      await walletStore.importWallet(walletStore.currentNetwork, privateKey);
      navigation.navigate('TransactionScreen');
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error('Error importing wallet:', error);
    }
  };

  const handleNetworkSwitch = (network: 'bitcoin' | 'polygon') => {
    walletStore.setCurrentNetwork(network);
  };

  const handleOpenLink = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <View style={styles.walletSection}>
        <Text style={styles.networkText}>Current Network: {walletStore.currentNetwork}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Private Key"
          value={privateKey}
          onChangeText={setPrivateKey}
        />
        <Button title="Import Wallet" onPress={handleImportWallet} style={styles.buttonStyle} />
        <Button
          title="Switch to Polygon Network"
          onPress={() => handleNetworkSwitch('polygon')}
          style={styles.buttonStyle}
        />
        <Button
          title="Switch to Bitcoin Network"
          onPress={() => handleNetworkSwitch('bitcoin')}
          style={styles.buttonStyle}
        />
      </View>

      <View style={styles.transactionsSection}>
        <FlatList
          data={walletStore.transactionHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionLabel}>Receiver:</Text>
              <Text style={styles.transactionValue}>{item.receiver}</Text>
              <Text style={styles.transactionLabel}>Amount:</Text>
              <Text style={styles.transactionValue}>{item.amount}</Text>
              <Text style={styles.transactionLabel}>Status:</Text>
              <Text style={[styles.transactionValue, styles[item.status]]}>{item.status}</Text>
              <Text style={styles.transactionLabel}>Fee:</Text>
              <Text style={styles.transactionValue}>{item.fee}</Text>
              <Text style={styles.transactionLabel}>Link:</Text>
              <Text style={[styles.transactionValue, styles.link]} onPress={() => handleOpenLink(item.link)}>
                View on Explorer
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  walletSection: {
    padding: 16,
  },
  networkText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
  },
  buttonStyle: {
    marginVertical: 8,
  },
  transactionsSection: {
    flex: 1,
    padding: 16,
  },
  transactionItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    marginVertical: 8,
  },
  transactionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionValue: {
    fontSize: 16,
  },
  pending: {
    color: 'orange',
  },
  completed: {
    color: 'green',
  },
  failed: {
    color: 'red',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default WalletScreen;