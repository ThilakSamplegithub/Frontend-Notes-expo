import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import { router,useLocalSearchParams } from "expo-router";
import Notes from "./ChildComponents/Notes";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ScrollView } from "react-native-gesture-handler";
export default function ProfileScreen() {
  // const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [onatherFlag,setOnatherFlag]=useState(false)
  const [flag, setFlag] = useState(false);
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [deleteFlag, setDeleteFlag] = useState(false);
  function onDelete(e) {
    setDeleteFlag(!e);
  }
  async function getAsyncStorage() {
    try {
      const value = await AsyncStorage.getItem("my-key");
      const valueOfId = await AsyncStorage.getItem("userId");
      console.log(value,valueOfId,'is all we wannan know')
      if (value !== null) {
        // value previously stored
        setToken(value);
      } else {
        throw "error from token";
      }
      if (valueOfId !== null) {
        setId(valueOfId);
      } else {
        throw "error from id";
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }
  function handleGetNotes() {
    console.log('invoked me inside handleGetNotes')
// console.log(token,id,'inside getnotes')
    fetch(`https://notes-expo-4.onrender.com/notes`, {
      headers: {
        // "Content-Type": "application/json",
        "Authorization": token,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.msg);
      })
      .catch((err) => console.log(err));
  }
  // set onather flag as token will be in async
  //for getting token
  useEffect(() => {
    console.log(id,'is token from async storage')
    getAsyncStorage()
    console.log(id,token,'after executing async function')
  }, []);
  //Get data to display
  useEffect(() => {
    handleGetNotes();
  }, [flag, deleteFlag,token,id]);

  function handleDescription(d) {
    console.log(d);
    setDescription(d);
  }
  // to add note
  const handleAddNote = () => {
    const data = { title, description, id };
    fetch(`https://notes-expo-4.onrender.com/notes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFlag(!flag);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <View>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <Path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Text style={{ textAlign: "center", marginBottom: 5 }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderWidth: 0 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Notes
              title={item.title}
              description={item.description}
              noteId={item._id}
              token={token}
              deleteFlag={deleteFlag}
              onDelete={() => onDelete(deleteFlag)}
            />
          )}
        />
        {/* {data?.map(({title,description},i)=><Notes key={i} title={title} description={description} />)} */}
      </View>
      {/* Add title and description */}
      <View style={{ marginTop: 10, borderWidth: 1, padding: 5 }}>
        <Text style={{ marginBottom: 10 }}>
          title:{" "}
          <TextInput
            placeholder="Enter title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={{ borderWidth: 1 }}
          />
        </Text>
        <Text>
          description:{" "}
          <TextInput
            placeholder="Enter description"
            style={[styles.textArea, { marginBottom: 10 }]}
            numberOfLines={10}
            multiline={true}
            value={description}
            onChangeText={(desc) => handleDescription(desc)}
          />
        </Text>
        <Button title="add" onPress={handleAddNote} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  notes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    // padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    textAlignVertical: "top", // Ensures the text starts from the top
  },
});
