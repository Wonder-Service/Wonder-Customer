import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { TextInput } from "react-native-gesture-handler";
import NavigationService from "../service/navigation";
import { POST, GET } from "../api/caller";
import { ACCEPT_ORDER_ENDPOINT, USER_ENDPOINT } from "../api/endpoint";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Picker } from "react-native";

export default class Req extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    pickCoords: { latitude: "0", longitude: "0" },
    Coords: { latitude: null, longitude: null },
    editable: false,
    skillId: 1,
    nameDevice: null,
    description: null,
    address: null,
    addressDetail: null,
    customerPhone: null,
    customerName: null,
    isPikerMap: false,
  };

  // componentWillMount(){
  //   this.setState({
  //     isPikerMap: false
  //   })
  // }

  async componentDidMount() {
    console.log("isPick", this.state.isPikerMap);
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status != "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    } else {
      var location = await Location.getCurrentPositionAsync({});
      await this.setState({
        Coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    }
    this.focusListener = this.props.navigation.addListener(
      "didFocus",
      async () => {
        try {
          await this.setState({
            skillId: this.props.navigation.getParam("skillId", 2),
          });
        } catch (e) {
          console.log("ReqeustDetailScreen getParam navigation:" + e);
        }

        await GET(USER_ENDPOINT + "?isMyProfile=1", {}, {})
          .then((res) => {
            this.setState({
              customerName: res[0].username,
            });
          })
          .catch((error) => {
            console.log("ReqeustDetailScreen apiget User ERROR");
            console.log(error);
          });
      }
    );
    // console.log("ispick", this.state.isPikerMap)
    // if(this.state.isPikerMap){
    //   this.handlePickerMap()
    // }else{
    //   this.getCurrentCoordinate()
    // }
  }

  async componentDidUpdate(prevProps) {
    var lat = await AsyncStorage.getItem("pickLatitude");
    var lng = await AsyncStorage.getItem("pickLongitude");
    if (prevProps.isPikerMap !== this.state.isPikerMap) {
      if (
        this.state.pickCoords.latitude !== lat ||
        this.state.pickCoords.longitude !== lng
      ) {
        await this.setState({
          pickCoords: {
            latitude: lat,
            longitude: lng,
          },
        });
      }
    }
    console.log("Picked", this.state.pickCoords);
  }

  // async handlePickerMap() {
  //   await this.setState({
  //     isPikerMap: true,
  //     pickCoords: {
  //       latitude: await AsyncStorage.getItem("pickLatitude"),
  //       longitude: await AsyncStorage.getItem("pickLongitude"),
  //     },
  //   });
  //   console.log("coordsPick", this.state.pickCoords);
  //   // await AsyncStorage.setItem('isPickerMap', this.state.isPikerMap + '')
  // }

  async getCurrentCoordinate() {
    await console.log("location", this.state.Coords);
    await AsyncStorage.setItem("pickLatitude", this.state.Coords.latitude + "");
    await AsyncStorage.setItem(
      "pickLongitude",
      this.state.Coords.longitude + ""
    );
  }

  render() {
    const {
      editable,
      skillId,
      nameDevice,
      description,
      address,
      Coords,
      pickCoords,
      customerPhone,
      customerName,
    } = this.state;
    if (this.state.isPikerMap) {
      let param = {
        address: address,
        description: description,
        coords: pickCoords,
        skillId: skillId,
        nameDevice: nameDevice,
        customerPhone: customerPhone,
      };
      return (
        <KeyboardAvoidingView style={styles.createRequestContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.titleContainer}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate("HomeScreenV2")}
              >
                <AntDesign name="arrowleft" size={26} color="black" />
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <Text
                  emphasis="medium"
                  style={{ fontSize: 25, paddingLeft: 20, fontWeight: "800" }}
                >
                  Fixxy Service Detail
                </Text>
              </View>
            </View>
            <ScrollView>
              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <Text emphasis="medium" style={styles.headerText}>
                    Your Device Information
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Device's Name
                    </Text>
                    <TextInput
                      style={styles.deviceType}
                      placeholder="Ex: Moniter LG MK6300"
                      value={nameDevice}
                      onChangeText={(text) => {
                        this.setState({ nameDevice: text });
                      }}
                    />
                  </View>
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Description
                    </Text>
                    <TextInput
                      multiline={true}
                      maxLength={200}
                      numberOfLines={4}
                      textAlignVertical="top"
                      style={styles.detailErr}
                      placeholder="Can't Start up"
                      value={description}
                      onChangeText={(text) => {
                        this.setState({ description: text });
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <Text emphasis="medium" style={styles.headerText}>
                    Your Contact Information
                  </Text>
                </View>
                <View style={styles.inputContainer2}>
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Name
                    </Text>
                    <TextInput
                      style={styles.deviceType}
                      placeholder={customerName}
                    />
                  </View>
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Phone
                    </Text>
                    {/* <View style={{flexDirection: 'row', flex: 1}}> */}
                    <TextInput
                      editable={editable}
                      // style={(styles.deviceType, {flex: 8})}
                      style={styles.deviceType}
                      placeholder={customerPhone}
                    />
                  </View>

                  {/* </View> */}
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Address
                    </Text>
                    <TextInput
                      style={styles.deviceType}
                      placeholder="FPT University, District 9, HCM city"
                    />

                    <TouchableOpacity
                      onPress={() => {
                        NavigationService.navigate("MapPickerScreen");
                        this.setState({
                          isPikerMap: true,
                        });
                      }}
                    >
                      <MaterialCommunityIcons
                        style={styles.icon}
                        name="google-maps"
                        size={35}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      // await this.state.isPikerMap ? (this.handlePickerMap()) : (this.getCurrentCoordinate())
                      console.log("param", param);
                      await POST(ACCEPT_ORDER_ENDPOINT, {}, {}, param)
                        .then(async (res) => {
                          await AsyncStorage.setItem(
                            "orderId",
                            res.orderId + ""
                          );
                        })
                        .catch((error) => {});
                      NavigationService.navigate("FindingServiceScreen");
                    }}
                    style={[
                      styles.button,
                      {
                        backgroundColor: "#3ddc84",
                        width: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: "#fff",
                      },
                    ]}
                  >
                    <Text
                      emphasis="bold"
                      style={{
                        fontSize: 17,
                        color: "#fff",
                        borderColor: "#fff",
                      }}
                    >
                      Send Request
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      );
    } else {
      let param = {
        address: address,
        description: description,
        coords: Coords,
        skillId: skillId,
        nameDevice: nameDevice,
        customerPhone: customerPhone,
      };
      return (
        <KeyboardAvoidingView style={styles.createRequestContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.titleContainer}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate("HomeScreenV2")}
              >
                <AntDesign name="arrowleft" size={26} color="black" />
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <Text
                  emphasis="medium"
                  style={{ fontSize: 25, paddingLeft: 20, fontWeight: "800" }}
                >
                  Fixxy Service Detail
                </Text>
              </View>
            </View>
            <ScrollView>
              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <Text emphasis="medium" style={styles.headerText}>
                    Your Device Information
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Device's Name
                    </Text>
                    <TextInput
                      style={styles.deviceType}
                      placeholder="Ex: Moniter LG MK6300"
                      value={nameDevice}
                      onChangeText={(text) => {
                        this.setState({ nameDevice: text });
                      }}
                    />
                  </View>
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Description
                    </Text>
                    <TextInput
                      multiline={true}
                      maxLength={200}
                      numberOfLines={4}
                      textAlignVertical="top"
                      style={styles.detailErr}
                      placeholder="Can't Start up"
                      value={description}
                      onChangeText={(text) => {
                        this.setState({ description: text });
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.headerContainer}>
                  <Text emphasis="medium" style={styles.headerText}>
                    Your Contact Information
                  </Text>
                </View>
                <View style={styles.inputContainer2}>
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Name
                    </Text>
                    <TextInput
                      style={styles.deviceType}
                      placeholder={customerName}
                    />
                  </View>
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Phone
                    </Text>
                    {/* <View style={{flexDirection: 'row', flex: 1}}> */}
                    <TextInput
                      editable={editable}
                      // style={(styles.deviceType, {flex: 8})}
                      style={styles.deviceType}
                      placeholder={customerPhone}
                    />
                  </View>

                  {/* </View> */}
                  <View style={styles.deviceTypeContainer}>
                    <Text emphasis="bold" style={styles.locationText}>
                      Address
                    </Text>
                    <TextInput
                      style={styles.deviceType}
                      placeholder="FPT University, District 9, HCM city"
                    />

                    <TouchableOpacity
                      onPress={() => {
                        NavigationService.navigate("MapPickerScreen");
                        this.setState({
                          isPikerMap: true,
                        });
                      }}
                    >
                      <MaterialCommunityIcons
                        style={styles.icon}
                        name="google-maps"
                        size={35}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={async () => {
                      // await this.state.isPikerMap ? (this.handlePickerMap()) : (this.getCurrentCoordinate())
                      console.log("param", param);
                      await POST(ACCEPT_ORDER_ENDPOINT, {}, {}, param)
                        .then(async (res) => {
                          await AsyncStorage.setItem(
                            "orderId",
                            res.orderId + ""
                          );
                          await this.getCurrentCoordinate();
                        })
                        .catch((error) => {});
                      NavigationService.navigate("FindingServiceScreen");
                    }}
                    style={[
                      styles.button,
                      {
                        backgroundColor: "#3ddc84",
                        width: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: "#fff",
                      },
                    ]}
                  >
                    <Text
                      emphasis="bold"
                      style={{
                        fontSize: 17,
                        color: "#fff",
                        borderColor: "#fff",
                      }}
                    >
                      Send Request
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  createRequestContainer: {
    flex: 1,
  },
  viewContainer: { flex: 1 },
  titleContainer: {
    height: 60,
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#c9c9c9",
    borderBottomWidth: 0.5,
  },
  formContainer: {
    paddingHorizontal: "5%",
    marginTop: 50,
    justifyContent: "center",
  },
  headerContainer: {
    width: "70%",
    height: 30,
    alignItems: "center",
    //backgroundColor: '#F56258',
    //borderRadius: 15,
    zIndex: 2,
    padding: 5,
    //marginLeft: -2,
    marginBottom: -15,
  },
  headerText: {
    fontSize: 18,
    color: "black",
    backgroundColor: "white",
    fontWeight: "800",
  },
  inputContainer: {
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: "5%",
    paddingTop: 20,
    //paddingBottom: -10,
    zIndex: 1,
    justifyContent: "center",
  },
  inputContainer2: {
    height: 160,
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: "5%",
    //paddingTop: 20,
    //paddingBottom: -10,
    zIndex: 1,
    justifyContent: "center",
  },
  locationNote: {
    fontSize: 16,
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1.5,
    padding: 0,
    marginVertical: 20,
  },
  locationText: {
    fontSize: 16,
    marginTop: 5,
  },
  deviceType: {
    fontSize: 16,
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1.5,
    padding: 0,
    marginBottom: 10,
    width: 200,
    maxWidth: "100%",
    marginLeft: 10,
  },
  detailErr: {
    fontSize: 16,
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1.5,
    padding: 0,
    //paddingBottom: 5,
    //marginTop: 10,
    marginBottom: 10,
    width: 200,
    maxWidth: "100%",
    marginLeft: 35,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    // width: "40%",
    borderColor: "#F56258",
    borderWidth: 1,
    // flexDirection: "row",
    height: 45,
    // paddingHorizontal: "6%",
    borderRadius: 20,
  },
  deviceTypeContainer: {
    width: 330,
    height: 40,
    //borderColor: 'black',
    //borderWidth: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
});
