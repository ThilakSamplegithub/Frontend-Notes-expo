import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
export default function SignInScreen() {
  const [userName, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
 const handleRegister=()=>{
  const data={
    userName,email,password
  }
  fetch(`https://notes-expo-4.onrender.com/user/register`,{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
  body:JSON.stringify(data)
  }).then(res=>res.json()).then(res=>{console.log(res);router.push('/')}).catch(err=>console.log(err))
 }
  useEffect(() => {
    console.log(userName);
  }, [userName]);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ textAlign: "center" }}>Sign In</Text>
        <TextInput
          placeholder="Enter Name"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
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
        <Button title="submit" onPress={handleRegister} />
        {/* <Link href='/loginScreen'><Text>Already have an account? Log in</Text></Link> */}
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
});
