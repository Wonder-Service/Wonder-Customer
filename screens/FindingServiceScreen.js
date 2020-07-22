import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import NavigationService from "../service/navigation";
import { Notifications } from "expo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { POST, GET, POSTLOGIN, POST_NOTIFICATION, PUT } from "../api/caller";
import {
  USER_ENDPOINT,
  NOTIFICATION_TYPE_ACCEPT,
  NOTIFICATION_TYPE_REQEST,
  NOTIFICATION_TYPE_COMPELETE,
  ACCEPT_ORDER_ENDPOINT,
} from "../api/endpoint";
import HomeScreenV2 from "./HomeScreenV2";
import FindingComponent from "../components/FindingComponent";
import AcceptWokerPopup from "../components/AcceptWorkerPopup";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default class FindingServiceScreen extends React.Component {
  state = {
    isnoti: true,
    worker: {
      name: "",
      skills: [],
      rate: 5,
      phoneNumber: "",
      deviceId: null,
    },
    priceSerivce: 200000,
    workerUsername: null,
    diagnoseMess: "Need to change battery ",
    isDecline: false,
  };

  handleNotification = async (noti) => {
    await AsyncStorage.setItem("workerId", noti.data.workerId + "");
    switch (noti.data.notificationType) {
      case NOTIFICATION_TYPE_REQEST: {
        await this.setState({
          priceSerivce: noti.data.price,
        });

        await this.setState({
          diagnoseMess: noti.data.diagnoseMess,
        });
        await GET(USER_ENDPOINT + "/" + noti.data.workerId, {}, {}).then(
          (res) => {

            WORKER = res;
            this.setState({
              worker: {
                id: res.id,
                name: res.fullname,
                skills: res.skills,
                rate: res.rate,
                phoneNumber: res.phone,
                deviceId: res.deviceId,
              },
            });
            // this.setState({isDecline:true});
            AsyncStorage.setItem(
              "worker_device_id",
              this.state.worker.deviceId
            );
          }
        );
        await this.setState({isnoti: false})
        // this.setState({isDecline: false})
        await console.log(this.state.isnoti)
        break;
      }
      case NOTIFICATION_TYPE_COMPELETE:{
        NavigationService.navigate("FeedBackScreen");
        break;
      }
      default: {
        console.log(noti)
      }
    }
  };
  async componentDidMount() {
    this._notificationSubscription = Notifications.addListener((noti) => {
      console.log("this is notification handler")
      this.handleNotification(noti);
    });
  }

  render() {
    const {
      isnoti,
      worker,
      priceSerivce,
      diagnoseMess,
      isDecline,
    } = this.state;
    const renderBody = this.renderBody;

    return (
      <View style={styles.container}>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>
            {isnoti
              ? "System is finding worker for you"
              : "Found a worker for you"}
          </Text>
        </View>

        {isnoti  ? (
          <FindingComponent />
        ) : (
          <AcceptWokerPopup
            workerData={worker}
            handleDecline={(check) => {
              // this.setState({ isnoti: check });
              console.log(check)
            }}
          />
        )}

        {/* {
          isDecline && <FindingComponent/>
        }
         {isDecline && <AcceptWokerPopup workerData={this.state.worker}
         handleDecline={(check) => {this.setState({isDecline:check})}}/>} */}
      </View>
    );
    console.log(this.state.notification);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#edebe9",
  },
  headerTextView: {
    width: (width * 9) / 10,
    marginTop: 30,
    backgroundColor: "#f0eff4",
  },
  headerText: {
    padding: 20,
    alignContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#edebe9",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: "40%",
    borderColor: "#F56258",
    borderWidth: 1,
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "6%",
    borderRadius: 25,
  },
  foundContainer: {
    width: (width * 9) / 10,
    // height: 370,
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    zIndex: 4,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23,
  },
  starIcon: {
    fontSize: 29,
    color: "#ff9501",
  },
});

export let WORKER = {};
