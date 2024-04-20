import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Linking } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react-lite';
import WalletStore from '../../stores/Walletstore';

const TransactionScreen: React.FC = observer(() => {
  const walletStore = useLocalObservable(() => new WalletStore());

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      await walletStore.fetchTransactionHistory();
    };
    fetchTransactionHistory();
  }, [walletStore]);

  const handleOpenLink = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
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
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

export default TransactionScreen;
