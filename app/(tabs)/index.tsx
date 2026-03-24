import Button from "@/Components/Button";
import { StyleSheet, Text, View } from "react-native";
import ImageViewer from "../../Components/ImageViewer";

const placeholderImage = require("../../assets/images/icon.png");

export default function Index() {
  return (
    <View style= {styles.container}>
      <Text style ={styles.text}>Página inicial</Text>
      <View style = {styles.container}>
        <ImageViewer imgSource = {placeholderImage}/>
      </View>
    <View style = {styles.footerContainer}>
      <Button label="Escolha uma foto" theme= "primary"/>
      <Button label="Use essa foto"/>
    </View>
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
  },
  footerContainer:{
    flex:1/3,
    alignItems: "center",
    }

});
