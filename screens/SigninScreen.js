import React, { Component } from "react";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  StatusBar,
  AsyncStorage
} from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import NavigationService from "../service/navigation";
import { POSTLOGIN, POST_NOBODY } from "../api/caller";
import registerForPushNotificationsAsync from "../service/notification";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { LOGIN_ENDPOINT, DEVICEID_ENDPOINT } from '../api/endpoint';

export default class SignInScreen extends Component {
  state = {
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  };

  handlePasswordChange = (val) => {
    this.setState({

      password: val,
    });
  };

  updateSecureTextEntry = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  textInputChange = (val) => {
    if (val.length !== 0) {
      this.setState({

        username: val,
        check_textInputChange: true,
      });
    } else {
      this.setState({

        username: val,
        check_textInputChange: false,
      });
    }
  };

  handleLogin = async () => {
    console.log ('handle Login');
    const {username, password} = this.state;
    if (username === '' || password === '') {
      this.dropDownAlertRef.alertWithType (
        'warn',
        'Error Message',
        'Please Fill username and password'
      );
    } else {
      await POSTLOGIN (
        LOGIN_ENDPOINT,
        {},
        {},
        {
          username: username,
          password: password,
        }
      )
        .then (async res => {
          if (res.status === 200) {
            await registerForPushNotificationsAsync ();
            const jwt = res.headers.get ('Authorization');
            await AsyncStorage.setItem ('jwt', jwt);
            const deviceId = await AsyncStorage.getItem ('device_id');
            await POST_NOBODY (
              DEVICEID_ENDPOINT,
              {},{},
              {
                deviceId: deviceId,
              }
            ).then(res =>
                {
                  NavigationService.navigate("HomeScreenV2")
                }
              )
              .catch (error => {
                console.log (error);
              });
          }
          if (res.status != 200) {
            this.dropDownAlertRef.alertWithType ('error', 'Error', res.status);
          } else {
          }
        })
        .catch (error => {
          this.dropDownAlertRef.alertWithType ('error', 'Error', error);
          console.log (error);
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        <StatusBar backgroundColor="rgb(243,129,41)" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View animation="fadeInLeftBig" style={styles.footer}>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} color="#05375a" />
            <TextInput
              style={styles.textInput}
              placeholder="Tên đăng nhập"
              autoCapitalize="none"
              onChangeText={(val) => this.textInputChange(val)}
            />
            {/* if text input handel this.state icon appear*/}
            {this.state.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" size={20} color="green" />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" size={22.4} color="#05375a" />
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              secureTextEntry={this.state.secureTextEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(val) => {this.handlePasswordChange(val)}}
            />
            <TouchableOpacity onPress={() => this.updateSecureTextEntry()}>
              {this.state.secureTextEntry ? (
                <Feather name="eye-off" size={20} color="grey" />
              ) : (
                <Feather name="eye" size={20} color="grey" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={this.handleLogin}>
              <LinearGradient
                colors={["#FDC830", "#F37335"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: "white" }]}>
                  Sign In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => NavigationService.navigate("SignUp")}
              style={[
                styles.signIn,
                { borderColor: "#FDC830", borderWidth: 1, marginTop: 15 },
              ]}
            >
              <Text style={[styles.textSign, { color: "#FDC830" }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(243,129,41)",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -3,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
