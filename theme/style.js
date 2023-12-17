import { StyleSheet, Dimensions } from "react-native";
import * as theme from ".";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  // Start HomePage Styling
  imgContainer: {
    backgroundColor: "#fe7e25",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    width: "100%"
  },

  inputContainer: {
    flexDirection: "row-reverse",
    borderColor: "#27384c",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 10,
    height: 58
  },
  inputPlaceHolder: {
    color: "grey",
    textAlign: "right",
    fontFamily: "Regular",
    width: "100%",
    borderColor: "#DDDDDD"
  },
  flex: {
    flex: 0
  },
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
  },

  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: "space-between",
    alignItems: "center"
  },
  destinations: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30
  },

  itemBackground: {
    width: width - theme.sizes.padding * 1.4,
    height: width * 0.8,
    borderRadius: theme.sizes.radius,
    marginHorizontal: theme.sizes.margin * 0.7
  },

  destination: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding * 0.4,
    paddingVertical: theme.sizes.padding * 0.4,
    borderColor: "#DDDDDD",
    borderWidth: 0.6,
    borderRadius: theme.sizes.radius
  },

  destinationData: {
    width: width - theme.sizes.padding * 1.4,
    marginHorizontal: theme.sizes.margin * 0.7,
    paddingHorizontal: theme.sizes.padding * 0.4,
    marginTop: -50,
    paddingVertical: theme.sizes.padding * 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: theme.sizes.radius,
    borderColor: "#DDDDDD",
    borderBottomWidth: 0.6,
    borderLeftWidth: 0.6,
    borderRightWidth: 0.6
  },
  destinationInfo: {
    position: "absolute",
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: 20,
    left: (width - theme.sizes.padding * 4) / (Platform.OS === "ios" ? 3.2 : 3),
    backgroundColor: theme.colors.white,
    width: width - theme.sizes.padding * 4
  },
  recommended: {},
  recommendedHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: theme.sizes.padding,
    marginVertical: 10
  },
  recommendedList: {},
  recommendation: {
    width: (width - theme.sizes.padding * 2) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: "hidden",
    borderRadius: theme.sizes.radius,
    marginVertical: theme.sizes.margin * 0.5
  },
  recommendationHeader: {
    overflow: "hidden",
    borderTopRightRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius
  },
  recommendationOptions: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.sizes.padding / 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white
  },
  recommendationImage: {
    width: (width - theme.sizes.padding * 2) / 2,
    height: (width - theme.sizes.padding * 2) / 2
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: theme.sizes.padding / 2
  },
  rating: {
    fontSize: 11,
    color: "grey",
    fontFamily: "Regular"
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5
  },

  SearchboxContainer: {
    width: "80%",
    backgroundColor: "#fff",
    elevation: 8,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    fontFamily: "Regular",
    textAlign: "right",
    height: 50
  },

  Searchbox: {
    paddingVertical: 15,
    fontSize: 15,
    fontFamily: "Regular",
    width: "90%",
    textAlign: "right"
  },

  SearchboxIcon: {
    position: "absolute",
    left: 20
  },

  FilterBoxIcon: {
    position: "absolute",
    right: 20,
    padding: 5
  },

  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
    borderColor: "transparent"
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: theme.colors.active
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 5

    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // elevation: 5
  },

  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },

  mapMarkerContainer: {
    left: "47%",
    position: "absolute",
    top: "42%"
  },

  categoryItem: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    color: "#484848",
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  },

  categoryItemActive: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    color: "#484848",
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(254, 126, 37, 0.7)",
    borderRadius: 10,
    borderColor: "#fe7e25",
    borderWidth: 2
  },

  subcategoryItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    color: "#484848",
    marginVertical: 10,
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 14,
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  },

  subcategoryItemActive: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    color: "#484848",
    marginVertical: 10,
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 14,
    backgroundColor: "#5da3a9",
    borderRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  },

  categoryText: {
    fontSize: 16,
    color: "#484848",
    fontFamily: "Regular"
  },

  categoryTextActive: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: "Bold"
  },

  categoryMapItemActive: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginHorizontal: 5,
    color: "#484848",
    padding: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5
  },

  categoryMapItem: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginHorizontal: 5,
    color: "#484848",
    padding: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5
  },

  categoryMapText: {
    fontSize: 14,
    color: "#FFF",
    fontFamily: "Regular",
    color: "#484848"
  },

  categoryMapTextActive: {
    fontSize: 14,
    color: "#FFF",
    fontFamily: "Bold"
  },

  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: "#fe7e25",
    justifyContent: "center",
    minWidth: 300,
    marginBottom: 100
  },
  nextButtonText: {
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: 20,
    color: "#fff"
  },
  // End HomePage Styling

  //Chat Page start
  leftMessageContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginBottom: 3,
    marginTop: 5,
    fontFamily: "Regular"
  },

  rightMessageContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginVertical: 5,
    fontFamily: "Regular"
  },

  messageTileright: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxWidth: "80%",
    fontFamily: "Regular",
    paddingHorizontal: 20
  },

  messageTileleft: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxWidth: "80%",
    fontFamily: "Regular"
  },
  // Chat Page End

  // New Add Page Start
  InputText: {
    backgroundColor: "#FFF",
    marginBottom: 10,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    fontFamily: "Regular",
    textAlign: "right",
    borderColor: "#DDDDDD",
    borderWidth: 1
  },

  InputTextArea: {
    backgroundColor: "#FFF",
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 100,
    borderRadius: 10,
    width: "100%",
    fontFamily: "Regular",
    textAlign: "right",
    borderColor: "#DDDDDD",
    borderWidth: 1
  },
  SelectInput: {
    borderRadius: 10,
    fontFamily: "Regular"
  },
  AddCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5
  },

  InputLabel: {
    fontFamily: "Bold",
    marginBottom: 5,
    color: "#fe7e25",
    zIndex: 10,
    width: "100%",
    textAlign: "right"
  },
  userInputLable: {
    fontFamily: "Bold",
    marginBottom: 5,
    color: "#fe7e25",
    zIndex: 10,
    textAlign: "right"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    marginBottom: 50,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "red",
    marginVertical: 20,
    width: "80%",
    marginBottom: 40
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },

  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "Bold"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    fontFamily: "Bold",
    marginHorizontal: 10
  },
  modalBody: {
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: "Regular"
  },
  imgContainer: {
    backgroundColor: "#fe7e25",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    width: "100%"
  },
  codeFiledRoot: {
    height: 60,
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  resend_code: {
    fontWeight: "700",
    color: "#1A1D3D"
  },
  cell: {
    marginHorizontal: 8,
    height: 40,
    width: 40,
    lineHeight: 40,
    fontSize: 30,
    textAlign: "center",
    borderRadius: 8,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3
  },
  toastContainer: {
    flexDirection: "row-reverse",
    height: 60,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16
  },

  toastIcon: {
    flexDirection: "row-reverse",
    width: "15%",
    justifyContent: "space-between"
  },
  modalToastBody: {
    flexDirection: "row-reverse",
    height: 200,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16
  },

  modalContainer: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  dropdown: {
    backgroundColor: "#fff",
    height: 55,
    borderRadius: 50,
    paddingHorizontal: 8,
    fontFamily: "Regular",
    width: "100%",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    textAlign:"right"
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    fontFamily: "Regular",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Regular",
    paddingHorizontal: 10,
    color: "grey",
    textAlign: "right",

  },
  selectedTextStyle: {
    fontSize: 13,
    textAlign:"right",
    fontFamily: "Regular",
    marginHorizontal: 10,
    textAlign:"right"
  },
  iconStyle: { 
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: "Regular",
    textAlign:"right"
  },
  btnText: {
    fontSize: 20,
    color: "#FFF",
    fontFamily: "Bold"
  },
  headline: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Bold"
  },

  // Toast Configuration Style

  toastContainer: {
    flexDirection: "row-reverse",
    height: 80,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16
  },

  toastIcon: {
    flexDirection: "row-reverse",
    width: "15%",
    justifyContent: "space-between"
  },

  modalToastBody: {
    height: 200,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16
  },

  /////////////////////////////////////////////////////////
  //New Design ///

  //***** Universal Style ******//

  rootContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 25,
    marginTop: -20,
    paddingHorizontal: 10
  },

  inputContainer: {
    flexDirection: "row-reverse",
    borderColor: "#fe7e25",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 10,
    height: 58
  },
  inputWrapper: {
    flexDirection: "row-reverse",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },

  inputStyle: {
    fontFamily: "Regular",
    textAlign: "right",
    paddingBottom: 2,
    height: "100%",
    width: "100%",
    fontSize: 14,
    fontFamily: "Regular",
    color: "grey"
  },

  placeHolderContainer: {
    paddingHorizontal: 10,
    alignItems: "flex-end",
    position: "absolute",
    marginTop: -10
  },

  placeholderText: {
    color: "grey",
    fontFamily: "Regular",
    backgroundColor: "#FFF",
    textAlign: "right",
    paddingHorizontal: 10
  },
  //***** Profile Page ******//
  profileItem: {
    width: "90%",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  profileItemIcon: {
    borderLeftColor: "#DDDDDD",
    borderLeftWidth: 2,
    paddingHorizontal: 10
  },

  //***** User Home Page  ******//

  markerContainer: {
    alignItems: "center"
  },
  markerBody: {
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  markerTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red"
  },
  label: {
    marginTop: 5,
    fontWeight: "bold"
  },

  //***** Client Home Page ******//
  sectionView: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  },
  sectionContainer: {
    width: 110,
    height: 100,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#fe7e25",
    marginVertical: 7,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
export default styles;