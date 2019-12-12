import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  AsyncStorage,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Button from '../components/Button';
import {LOGIN_ENDPOINT, DEVICEID_ENDPOINT} from '../api/endpoint';
import NavigationService from '../service/navigation';
import {POSTLOGIN, PUT, POST} from '../api/caller';
import registerForPushNotificationsAsync from '../service/notification';
import {APP_CONST} from '../app.const';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Input, Block, theme} from 'galio-framework';
import {Ionicons} from '@expo/vector-icons';

const height = Dimensions.get ('screen').height;
const width = Dimensions.get ('screen').width;

export default class LoginScreen extends Component {
  state = {username: '', password: ''};

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
            await POST (
              DEVICEID_ENDPOINT,
              {},
              {
                Authorization: jwt,
              },
              {
                deviceId: deviceId,
              }
            )
              .then (response => {
                if (response.id != null) {
                  NavigationService.navigate ('HomeScreen');
                } else {
                  this.dropDownAlertRef.alertWithType (
                    'warn',
                    'Login',
                    'Login ERROR ' + response.status
                  );
                }
              })
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
        });
    }
  };

  render () {
    return (
      <ImageBackground
        source={APP_CONST.BG_LOGIN}
        style={styles.containerBackground}
      >
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />

        <View style={styles.container}>
          <View style={styles.logoCointainer}>
            <Image
              source={{
                uri: 'https://www.clipartwiki.com/clipimg/full/146-1460660_handyman-clipart-hardware-store-mr-fix-it-logo.png',
              }}
              style={{
                width: 175,
                height: 175,
                marginBottom: this.state.orientation == 'landscape' ? 0 : 50,
              }}
            />
            <Input
              placeholder="Username"
              color={theme.COLORS.DEFAULT}
              style={{borderColor: theme.COLORS.DEFAULT}}
              style={{width: width * 7 / 10}}
              onChangeText={text => {
                this.setState ({username: text});
              }}
            />
            <Input
              placeholder="password"
              password
              viewPass
              color={theme.COLORS.DEFAULT}
              style={{borderColor: theme.COLORS.DEFAULT}}
              style={{width: width * 7 / 10}}
              onChangeText={text => {
                this.setState ({password: text});
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              style={{width: width * 5 / 10}}
              color="info"
              onPress={this.handleLogin}
            >
              Sign In
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create ({
  containerBackground: {
    flex: 1,
    backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  slogan: {
    marginBottom: 30,
  },
  logoCointainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: '15%',
    width: '100%',
    paddingVertical: '2%',
  },
  titleText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: '5%',
    borderWidth: 1,
    borderColor: '#F56258',
    height: 47,
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
