

import {StyleSheet,SafeAreaView, FlatList, Image,ActivityIndicator,View} from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { useState,useEffect, useCallback } from 'react';
import { Product } from '../types';
import {useSelector} from 'react-redux';
import { RootState } from '../redux/store';

// 6. Styles like CSS for layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 6,
  },
  name: {
    fontSize: 16,
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: 'green',
  },
});

// const products = [
//   {
//     id: '1',

//     name: 'Bluetooth Headphones',
//     price: '₹1,299',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
//   {
//     id: '2',
//     name: 'Android Phone',
//     price: '₹14,999',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
//     {
//     id: '3',
//     name: 'Bluetooth Headphones',
//     price: '₹1,299',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
//   {
//     id: '4',
//     name: 'Android Phone',
//     price: '₹14,999',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
//     {
//     id: '5',
//     name: 'Bluetooth Headphones',
//     price: '₹1,299',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
//   {
//     id: '6',
//     name: 'Android Phone',
//     price: '₹14,999',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
//     {
//     id: '7',
//     name: 'Bluetooth Headphones',
//     price: '₹1,299',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
//   {
//     id: '8',
//     name: 'Android Phone',
//     price: '₹14,999',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },

//     {
//     id: '9',
//     name: 'Bluetooth Headphones',
//     price: '₹1,299',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
//   {
//     id: '10',
//     name: 'Android Phone',
//     price: '₹14,999',
//     image: 'https://m.media-amazon.com/images/I/51o1ooDqHwL._SL1500_.jpg',
//   },
// ];

type Props={
    cart: Product[],
  setCart: React.Dispatch<React.SetStateAction< Product[]>>;

}

// Define your stack type
type StackParamList = {
  Home: undefined;
  Cart: undefined;
};


function HomeScreen() {
    console.log("inside home screen")
  const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
      const cartItems=useSelector((store:RootState)=>store.cart.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
      
    const fetchProductData=async()=>{

      try {
             


      // const res = await fetch('http://localhost:7000/product/allProductDetails');
      console.log("inside fetch product daat111a")
       const res=await  fetch('https://ecommerce-backend-qaiv.onrender.com/product/allProductDetails') // NOT localhost
       console.log("res",res);

      const data=await res.json();
      console.log("data",data);
      setProducts(data.products||[]);
        
      } catch (error) {
        console.log("Failed to fetch products ",error);
      }
      finally{
        setLoading(false);
      }
    }
  useEffect(()=>{

   fetchProductData();
  },[])


  return (
    <SafeAreaView style={styles.container}>
      <Navbar cartCount={ totalItems }  onCartPress={() => {console.log("inside on cart Press")
        navigation.navigate('Cart')}}/>
        {loading ?(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
        ) :
          <FlatList 
      data={products}
      renderItem={({item}:any)=>
     <ProductCard item={item} 
      />
       
      }
      keyExtractor={(item)=>item._id}
      />
        
        }
    
    </SafeAreaView>
  );
}



export default HomeScreen;
