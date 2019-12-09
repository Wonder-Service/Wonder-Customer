import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NavigationService from '../service/navigation';
import {Notifications} from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { POST, GET } from '../api/caller';
import { USER_ENDPOINT } from '../api/endpoint';
// import IconE from 'react-native-vector-icons/Entypo';

const height = Dimensions.get ('screen').height;
const width = Dimensions.get ('screen').width;

class Body extends React.Component {

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
            <Text>Đã tìm thấy thợ!</Text>

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
              <Text>{this.props.workerData.skillName}</Text>
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
                Worker's diagnose about your problem 
              </Text>
              <Text style={{
                textAlign:'left',
                fontSize: 18,
                padding:10,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 40,
              }}>
                Need to change the adapter
              </Text>
            </View>
            <Text>Worker ask you this price for the serivce</Text>
            <View
              style={{
                borderRadius: 15,
                marginTop: 10,
                backgroundColor:'red',
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
                paddingBottom:20,
              }}
            >
              <TouchableOpacity
                onPress={() => NavigationService.navigate ('Rating')}
              >
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
                onPress={() => NavigationService.navigate ('Rating')}
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
                NavigationService.navigate ('RequestDetailService');
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
      skillName: 'Sửa điều hòa', 
      rate: 5, 
      phoneNumber: '03030213123',
    },
    priceSerivce: 200000,
    workerUsername: null,

  };
  handleCancel = () => {
    // stop handle notification
    // back to Request Service Detail
    NavigationService.navigate ('RequestDetailScreen');
  };

  handleNotification = async (notification) => {
    await this.setState({notification: notification})
    this.setState({
      worker: {
        name: this.notificat
      }
    });
    await GET(USER_ENDPOINT,{},{},)
    .then( res => {
        
    }).catch(error => {
      console.log('FindingServiceScreen GET USER ERROR')
    })
  }
  async componentDidMount () {
    this._notificationSubscription = Notifications.addListener (noti => {
      this.setState ({notification: noti});
    });
     
  }

  render () {
    const {notification, worker, priceSerivce} = this.state;
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
