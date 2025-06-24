

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from  "./src/redux/store"

import ProductDetails from './src/components/ProductDetails';
import { Product } from './src/types';

// 👇 Set up the stack navigator
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  headerTitleContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerTitleText: {
    color: '#1e40af', // Tailwind 'blue-800'
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const CustomHeaderTitle = ({ title }: { title: string }) => (
  <View style={styles.headerTitleContainer}>
    <Text style={styles.headerTitleText}>{title}</Text>
  </View>
);

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);

  return (
     <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
    <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />

        <Stack.Screen
          name="ProductDetails"
          options={{
            headerTitle: () => <CustomHeaderTitle title="Details" />,
          }}
        >
          {() => <ProductDetails />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
