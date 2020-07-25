import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SigninScreen from "./SigninScreen";
import SignupScreen from './SignupScreen'

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SigninScreen" component={SigninScreen} />
    <RootStack.Screen name="SignupScreen" component={SignupScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
