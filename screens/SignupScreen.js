import React, { Component } from "react";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import NavigationService from "../service/navigation";
import { POST } from "../api/caller";
import { USER_CREATE_ENDPOINT } from '../api/endpoint';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default class SignUpScreen extends Component {
  state = ({
    username: "",
    password: "",
    fullname: "",
    phoneNumber: "",
    confirmPass: "",
    check_usernameInputChange: false,
    check_fullnameInputChange: false,
    check_fullnameInputMess: "",
    check_PhoneNumber: false,
    check_PhoneNumberMess: "",
    check_confirm: false,
    check_confirmMess: "",
    securePasswordEntry: true,
    secureConfirmPassEntry: true,
  });

  handlePasswordChange = (val) => {
    this.setState({

      password: val,
    });
  };

  updateSecurePasswordEntry = () => {
    this.setState({

      securePasswordEntry: !this.state.securePasswordEntry,
    });
  };

  handleConfirmPassChange = (val) => {
    this.setState({

      confirmPass: val,
    });
  };

  updateSecureConfirmPassEntry = () => {
    this.setState({

      secureConfirmPassEntry: !this.state.secureConfirmPassEntry,
    });
  };

  handleConfirmPass = () => {
    if (this.state.password === this.state.confirmPass) {
      this.setState({

        check_confirm: true,
        check_confirmMess: " ",
      });
    } else {
      this.setState({

        check_confirm: false,
        check_confirmMess: "Passwords do not match.",
      });
    }
  };

  usernameInputChange = (val) => {
    if (val.length !== 0) {
      this.setState({

        username: val,
        check_usernameInputChange: true,
      });
    } else {
      this.setState({

        username: val,
        check_usernameInputChange: false,
      });
    }
  };

  fullnameInputChange = (val) => {
    this.setState({

      fullname: val,
    });
  };

  handleFullNameInput = (end) => {
    if (end.trim().length >= 8) {
      this.setState({

        check_fullnameInputChange: true,
        check_fullnameInputMess: " ",
      });
    } else {
      this.setState({

        check_fullnameInputChange: false,
        check_fullnameInputMess: "Fullname must be 8 characters long.",
      });
    }
  };

  phoneNumberInputChange = (val) => {
    this.setState({

      phoneNumber: val,
    });
  };

  handlePhoneInput = (end) => {
    if (end.trim().length >= 10 && end.trim().length <= 12) {
      this.setState({

        check_PhoneNumber: true,
        check_PhoneNumberMess: " ",
      });
    } else {
      this.setState({

        check_PhoneNumber: false,
        check_PhoneNumberMess: "Phone number must be 10-12 characters.",
      });
    }
  };

  handleSignUp = async () => {
    console.log ('handle Login');
    const {username, password, fullname, phoneNumber, check_usernameInputChange, check_fullnameInputChange, check_PhoneNumber, check_confirm} = this.state;
    if (check_usernameInputChange && check_fullnameInputChange && check_PhoneNumber && check_confirm) {
      await POST (
        USER_CREATE_ENDPOINT,
        {},
        {},
        {
          username: username,
          password: password,
          fullname: fullname,
          phone: phoneNumber,
          role: "User",
          isDelete: false,
          address: "",
          email: "",
          rate: 0,
          skills:[]
        }
      )
        .then (async res => {
          NavigationService.navigate("Login")
        })
        .catch (error => {
          this.dropDownAlertRef.alertWithType ('error', 'Error', error);
          console.log (error);
        });
    }else{
      this.dropDownAlertRef.alertWithType (
        'warn',
        'Error Message',
        'Please input all request info'
      );
      console.log("err", check_usernameInputChange, check_fullnameInputChange, check_PhoneNumber, check_confirm)
    }
  };

  //   handlePhone = (val) => {};
render(){
  return (

    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={Platform.OS == "ios" ? "40" : "0"}
      style={styles.container}
    >
      <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      {/* <View style={styles.container}> */}
      <StatusBar backgroundColor="rgb(243,129,41)" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>

      <Animatable.View animation="bounceIn" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.text_footer, { paddingTop: 7 }]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={17} color="#05375a" />
            <TextInput
              style={styles.textInput}
              placeholder="Tên đăng nhập"
              autoCapitalize="none"
              onChangeText={(val) => this.usernameInputChange(val)}
            />
            {/* if text input handel this.state icon appear*/}
            {this.state.check_usernameInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" size={20} color="green" />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.text_footer, { paddingTop: 47 }]}>Fullname</Text>
          <View style={styles.action}>
            <Feather name="user-check" size={20} color="black" />
            <TextInput
              style={styles.textInput}
              placeholder="Họ và Tên (Phải trên 8 ký tự)"
              autoCapitalize="none"
              onChangeText={(val) => this.fullnameInputChange(val)}
              onEndEditing={(end) => this.handleFullNameInput(end.nativeEvent.text)}
            />
            {/* if text input handel this.state icon appear*/}
            {this.state.check_fullnameInputMess.length !== 0 ? (
              this.state.check_fullnameInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" size={20} color="green" />
                </Animatable.View>
              ) : (
                <Animatable.View animation="bounceIn">
                  <Feather name="alert-circle" size={20} color="red" />
                </Animatable.View>
              )
            ) : null}
          </View>
          <Text style={styles.textMsg}>{this.state.check_fullnameInputMess}</Text>
          <Text style={[styles.text_footer, { paddingTop: 22 }]}>
            Phone Number
          </Text>
          <View style={styles.action}>
            <Feather name="smartphone" size={20} color="black" />
            <TextInput
              style={styles.textInput}
              placeholder="Số điện thoại (Từ 10 - 12 số)"
              keyboardType="numeric"
              onChangeText={(val) => this.phoneNumberInputChange(val)}
              onEndEditing={(end) => this.handlePhoneInput(end.nativeEvent.text)}
            />
            {/* if text input handel this.state icon appear*/}
            {this.state.check_PhoneNumberMess.length !== 0 ? (
              this.state.check_PhoneNumber ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" size={20} color="green" />
                </Animatable.View>
              ) : (
                <Animatable.View animation="bounceIn">
                  <Feather name="alert-circle" size={20} color="red" />
                </Animatable.View>
              )
            ) : null}
          </View>
          <Text style={styles.textMsg}>{this.state.check_PhoneNumberMess}</Text>
          <Text style={[styles.text_footer, { paddingTop: 22.7 }]}>
            Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" size={20} color="#05375a" />
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              secureTextEntry={this.state.securePasswordEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(val) => this.handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={() => this.updateSecurePasswordEntry()}>
              {this.state.securePasswordEntry ? (
                <Feather name="eye-off" size={20} color="grey" />
              ) : (
                <Feather name="eye" size={20} color="grey" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={[styles.text_footer, { paddingTop: 47.7 }]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" size={20} color="#05375a" />
            <TextInput
              style={styles.textInput}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={this.state.secureConfirmPassEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(val) => this.handleConfirmPassChange(val)}
              onEndEditing={() => this.handleConfirmPass()}
            />
            <TouchableOpacity onPress={() => this.updateSecureConfirmPassEntry()}>
              {this.state.secureConfirmPassEntry ? (
                <Feather name="eye-off" size={20} color="grey" />
              ) : (
                <Feather name="eye" size={20} color="grey" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.textMsg}>{this.state.check_confirmMess}</Text>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={this.handleSignUp}>
              <LinearGradient
                colors={["#FDC830", "#F37335"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: "white" }]}>
                  Submit
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(243,129,41)",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 7,
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
    marginTop: 30,
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
  textMsg: {
    paddingTop: 7,
    fontSize: 12,
    color: "red",
  },
});
