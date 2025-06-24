import {useState,useEffect} from 'react'
import { View,Text,Image ,StyleSheet,ActivityIndicator} from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string[] | string;
};
type StackParamList = {
  ProductDetails: { productName: String,id:String };
};

type RouteProps = RouteProp<StackParamList, 'ProductDetails'>;

const styles=StyleSheet.create({
  container:{padding:16,backgroundColor:"#fff"},
  name:{fontSize:24,fontWeight:'bold',marginBottom:12},
  image:{width:'100%',marginBottom:14,height:200,borderRadius:20},
  price:{fontSize:20,fontWeight:'bold',color:'green'}
})

const ProductDetails = () => {
    const [product, setProduct] = useState<Product | null>(null);
  const [loading,setLoading]=useState(true);
  console.log("inside product details")
  const route = useRoute<RouteProps>();
  console.log("route",route)
  const {productName,id}=route.params;
  console.log("product",productName)


    useEffect (()=>{
    console.log("inside useeffect ...............")
  fetchProduct();
  },[])

  const fetchProduct=async()=>{

      try {
      // const res = await fetch('http://localhost:7000/product/allProductDetails');
      console.log("inside fetch product daata")
       const res=await  fetch('https://ecommerce-backend-qaiv.onrender.com/product/view/star')// NOT localhost
       console.log("re1s",res);

      const data=await res.json();
      console.log("dat11a,,,,,,,,,,,,",data);
      setProduct(data.product||null);
        
      } catch (error) {
        console.log("Failed to fetch products ",error);
      }
      finally{
        setLoading(false);
      }
    }


  if(loading || !product ){
    console.log("Inside loader")
    return (
           <View>
        <ActivityIndicator size="large" color="blue"/>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
       <Text style={styles.name}>{productName}</Text>
       {
        loading&&
        <ActivityIndicator size="small" color="blue"/>}
        <Image  source={{uri:product.image[0]}} 
        onLoadEnd={()=>setLoading(false)}
       style={styles.image}
       />
       
      
       <Text
       style={styles.price}
       >{product.price}</Text>
    </View> 
     )
}

export default ProductDetails