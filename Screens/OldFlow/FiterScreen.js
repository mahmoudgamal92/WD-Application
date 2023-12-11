<NativeBaseProvider>
<Actionsheet isOpen={isOpen} onClose={onClose}>
  <Actionsheet.Content>
    <View style={{ height: 500 }}>
      <Text
        style={{
          fontFamily: "Bold",
          color: "#fe7e25",
          marginBottom: 10
        }}
      >
        قم بتحديد السعر المناسب
      </Text>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-around"
        }}
      >
        <View style={{ width: "30%" }}>
          <TextInput
            placeholder="من"
            keyboardType="numeric"
            onChangeText={price => setminPrice(price)}
            style={{
              height: 40,
              marginBottom: 20,
              paddingHorizontal: 10,
              borderRadius: 5,
              width: "100%",
              fontFamily: "Regular",
              textAlign: "right",
              borderColor: "#C9C9C9",
              borderWidth: 0.8
            }}
          />
        </View>
        <View
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontFamily: "Bold", color: "#fe7e25" }}>
            :
          </Text>
        </View>
        <View style={{ width: "30%" }}>
          <TextInput
            placeholder="الي"
            keyboardType="numeric"
            onChangeText={price => setmaxPrice(price)}
            style={{
              height: 40,
              marginBottom: 20,
              paddingHorizontal: 10,
              borderRadius: 5,
              width: "100%",
              fontFamily: "Regular",
              textAlign: "right",
              borderColor: "#C9C9C9",
              borderWidth: 0.8
            }}
          />
        </View>
      </View>

      <Text
        style={{
          fontFamily: "Bold",
          color: "#fe7e25",
          marginBottom: 10
        }}
      >
        حدد المساحة المطلوبة للعقار
      </Text>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-around"
        }}
      >
        <View style={{ width: "30%" }}>
          <TextInput
            placeholder="من"
            keyboardType="numeric"
            onChangeText={area => setminArea(area)}
            style={{
              height: 40,
              marginBottom: 20,
              paddingHorizontal: 10,
              borderRadius: 5,
              width: "100%",
              fontFamily: "Regular",
              textAlign: "right",
              borderColor: "#C9C9C9",
              borderWidth: 0.8
            }}
          />
        </View>
        <View
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontFamily: "Bold", color: "#fe7e25" }}>
            :
          </Text>
        </View>
        <View style={{ width: "30%" }}>
          <TextInput
            placeholder="الي"
            placeholderStyle={{ textAlign: "center" }}
            keyboardType="numeric"
            onChangeText={area => setmaxArea(area)}
            style={{
              height: 40,
              marginBottom: 20,
              paddingHorizontal: 10,
              borderRadius: 5,
              width: "100%",
              fontFamily: "Regular",
              textAlign: "right",
              borderColor: "#C9C9C9",
              borderWidth: 0.8
            }}
          />
        </View>
      </View>

      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={{ fontFamily: "Bold", color: "#fe7e25" }}>
          المنطقة
        </Text>

        <Box>
          <Select
            width="300"
            fontFamily="Regular"
            placeholderStyle={{ fontFamily: "Regular" }}
            accessibilityLabel="حدد المنطقة المطلوبة"
            placeholder="حدد المنطقة المطلوبة"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
            mt={1}
            // onValueChange={itemValue => {
            //   var obj = itemValue.split(",");
            //   getCities(obj[0], obj[1]);
            //   //alert(obj[0]+"---"+obj[1])
            // }}
          >
            {states.map(item => {
              return (
                <Select.Item
                  key={item.id}
                  label={item.name}
                  value={item.id + "," + item.name}
                />
              );
            })}
          </Select>
        </Box>
      </View>

      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={{ fontFamily: "Bold", color: "#fe7e25" }}>
          المدينة
        </Text>

        <Box>
          <Select
            width="300"
            fontFamily="Regular"
            placeholderStyle={{ fontFamily: "Regular" }}
            accessibilityLabel="أختر المدينة"
            placeholder="أختر المدينة"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }}
            mt={1}
            onValueChange={itemValue => setCity(itemValue)}
          >
            {cities.map((item, index) => {
              return (
                <Select.Item
                  key={index}
                  label={item.name}
                  value={item.id}
                />
              );
            })}
          </Select>
        </Box>
      </View>

      <View style={{}}>
        <TouchableOpacity
          onPress={() => ApplyFilter()}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>بحث</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Actionsheet.Content>
</Actionsheet>
</NativeBaseProvider>