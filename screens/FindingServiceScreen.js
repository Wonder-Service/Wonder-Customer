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
import { GET, PUT } from "../api/caller";
import {
  USER_ENDPOINT,
  NOTIFICATION_TYPE_REQEST,
  NOTIFICATION_TYPE_COMPELETE,
  ACCEPT_ORDER_ENDPOINT,
} from "../api/endpoint";
import FindingComponent from "../components/FindingComponent";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default class FindingServiceScreen extends React.Component {
  state = {
    isNoti: false,
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

  handleAccept = async () => {
    let orderNewId = await AsyncStorage.getItem("orderId");
    await PUT(
      ACCEPT_ORDER_ENDPOINT + "/" + orderNewId,
      {},
      {},
      {
        workerId: this.state.worker.id,
      }
    ).then((res) => {
      if (res.status === 200) {
        NavigationService.navigate("MapDirection");
      }
    });
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
        await this.setState({ isNoti: true });
        // this.setState({isDecline: false})
        await console.log(this.state.isNoti);
        break;
      }
      case NOTIFICATION_TYPE_COMPELETE: {
        NavigationService.navigate("FeedBackScreen");
        break;
      }
      default: {
        console.log(noti);
      }
    }
  };
  async componentDidMount() {
    this._notificationSubscription = Notifications.addListener((noti) => {
      this.handleNotification(noti);
    });
  }

  handleDecline = () => {
    this.setState({
      isNoti: false,
    })
  }

  render() {
    const { isNoti, worker } = this.state;

    if (isNoti) {
      return (
        <View style={styles.container}>
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>Found a worker for you</Text>
          </View>
          <View style={{ marginTop: 70 }}>
            <View style={styles.foundContainer}>
              <View
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 65,
                  marginTop: -65,
                  backgroundColor: "#F56258",
                  overflow: "hidden",
                  borderWidth: 4,
                  borderColor: "white",
                }}
              >
                <Image
                  style={{ width: 122, height: 122, marginTop: 15 }}
                  source={{
                    uri: "https://www.pngrepo.com/png/17468/170/avatar.png",
                  }}
                />
              </View>
              <Text>Found A Worker</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  emphasis="bold"
                  style={{
                    fontSize: 25,
                    justifyContent: "center",
                  }}
                >
                  {worker.name}{" "}
                </Text>
                <Icon
                  name="shield-check"
                  style={{ fontSize: 25, color: "#3ddc84" }}
                />
              </View>
              <FlatList
                data={worker.skills}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.name}</Text>}
              />
              <View style={{ flexDirection: "row" }}>
                <Icon name="star" style={styles.starIcon} />
                <Icon name="star" style={styles.starIcon} />
                <Icon name="star" style={styles.starIcon} />
                <Icon name="star" style={styles.starIcon} />
                <Icon name="star-half" style={styles.starIcon} />
              </View>
              <Text style={{ fontSize: 16 }}>
                {worker.phoneNumber}
              </Text>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingBottom: 20,
                }}
              >
                <TouchableOpacity onPress={() => {this.handleAccept()}}>
                  <View
                    style={{
                      marginTop: 25,
                      marginRight: 15,
                      width: (width * 3) / 10,
                      color: "white",
                      backgroundColor: "green",
                      borderRadius: 20,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        color: "white",
                      }}
                    >
                      Accept
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.handleDecline()}}>
                  <View
                    style={{
                      marginTop: 25,
                      width: (width * 3) / 10,
                      color: "white",
                      backgroundColor: "red",
                      borderRadius: 20,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        color: "white",
                      }}
                    >
                      Decline
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FindingComponent />
        </View>
      );
    }
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
