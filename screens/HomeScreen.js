import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Platform,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {Notifications} from 'expo';
import * as firebase from 'firebase';
import BottomSheet from 'reanimated-bottom-sheet';
import NavigationService from '../service/navigation';
import registerForPushNotificationsAsync from '../service/notification';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import DropdownAlert from 'react-native-dropdownalert';
import {PUT} from '../api/caller';
import {ACCEPT_ORDER_ENDPOINT} from '../api/endpoint';
import {TextInput} from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    
    handlerRequestButton = () => {
        NavigationService.navigate('HomeRequestService')
    }


  handleProfileButton = () => {
    NavigationService.navigate("ProfileScreen")
  }

    render () {
    return (
      <View style={styles.container}>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        <StatusBar
          translucent
          backgroundColor="#000"
          barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
        />

        <View style={styles.groupButton}>

          <View style={{flex: 1, marginTop: 20}}>
            <TouchableOpacity onPress={this.handlerRequestButton}>
              <View style={styles.buttonView}>
                <Image
                  style={{width: 70, height: 70}}
                  source={require ('../assets/images/car_1.png')}
                />
                <Text style={styles.mainButtonText}>
                  Request Fixxy Serivce
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* //   <View style={{flex: 1}}>
          //     if()
          //     <TouchableOpacity onPress={this.stop}>
          //       <View style={styles.buttonView}>
          //         <Image
          //           style={{width: 70, height: 70}}
          //           source={require ('../assets/images/car_1.png')}
          //         />
          //         <Text style={styles.mainButtonText}>
          //           Stop Finding Job
          //         </Text>
          //       </View>
          //     </TouchableOpacity>
          //   </View>
          // } */}

          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.stopJob}>
              <View style={styles.buttonView}>
                <Image
                  style={{width: 70, height: 70}}
                  source={require ('../assets/images/medical-history.png')}
                />
                <Text style={styles.mainButtonText}>
                  History Jobs
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.handleProfileButton}>
              <View style={styles.buttonView}>
                <Image
                  style={{width: 70, height: 70}}
                  source={require ('../assets/images/car_1.png')}
                />
                <Text style={styles.mainButtonText}>
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#f0eff4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 20,
    backgroundColor: '#d0f5ee',
    alignItems: 'center',
    width: Dimensions.get ('screen').width,
    height: Dimensions.get ('screen').height * 7 / 10,

    // justifyContent: 'center',
  },

  groupButton: {
    height: Dimensions.get ('screen').height * 2 / 3,
    width: Dimensions.get ('screen').width * 9 / 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainButtonText: {
    fontSize: 25,
    color: 'white',
  },

  buttonView: {
    padding: 20,
    backgroundColor: 'rgba(80, 203, 203, 1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get ('screen').width * 8 / 10,
  },

  buttonCancelView: {
    padding: 15,
    backgroundColor: '#d63d2f',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get ('screen').width * 8 / 10,
  },
});
