import { Text, View, ScrollView } from 'react-native';
import React from "react";
import styles from "../../theme/style";
import CustomHeader from "../../components/CustomHeader";

export default function PrivacyPolicy({ route, navigation }) {
  const screenTitle = "شروط الاعلان";


  return (
    <View style={{
      flex: 1,
      alignItems: "center",
    }}>
      <CustomHeader text={screenTitle} />
      <View style={styles.rootContainer}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 50 }}>


          <Text style={{
            fontFamily: "Regular",
            color: "grey",
            textAlign: "right",
            fontSize: 16,
            lineHeight: 20
          }}>
            يمكنك استخدام خدماتنا بطرق شتى لإدارة خصوصيتك. على سبيل المثال، يمكنك الاشتراك في حساب Google إذا أردت إنشاء محتوى وإدارته، مثل الرسائل الإلكترونية والصور، أو إذا أردت عرض مزيد من نتائج البحث ذات الصلة. يمكنك أيضًا استخدام الكثير من خدمات Google بدون تسجيل الدخول إلى حسابك أو بدون إنشاء حساب من الأساس، مثل البحث على Google أو مشاهدة فيديوهات YouTube. كما يمكنك اختيار تصفّح الويب بخصوصية تامة باستخدام متصفّح Chrome في "وضع التصفّح المتخفي". وبإمكانك، في مختلف خدماتنا، ضبط إعدادات الخصوصية للتحكم في المعلومات التي نجمعها وكيفية استخدامها.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};