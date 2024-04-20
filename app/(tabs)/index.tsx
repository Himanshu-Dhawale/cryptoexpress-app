// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import PriceScreen from './PriceScreen';

// const Stack = createNativeStackNavigator();
// export default function TabOneScreen() {

//   return (
//       <Stack.Navigator>
        
//         <Stack.Screen name="Prices" component={PriceScreen} />
//       </Stack.Navigator>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });


// src/screens/PriceScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalObservable } from 'mobx-react-lite'; // Import useLocalObservable
import { observer } from 'mobx-react-lite'; // Import observer from 'mobx-react-lite'

import Header from '../../components/Header';
import WalletStore from '../../stores/Walletstore';
import { fetchBitcoinPrice, fetchUSDTPrice } from '../../utils/api';

const PriceScreen: React.FC = observer(() => {
  const walletStore = useLocalObservable(() => new WalletStore()); // Use useLocalObservable
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [usdtPrice, setUSDTPrice] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      setBitcoinPrice(await fetchBitcoinPrice());
      setUSDTPrice(await fetchUSDTPrice());
    };
    fetchPrices();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Bitcoin Price: {bitcoinPrice} USD</Text>
        <Text style={styles.priceText}>USDT Price: {usdtPrice} USD</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default PriceScreen;
