import { View ,Text, Image,StyleSheet, Button, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from "../types";
import React from "react";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

// 1. Props type to receive product info
// 1. Props type to receive product info
type ProductProps = {
  _id: string;
    name: string;
    price: string;
 image: string[] | string,
  quantity: number;
  }
   

   // Props type for this component
type ProductCardProps = {
  item: ProductProps;
};


type StackParamList = {
  Home: undefined;
  Cart: undefined;
  ProductDetails: { productName: String,id:String }; // ✅ fix here
};


const ProductCard=({item}:ProductCardProps)=>{

  const dispatch=useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const productDetailHandler=()=>{
      navigation.navigate('ProductDetails',{ productName:item.name,id:item._id })
  }

  
  const handleAddToCart=((item:ProductProps)=>{
    console.log("inside add to cart handler",item);

     dispatch(addToCart(item));


  })
    return (
      <TouchableOpacity onPress={productDetailHandler}>
       <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Image source={{uri:item.image[0]}}
        style={styles.image}
        />
        <Text  style={styles.price}>{item.price}</Text>
        <View>
         <TouchableOpacity  onPress={()=>(handleAddToCart(item))}>
          <Text  style={styles.button} >Add to Cart</Text>
          </TouchableOpacity>

        </View>
       </View>
       </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
  button:{
marginTop:1,
backgroundColor:'blue',
paddingVertical:8,
paddingHorizontal:16,
color:'white',
borderRadius:6,
alignSelf: 'flex-start',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
       margin:10,
    backgroundColor: '#f9f9f9',
  
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: 'green',
    marginBottom: 8,
  },
});

export default React.memo(ProductCard);