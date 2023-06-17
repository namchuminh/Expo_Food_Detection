import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>Vui lòng chọn ảnh!</Text>
    </View>
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

function Result() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Description' },
        { key: 'second', title: 'How to cook' },
    ]);

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 40 }}>

            </View>
            <View style={{ flex: 60 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </View>
    );
}

export default Result;