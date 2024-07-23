import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomHeader from "../components/CustomHeader";
import styles from "../theme/style";

const App = ({ navigation, route }) => {
    const screenTitle = "اكمال عمليه الدفع";

    const { url } = route.params;

    const handleWebViewMessage = (event) => {
        if (event.nativeEvent.data === 'closeWebView') {
            navigation.replace("ClientFlow");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <StatusBar backgroundColor="#fe7e25" barStyle="light-content" />
            <CustomHeader text={screenTitle} />
            <View style={{
                flex: 1,
                backgroundColor: "#fafafa",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingVertical: 20,
                marginTop: -20,
                paddingHorizontal: 10
            }}>
                <WebView
                    source={{ uri: url }}
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%'
                    }}
                    onNavigationStateChange={(e) => {
                        const navigation_info = JSON.parse(JSON.stringify(e));
                        console.log(navigation_info);
                    }}
                    onMessage={handleWebViewMessage}
                />
            </View>


        </View>
    );
};
export default App;
