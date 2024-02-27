import * as React from 'react';
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import CustomHeader from "../../components/CustomHeader";
import styles from "../../theme/style";

export default function App() {

  return (
    <View style={{
      flex: 1,
    }}>
      <CustomHeader text={"سياسة التعليمات و الخصوصية"} />
      <View style={styles.rootContainer}>

        <View style={{
          width: "100%",
          flex: 1
        }}>
          <WebView
            style={{
              width: "100%"
            }}
            source={{ uri: 'https://wdapp.sa/policy.html' }}
          />
        </View>
      </View>
    </View>
  );
}