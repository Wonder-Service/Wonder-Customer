import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { PUT } from '../api/caller';
import NavigationService from '../service/navigation';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';

import { POST, POSTLOGIN, GET } from '../api/caller';
import {
  CANCEL_ORDER_ENDPOINT,
  POST_NOTIFICATION_ENDPOINT,
  NOTIFICATION_TYPE_CANCEL,
  ACCEPT_ORDER_ENDPOINT,
} from '../api/endpoint';
import DropdownAlert from 'react-native-dropdownalert';
import { Notifications } from 'expo';

var firebaseConfig = {
  apiKey: 'AIzaSyCkUqpsRdN83jH8o2y5ZfQ6VHYOydEPOSQ',
  authDomain: 'fixxyworker.firebaseapp.com',
  databaseURL: 'https://fixxyworker.firebaseio.com',
  projectId: 'fixxyworker',
  storageBucket: 'fixxyworker.appspot.com',
  messagingSenderId: '492536156918',
  appId: '1:492536156918:web:f8d8feaa2c267b261d92d7',
  measurementId: 'G-78KBVBX2N2',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class MapDirection extends Component {
  constructor (props) {
    super (props);
  }

  state = {
    latitude: 10,
    longitude: 104,
    currentLocation: {
      coords: {
        latitude: 10,
        longitude: 104,
      },
    },
    destinationCoords: {
      latitude: 10,
      longitude: 104,
    },
    address: null,
    notification: null,
  };

  handleNotification = async noti => {
    this.setState({ notification: noti });
    switch (notification.data.notificationType === NOTIFICATION_TYPE_REQEST) {
      case NOTIFICATION_TYPE_CANCEL:
        NavigationService.navigate('HomeScreenV2');
        break;
      case NOTIFICATION_TYPE_COMPELETE:
        NavigationService.navigate('FeedBackScreen');
        break;
    }
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const latitudePicked = await AsyncStorage.getItem('picklatitude');
    const longitudePicked = await AsyncStorage.getItem('pickLongitude');
    const isPicked = await AsyncStorage.getItem('isPickerMap');
    console.log("checkPicker", isPicked)
    if (status != 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    if (isPicked === "false") {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ currentLocation: location });
      this.setState({ address: this.props.navigation.getParam('address') });
    } else {
      this.setState({
        currentLocation: {
          coords: {
            latitude: +latitudePicked,
            longitude: +longitudePicked
          }
        },
      });
    }

    // this.setState({
    //   destinationCoords: this.props.navigation.getParam('coords'),
    // });

    this._notificationSubscription = Notifications.addListener(noti => {
      this.handleNotification(noti);
    });
    this.readWorkerCoords();
    console.log('Mapdirection On');
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      // let orderId = await AsyncStorage.getItem('orderId');
      // GET(ACCEPT_ORDER_ENDPOINT+ '/'+ orderId, {} ,{})
      // .then(
      //   res => {
      //     if(res===200) {
      //       this.setState({destinationCoords: {
      //         latitude: res.lat,
      //         longitude: res.lng
      //       }})
      //       console.log('Destination Coords update')
      //     } else {
      //       DropdownAlert.alertWithType ('error', 'Error Message','Get Order ERROR');
      //     }
      //   }
      // )
      console.log('Mapdirection On');
      this.readWorkerCoords();
    }
  }

  async readWorkerCoords() {
    const workerDeviceId = await AsyncStorage.getItem('worker_device_id');
    // consHt workerDeviceId = '_I9054NjcBrONYHt2Vja44';
    let coordsRef = firebase.database().ref('/' + workerDeviceId);
    coordsRef.on('value', snapshot => {
      this.setState({
        destinationCoords: {
          latitude: snapshot.val().latitude,
          longitude: snapshot.val().longitude,
        },
      });
    });
  }

  handleCancel = async () => {
    let orderNewId = await AsyncStorage.getItem('orderId');
    await PUT(
      ACCEPT_ORDER_ENDPOINT,
      {},
      {},
      {
        id: orderNewId,
        status: 'CANCELED',
      }
    ).then(res => {
      NavigationService.navigate('HomeScreenV2');
    })
  };

  render() {
    const {
      latitude,
      longitude,
      currentLocation,
      address,
      destinationCoords,
    } = this.state;
    if (latitude) {
      return (
        <View style={styles.container}>
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
          <MapView
            showsUserLocation
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapViewDirections
              origin={currentLocation.coords}
              destination={destinationCoords}
              apikey={'AIzaSyDn2ruHQmquB33aoQK3d0QLsGsN6bLLm1c'}
              strokeWidth={3}
              strokeColor="blue"
              errorMessage={error => {
                console.log(error);
              }}
            />
            <Marker
              coordinate={destinationCoords}
              image={require('../assets/images/car_1.png')}
            />

          </MapView>
          <TouchableOpacity onPress={this.handleCancel}>
            <View style={styles.buttonCancelView}>
              <Text style={styles.mainButtonText}>Cancel This Order</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  mapViewStyle: {
    alignItems: 'center',
    flex: 1,
  },
  subContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 7 / 10,

    // justifyContent: 'center',
  },

  groupButton: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width * 9 / 10,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainButtonText: {
    fontSize: 20,
    color: 'white',
  },

  buttonView: {
    padding: 20,
    backgroundColor: 'rgba(80, 203, 203, 1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: Dimensions.get('screen').width * 8 / 10,
  },
  buttonCancelView: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#d63d2f',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 8 / 10,
  },
  buttonCompleteView: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#34c3eb',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 8 / 10,
  },
});
