import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function Notes({ title, description, noteId, token,onDelete,deleteFlag }) {
  console.log(noteId, "is id of particular note");
  const handleDelete = () => {
    console.log("invoked handledelete");
    fetch(`https://notes-expo-4.onrender.com/notes/delete/${noteId}`, {
      method: "DELETE",
      headers: {
        // 'Content-Type':'application/json',
        "Authorization": token,
      },
    })
      .then((res) => res.json())
      .then((data) =>{ console.log(data);onDelete(!deleteFlag)})
      .catch((err) => console.log(err, "from delete function"));
  };
  function handleUpdate(){

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>title:{title}</Text>
      <Text>description:{description}</Text>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 0,
          gap: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        
          {/* <Button title="Edit" onPress={handleUpdate} /> */}
          <Button title="delete" onPress={handleDelete} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "gold",
    marginTop: 20,
    backgroundColor: "yellow",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
  },
});
