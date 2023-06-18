import * as React from 'react';
import { View, useWindowDimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function Result({ route }) {
    var { confidence, description, food_name, image_path } = route.params;
    const layout = useWindowDimensions();
    const navigation = useNavigation();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Description' },
        { key: 'second', title: 'How to cook' },
    ]);

    const FirstRoute = (props) => (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: props.layout < 375 ? 10 : 15, paddingHorizontal: props.layout.width < 375 ? 5 : 10 }}>
                <Text style={{ fontSize: props.layout < 375 ? 15 : 17, color: 'black', lineHeight: props.layout < 375 ? 30 : 35, textAlign: 'justify' }}>{'\t'}{props.description}</Text>
            </View>
        </ScrollView>

    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }} />
    );

    const renderScene = SceneMap({
        first: (props) => <FirstRoute {...props} layout={layout.width} description={description} />,
        second: SecondRoute,
    });

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Ngăn người dùng quay lại màn hình PickScreen
            e.preventDefault();
        });

        return unsubscribe;

    }, [navigation]);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const formData = new FormData();
            formData.append('image', {
                uri: result.assets[0].uri,
                type: 'image/jpeg',
                name: 'my_image.jpg',
            });

            try {
                const response = await axios.post(
                    'http://10.0.2.2:5000/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                navigation.navigate('Result', {
                    confidence: response.data.confidence,
                    description: response.data.description,
                    food_name: response.data.food_name,
                    image_path: response.data.image_path
                });

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 40, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginVertical: layout.width < 375 ? 10 : 20, width: layout.width < 375 ? 110 : 160, height: layout.width < 375 ? 110 : 160, borderColor: 'white', borderWidth: 5, borderRadius: 10 }}>
                    <Image source={{ uri: "http://10.0.2.2:5000" + image_path }} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: layout.width < 375 ? 16 : 22 }}>{food_name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: layout.width < 375 ? 12 : 14, color: 'gray', marginTop: 10 }}>(Confidence: {confidence})</Text>
                </View>
            </View>
            <View style={{ flex: 60 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                />
            </View>
            <View style={{ position: 'absolute', bottom: -40, right: 10, alignItems: 'center', transform: [{ translateY: -50 }] }}>
                <TouchableOpacity onPress={pickImage} style={{ padding: 3, borderColor: "#f2f2f2", borderWidth: 1, borderRadius: 50, backgroundColor: "#f2f2f2" }}>
                    <Icon name="add-a-photo" size={35} color="#2293f4" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Result;