import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import NavigationService from '../service/navigation';
import {Notifications} from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {POST, GET, POSTLOGIN, POST_NOTIFICATION, PUT} from '../api/caller';
import {
  USER_ENDPOINT,
  NOTIFICATION_TYPE_ACCEPT,
  NOTIFICATION_TYPE_REQEST,
  NOTIFICATION_TYPE_COMPELETE,
  ACCEPT_ORDER_ENDPOINT,
} from '../api/endpoint';

const height = Dimensions.get ('screen').height;
const width = Dimensions.get ('screen').width;

class Body extends React.Component {
  handleAccept = async () => {
    let orderId = await AsyncStorage.getItem ('orderId');
    await PUT (
      ACCEPT_ORDER_ENDPOINT + '/' + orderId,
      {},
      {},
      {
        workerId: this.props.workerData.id,
      }
    ).then (res => {
      // if (res.status === 200) {
        NavigationService.navigate ('MapDirection');
      // }
    });
  };

  render () {
    if (this.props.notification) {
      return (
        <View style={{marginTop: 70}}>
          <View style={styles.foundContainer}>
            <View
              style={{
                width: 130,
                height: 130,
                borderRadius: 65,
                marginTop: -65,
                backgroundColor: '#F56258',
                overflow: 'hidden',
                borderWidth: 4,
                borderColor: 'white',
              }}
            >
              <Image
                style={{width: 122, height: 122, marginTop: 15}}
                source={{
                  uri: 'https://www.pngrepo.com/png/17468/170/avatar.png',
                }}
              />
            </View>
            <Text>Found A Worker</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                emphasis="bold"
                style={{
                  fontSize: 25,
                  justifyContent: 'center',
                }}
              >
                {this.props.workerData.name}{' '}
              </Text>
              <Icon
                name="shield-check"
                style={{fontSize: 25, color: '#3ddc84'}}
              />
            </View>
            <FlatList 
              data = {this.props.workerData.skills}
              keyExtractor={item => (
                item.id.toString()
              )}
              renderItem= {({item}) => (
                <Text>{item.name}</Text>
              )
            }
            />
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" style={styles.starIcon} />
              <Icon name="star" style={styles.starIcon} />
              <Icon name="star" style={styles.starIcon} />
              <Icon name="star" style={styles.starIcon} />
              <Icon name="star-half" style={styles.starIcon} />
            </View>
            <Text style={{fontSize: 16}}>
              {this.props.workerData.phoneNumber}
            </Text>
            <View>
              <Text>
                Worker's diagnose about your problem{' '}
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: 18,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 40,
                }}
              >
                {this.props.diagnoseMess}
              </Text>
            </View>
            <Text>Worker ask you this price for the serivce</Text>
            <View
              style={{
                borderRadius: 15,
                marginTop: 10,
                backgroundColor: 'red',
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  paddingHorizontal: 30,
                  paddingVertical: 5,
                }}
              >
                {this.props.priceSerivce} VND
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingBottom: 20,
              }}
            >
              <TouchableOpacity onPress={this.handleAccept}>
                <View
                  style={{
                    marginTop: 25,
                    marginRight: 15,
                    width: width * 3 / 10,
                    color: 'white',
                    backgroundColor: 'green',
                    borderRadius: 20,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      color: 'white',
                    }}
                  >
                    Accept
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => NavigationService.navigate ('RequestDetailScreen')
              }
              >
                <View
                  style={{
                    marginTop: 25,
                    width: width * 3 / 10,
                    color: 'white',
                    backgroundColor: 'red',
                    borderRadius: 20,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      color: 'white',
                    }}
                  >
                    Decline
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <IconE
              name="triangle-down"
              style={{
                fontSize: 100,
                color: '#FFF',
                marginTop: -30,
              }}
            /> */}
          </View>

        </View>
      );
    } else {
      return (
        <View>
          <Image
            style={{marginVertical: 80}}
            source={require ('../assets/images/searching.gif')}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationService.goBack ();
              }}
              style={[
                styles.button,
                {
                  backgroundColor: 'red',
                  width: '70%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#fff',
                },
              ]}
            >
              <View style={{width: '100%', alignItems: 'center'}}>
                <Text
                  emphasis="bold"
                  style={{
                    fontSize: 17,
                    color: '#fff',
                    borderColor: '#fff',
                  }}
                >
                  Cancel Service
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

export default class FindingServiceScreen extends React.Component {
  state = {
    notification: null,
    worker: {
      name: 'Nguyen Lương',
      skills: [],
      rate: 5,
      phoneNumber: '03030213123',
      deviceId: null,
    },
    priceSerivce: 200000,
    workerUsername: null,
    diagnoseMess: 'Need to change battery ',
  };
  handleCancel = () => {
    // stop handle notification
    // back to Request Service Detail
    NavigationService.navigate ('RequestDetailScreen');
  };

  handleNotification = async noti => {
    this.setState ({notification: noti});
    await AsyncStorage.setItem ('workerId', noti.data.workerId + '');
    switch (this.state.notification.data.notificationType) {
      case NOTIFICATION_TYPE_REQEST:
        await this.setState ({
          priceSerivce: this.state.notification.data.price,
        });

        await this.setState ({
          diagnoseMess: this.state.notification.data.diagnoseMess,
        });
        await GET (
          USER_ENDPOINT + '/' + noti.data.workerId,
          {},
          {}
        ).then (res => {
          console.log (res);
          WORKER = res;
          this.setState ({
            worker: {
              id: res.id,
              name: res.username,
              skills: res.skills,
              rate: 5,
              phoneNumber: null,
              deviceId: res.deviceId,
            },
          });
           AsyncStorage.setItem('worker_device_id', this.state.worker.deviceId)
        });

        break;
      case NOTIFICATION_TYPE_COMPELETE:
        NavigationService.navigate ('FeedBackScreen');
        break;
    }
  };
  async componentDidMount () {
    this._notificationSubscription = Notifications.addListener (noti => {
      this.handleNotification (noti);
    });
  }

  render () {
    const {notification, worker, priceSerivce, diagnoseMess} = this.state;
    const renderBody = this.renderBody;
    return (
      <View style={styles.container}>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}>
            {this.state.notification == null
              ? 'System is finding worker for you'
              : 'Found a worker for you'}
          </Text>
        </View>
        <Body
          notification={notification}
          workerData={worker}
          priceSerivce={priceSerivce}
          diagnoseMess={diagnoseMess}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerTextView: {
    width: width * 9 / 10,
    marginTop: 30,
    backgroundColor: '#f0eff4',
  },
  headerText: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: '40%',
    borderColor: '#F56258',
    borderWidth: 1,
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    borderRadius: 25,
  },
  foundContainer: {
    width: width * 9 / 10,
    // height: 370,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    zIndex: 4,

    shadowColor: '#000',
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
    color: '#ff9501',
  },
});

export let WORKER = {};
