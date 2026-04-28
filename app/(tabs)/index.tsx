import Button from "@/Components/Button";
import DropdownComponent from "@/Components/Dropdown";
import ModalMenu from "@/Components/ModalMenu";
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ImageViewer from "../../Components/ImageViewer";

const placeholderImage = require("../../assets/images/icon.png");

export default function Index() {
  useEffect(()=>{
    
    async function setUp(){
    const db = await SQLite.openDatabaseAsync('database');
     //await db.execAsync(`
      //DROP TABLE IF EXISTS cor;`);

    await db.execAsync(`PRAGMA journal_mode = WAL; 
      CREATE TABLE IF NOT EXISTS cor (id TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);`);
     
      try{
        await db.runAsync('INSERT INTO cor (id, value) VALUES ("SelectedColor","#fffeff")' );
      }catch{
        console.log("Erro de inserção");
      }
    }
    setUp();
},[]);

 
  const backgroundColor = useSharedValue("white");

  const data = [
    { label: 'Rosa', value: '#edb8d4' },
    { label: 'Azul', value: '#a5c9f4' },
    { label: 'Verde', value: '#d1fcd8' },
    { label: 'Branco', value: '#fffeff' },
    { label: 'Cinza', value: '#5e5e5e' },
 
  ];
  const [selectedImage, setSelectImage] = useState<string | undefined>(
    undefined
  );
  const [isModalVisible,setIsModalVisible] = useState<boolean>(false);


 const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: withTiming(backgroundColor.value, { duration: 400 }), 
  }));
 
  const getSelectedColor = async () => {
    const db = await SQLite.openDatabaseAsync('database');
    try{
    const SavedColor = await db.getAllAsync("SELECT value FROM cor WHERE id = 'SelectedColor'");

    backgroundColor.value = SavedColor[0].value;
    }catch{
      console.log("Erro ao ler dado");
    }
     
  };
  
  const pickImageAsync = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

  if(!result.canceled){
    setSelectImage(result.assets[0].uri);
    console.log(result);
  }else{
    alert("Você não selecionou nenhuma imagem :(");
  }
  }

  const onModalOpen = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false)
  };


  getSelectedColor();

  return (
    
    <Animated.View style={[styles.container, animatedStyles]} >
      <Text style ={styles.text}>Página inicial</Text>
      <Animated.View style = {[styles.container, animatedStyles]}>
        <ImageViewer imgSource = {selectedImage || placeholderImage}/>
      </Animated.View>
      <View style = {styles.footerContainer}>
        <Button onPress={pickImageAsync} label="Escolha uma foto" theme= "primary"/>
        <Button onPress={onModalOpen} label="Configurações"/>   
      </View>
      <ModalMenu isVisible={isModalVisible} onClose={onModalClose}>
        <View>
          <DropdownComponent data={data} saveAt="SelectedColor" onChoose={getSelectedColor}></DropdownComponent>
        </View>
      </ModalMenu>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    color:"#fff",
    
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
  },

});
