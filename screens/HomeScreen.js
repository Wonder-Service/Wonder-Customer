import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Platform,
  Image,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Notifications } from "expo";
import * as firebase from "firebase";
import BottomSheet from "reanimated-bottom-sheet";
import NavigationService from "../service/navigation";
import registerForPushNotificationsAsync from "../service/notification";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import DropdownAlert from "react-native-dropdownalert";
import { PUT } from "../api/caller";
import { ACCEPT_ORDER_ENDPOINT } from "../api/endpoint";
import { TextInput } from "react-native-gesture-handler";
import { FontText } from "../components/FontText";
import ButtonImage from "../components/ButtonImage";
import Images from "../constants/Images";

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        <StatusBar
          translucent
          backgroundColor="#000"
          barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"}
        />
        <View style={styles.headerBlock}>
          <FontText emphasis='medium' style={{fontSize:30}} >
            Wellcome to Fixxy
          </FontText>
        </View>

        <View style={styles.groupButton}>
          <ButtonImage
            text="Request Fixxy Serivce"
            icon={Images.fixxerIcon}
            onPress={() => {
              NavigationService.navigate("HomeRequestService");
            }}
          />
          <ButtonImage text="History Jobs" icon={Images.fixxerIcon} />
          <ButtonImage text="Profile" icon={Images.fixxerIcon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0eff4",
    alignItems: "center",
  },
  groupButton: {
    height: (Dimensions.get("screen").height * 2) / 3,
    width: (Dimensions.get("screen").width * 9) / 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerBlock: {
    margin: 10, 
    fontSize: 32, 
    alignItems: 'center',
    backgroundColor: "#fff",
    width: (Dimensions.get("screen").width * 9) / 10,
    paddingVertical: 40,
  }
});
