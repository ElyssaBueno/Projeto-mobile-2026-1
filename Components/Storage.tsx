import AsyncStorage from '@react-native-async-storage/async-storage';

 type Props = {
    value:string;
    key: string;

    
};
  export default function Storage({value, key}:Props){
    
   const setData = async (value:string, key:string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    alert("Erro ao salvar o dado");
  }
};
    
    const getData = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    alert("Erro ao ler o dado")
  }
};

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    alert("Erro ao excluir o dado");
  }

  alert('Dado removido');
}
  }

