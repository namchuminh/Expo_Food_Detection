import * as React from 'react';
import { View, useWindowDimensions, Text, Image, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';


const FirstRoute = (props) => (
    <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 17, color: 'black', lineHeight: 35, textAlign: 'justify'}}>{'\t'}{props.description}</Text>
    </View>
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

function Result({ route, navigation }) {
    const { confidence, description, food_name, image_path } = route.params;
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Description' },
        { key: 'second', title: 'How to cook' },
    ]);

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 40, justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ marginVertical: 20, width: 160, height: 160, borderColor: 'white', borderWidth: 5, borderRadius: 10 }}>
                    <Image source={{ uri: "http://10.0.2.2:5000" + image_path}} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{fontWeight: 'bold', fontSize: 22}}>{food_name}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 14, color: 'gray', marginTop: 10}}>(Độ chính xác: {confidence})</Text>
                </View>
            </View>
            <View style={{ flex: 60 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderScene={() => <FirstRoute description={description} />}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </View>
    );
}

export default Result;