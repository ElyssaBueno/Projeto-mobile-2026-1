import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style= {styles.container}>
      <Text style ={styles.text}>Página inicial</Text>
      <Link href={"/about"} style = {styles.link}>
        Vá para a tela Sobre
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#a5c9f4",
  },

  text:{
    color: "#342323",
  },

  link: {
    fontSize: 20,
    textDecorationLine: "underline",
    color:"#342323",
  }

});
