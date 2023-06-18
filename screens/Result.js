import * as React from 'react';
import { View, useWindowDimensions, Text, Image, ScrollView, BackHandler, ToastAndroid } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

var prop_width = 0
var prop_description = ""

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
    first: (props) => <FirstRoute {...props} layout={prop_width} description={prop_description} />,
    second: SecondRoute,
});

function Result({ route }) {
    const { confidence, description, food_name, image_path } = route.params;
    const layout = useWindowDimensions();
    const navigation = useNavigation();
    prop_description = description
    prop_width = layout.width

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Description' },
        { key: 'second', title: 'How to cook' },
    ]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Ngăn người dùng quay lại màn hình PickScreen
            e.preventDefault();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 40, justifyContent: 'center', alignItems: 'center', }}>
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
        </View>
    );
}

export default Result;