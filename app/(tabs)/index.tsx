import { Image, StyleSheet, Platform, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { router,Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState} from 'react'
export default function HomeScreen() {
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  // store data
  const storeData = async (value,id) => {
    try {
      console.log(value,id,'are both stored in asyncstorage')
      await AsyncStorage.setItem('my-key', value);
      await AsyncStorage.setItem('userId',id);
      router.push({pathname:'/profileScreen', params: id })
    } catch (e) {
      // saving error
      console.log(e)
    }
  };

const handleLogin=()=>{
  console.log('invoked me')
  const data={email,password}
  fetch(`https://notes-expo-4.onrender.com/user/login`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }).then(res=>res.json()).then(data=>{console.log(data);storeData(data.token,data.id)}).catch(err=>console.log(err))
}
  return (
    <View style={styles.container}>
        <View>
        <Text style={{textAlign:'center'}}>LoginScreen</Text>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setUserEmail(text)}
          style={styles.input}
        />
        <TextInput
          secureTextEntry
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Button onPress={handleLogin} title="Login"/>
        <Text style={{marginBottom:10}}>No account ? <TouchableOpacity onPress={()=>router.push('/signInScreen')}>
            <Text style={{textAlign:'center',color:'green'}}>Create Account</Text>
        </TouchableOpacity></Text>
        </View>
    </View>
    // From here I will copy for signup
  );
}

const styles = StyleSheet.create({
  input:{
marginTop:10,
marginBottom:10,
borderWidth:1
  },
  // From here i am pasting for login screen
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:0
}
  // titleContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 8,
  // },
  // stepContainer: {
  //   gap: 8,
  //   marginBottom: 8,
  // },
  // reactLogo: {
  //   height: 178,
  //   width: 290,
  //   bottom: 0,
  //   left: 0,
  //   position: 'absolute',
  // },
});
