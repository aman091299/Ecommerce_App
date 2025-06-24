import {useEffect} from 'react'
import { Text,StyleSheet, View, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const styles = StyleSheet.create({
   cart: {
    color: 'white',
    fontSize: 16,
  },
  nav: {
    height: 60,
    backgroundColor: '#232f3e', // Amazon navy color
    paddingHorizontal: 16,
  },
  logo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

type Props = {
  cartCount: number;
  onCartPress: () => void;
};


const Navbar = ({cartCount,onCartPress}:Props) => {
  console.log("Insdie navbar")

  const cartItems=useSelector((store:RootState)=>store.cart.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


useEffect(() => {
  AsyncStorage.setItem('cart', JSON.stringify(cartCount));
}, [cartCount]);

  return (
      <View style={styles.nav}>
       <Text 
       style={styles.logo}>🛒 Amazon Clone</Text>
       <TouchableOpacity onPress={onCartPress}>
               <Text  style={styles.cart}>Cart : {totalItems}</Text>
       </TouchableOpacity>
</View>
  )
}

export default Navbar