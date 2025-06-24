import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Product } from '../types'; // ✅ use shared type
import {useSelector} from 'react-redux';
import { RootState } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react'

// type Props = {
//   cart: Product[]; // ✅ fix type error by using the common Product type
//   setCart: React.Dispatch<React.SetStateAction< Product[]>>;
// };


export default function CartScreen() {

   console.log("inside cartScreen")
  const cartItems=useSelector((store:RootState)=>store.cart.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
     
  useEffect(() => {
    const fetchCart = async () => {
      try {
        console.log("inside cart  screen and  fetch locat storage data")
        const cartData = await AsyncStorage.getItem('cart');
        const cart = cartData ? JSON.parse(cartData) : [];
        console.log("🧠 Cart from AsyncStorage:", cartData, cart);
      } catch (error) {
        console.error("❌ Error reading cart from AsyncStorage:", error);
      }
    };

    fetchCart();
  }, []);

//   const handleRemoveFromCart = (itemId: string) => {
//   setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
// };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Cart Items ({totalItems})</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image[0] }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { marginBottom: 16, borderBottomWidth: 1, paddingBottom: 10 },
  image: { width: '100%', height: 300 },
  name: { fontSize: 16, marginTop: 8 },
  price: { fontSize: 16, fontWeight: 'bold', color: 'green' },
});
