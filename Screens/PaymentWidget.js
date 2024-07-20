import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const App = ({ navigation, route }) => {
    const { url } = route.params;
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                style={styles.webview}
                onNavigationStateChange={(e) => {
                    const navigation_info = JSON.parse(JSON.stringify(e));
                    console.log(navigation_info);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default App;
