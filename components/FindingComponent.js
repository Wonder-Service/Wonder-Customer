import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import NavigationService from "../service/navigation";
import { PUT } from "../api/caller";
import { ACCEPT_ORDER_ENDPOINT } from "../api/endpoint";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const FindingComponent = () => {
  const handleCancel = async () => {
    let orderNewId = await AsyncStorage.getItem("orderId");
    await PUT(
      ACCEPT_ORDER_ENDPOINT,
      {},
      {},
      {
        id: orderNewId,
        status: "CANCELED",
      }
    ).then((res) => {
      NavigationService.navigate("HomeScreenV2");
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerTextView}>
        <Text style={styles.headerText}>System is finding worker for you</Text>
      </View>
      <Image
        // style={{ marginVertical: 80 }}
        source={require("../assets/images/searching.gif")}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleCancel}
          style={[
            styles.button,
            {
              backgroundColor: "red",
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#fff",
            },
          ]}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text
              emphasis="bold"
              style={{
                fontSize: 17,
                color: "#fff",
                borderColor: "#fff",
              }}
            >
              Cancel Service
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default FindingComponent;
