import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const welcome_image = require('./assets/welcome_image.png')

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ marginTop: 50, width: 150, height: 150, borderRadius: '50%', borderColor: '#2293f4', borderWidth: 1, backgroundColor: '#2293f4' }}>
          <Image source={welcome_image} style={{ marginTop: 10, marginLeft: 10, width: 128, height: 128 }} />
        </View>
      </View>
      <View style={styles.mid}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }} >Nhận Dạng Món Ăn Việt Nam</Text>
        <Text style={{ fontSize: 16, color: 'gray', marginTop: 20, lineHeight: 30, marginHorizontal: 18}} >Ứng dụng cho phép nhận dạng và đưa ra thông tin của 30 món ăn đường phố VN</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={{ color: 'white' }}>Chọn Ảnh - Đồ Ăn Cần Nhận Dạng</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#f2f2f2'
  },
  top: {
    flex: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  mid: {
    flex: 20,
    alignItems: 'center', 
  },
  bottom: {
    flex: 40
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2293f4',
    padding: 10,
    borderRadius: 5, 
    borderWidth: 1,
    borderColor: '#2293f4',
  },
});

