import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import Login from "./screens/LoginScreen";
import HomeRequestService from "./screens/HomeRequestService";
import HomeScreen from "./screens/HomeScreen";
import FindingServiceScreen from './screens/FindingServiceScreen'
import { createAppContainer} from 'react-navigation';
import NavigationService from "./service/navigation";
import RequestDetailScreen from "./screens/RequestDetailScreen";
import NotificationServiceScreen from "./screens/NotificationServiceScreen"
import MapPickerScreen from "./screens/MapPickerScreen"
import Font from 'expo';
import { Asset } from 'expo-asset'



const Container = createStackNavigator (
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    HomeRequestService: {
      screen: HomeRequestService,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },

    RequestDetailScreen: {
      screen: RequestDetailScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    FindingServiceScreen: {
      screen: FindingServiceScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    NotificationServiceScreen: {
      screen: NotificationServiceScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    MapPickerScreen: {
      screen: MapPickerScreen,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  
  },
  {
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(Container);

export default class App extends React.Component {

  render() {
    return (
      <AppContainer
      ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
         }}
      />
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
