import React, {Component} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';
import NavigationService from '../service/navigation';
import {POST, GET} from '../api/caller';
import {ACCEPT_ORDER_ENDPOINT, USER_ENDPOINT} from '../api/endpoint';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Req extends Component {
  constructor (props) {
    super (props);
  }

  state = {
    pickCoords: {latitude: null, longitude: null},
    editable: false,
    btnEditText: 'Edit',
    skillId: 1,
    nameDevice: null,
    description: null,
    address: null,
    addressDetail: null,
    customerPhone: null,
    customerName: null,
    isPikerMap: false,
  };

  async componentDidMount () {
    this.focusListener = this.props.navigation.addListener (
      'didFocus',
      async () => {
        try {
          await this.setState ({
            skillId: this.props.navigation.getParam ('skillId', 2),
          });

          await this.setState ({
            pickCoords: {
              latitude: this.props.navigation.getParam ('picklatitude'),
              longitude: this.props.navigation.getParam ('picklongitude'),
            },
          });
          await console.log(this.state.pickCoords)
        } catch (e) {
          console.log ('ReqeustDetailScreen getParam navigation:' + e);
        }

        await GET (USER_ENDPOINT + '?isMyProfile=1', {}, {})
          .then (res => {
            this.setState ({
              customerName: res[0].username,
            });
          })
          .catch (error => {
            console.log ('ReqeustDetailScreen apiget User ERROR');
            console.log (error);
          });
      },

    );
    await AsyncStorage.setItem('isPickerMap', this.state.isPikerMap + '')
  }

  handlePickerMap = async () => {
    await this.setState({
      isPikerMap: true,
    })
    await AsyncStorage.setItem('isPickerMap', this.state.isPikerMap + '')
  }

  render () {
    const {
      editable,
      btnEditText,
      skillId,
      nameDevice,
      description,
      address,
      pickCoords,
      customerPhone,
      customerName,
    } = this.state;
    let param = {
      address: address,
      description: description,
      coords: pickCoords,
      skillId: skillId,
      nameDevice: nameDevice,
      customerPhone: customerPhone,
    };
    return (
      <KeyboardAvoidingView style={styles.createRequestContainer}>
        <View style={styles.viewContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                justifyContent: 'center',
              }}
              onPress={() => NavigationService.navigate ('Tabs')}
            />
            <View style={{alignItems: 'center'}}>
              <Text emphasis="medium" style={{fontSize: 25 , paddingTop: 20 , fontWeight: "800"}}>
                Fixxy Service Detail
              </Text>
            </View>
            <Text emphasis="medium" style={{fontSize: 13, color: '#ff9501'}}>
              {'      '}
            </Text>
          </View>
          <ScrollView>
            <View style={styles.formContainer}>
              <View style={styles.headerContainer}>
                <Text emphasis="medium" style={styles.headerText}>
                  Your Device Information
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.deviceTypeContainer}>
                <Text emphasis="bold" style={styles.locationText}>
                  Device's Name
                </Text>
                <TextInput
                  style={styles.deviceType}
                  placeholder="Ex: Moniter LG MK6300"
                  value={nameDevice}
                  onChangeText={text => {
                    this.setState ({nameDevice: text});
                  }}
                />
                </View>
                <View style={styles.deviceTypeContainer}>
                <Text emphasis="bold" style={styles.locationText}>
                  Description
                </Text>
                <TextInput
                  multiline={true}
                  maxLength={200}
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={styles.detailErr}
                  placeholder="Can't Start up"
                  value={description}
                  onChangeText={text => {
                    this.setState ({description: text});
                  }}
                />
                </View>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.headerContainer}>
                <Text emphasis="medium" style={styles.headerText}>
                  Your Contact Information
                </Text>
              </View>
              <View style={styles.inputContainer2}>
                <View style={styles.deviceTypeContainer}>
                <Text emphasis="bold" style={styles.locationText}>
                  Name
                </Text>
                <TextInput
                  style={styles.deviceType}
                  placeholder={customerName}
                />
                </View>
                <View style={styles.deviceTypeContainer}>
                <Text emphasis="bold" style={styles.locationText}>
                  Phone
                </Text>
                {/* <View style={{flexDirection: 'row', flex: 1}}> */}
                  <TextInput
                    editable={editable}
                    // style={(styles.deviceType, {flex: 8})}
                    style={styles.deviceType}
                    placeholder={customerPhone}
                  />
                </View>

                {/* </View> */}
                <View style={styles.deviceTypeContainer}>
                <Text emphasis="bold" style={styles.locationText}>
                  Address
                </Text>
                <TextInput
                  style={styles.deviceType}
                  placeholder="FPT University, District 9, HCM city"
                />


                <TouchableOpacity
                  onPress={() => {
                    NavigationService.navigate ('MapPickerScreen');
                    this.handlePickerMap();
                  }}
                >
                  <MaterialCommunityIcons style={styles.icon} name="google-maps" size={35} color="black" />
                  {/* <View
                    // style={[
                    //   styles.button,
                    //   {
                    //     backgroundColor: '#3ddc84',
                    //     width: '70%',
                    //     alignItems: 'center',
                    //     justifyContent: 'center',
                    //     borderColor: '#fff',
                    //     marginLeft: 50,
                    //   },
                    // ]}
                  > */}
                    {/* <Text style={{color: '#fff', padding: 5}}>
                      Pick Location On Maps
                    </Text> */}
                  {/* </View> */}
                </TouchableOpacity>


                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <View style={{width: '100%', alignItems: 'center'}}>
              <TouchableOpacity
                    onPress={() => {
                      if (editable) {
                        this.setState ({editable: false});
                      } else {
                        this.setState ({editable: true});
                      }
                      if (btnEditText !== 'Edit') {
                        this.setState ({btnEditText: 'Edit'});
                      } else {
                        this.setState ({btnEditText: 'Ok'});
                      }
                    }}
                  >
                    <View
                       style={[
                         styles.button,
                          {
                            backgroundColor: '#3ddc84',
                            width: '25%',
                            alignItems: 'center',
                            justifyContent: 'center',
                           borderColor: '#fff',
                        },
                     ]}
                    >
                      <Text style={{color: '#fff', padding: 5,}}>
                        {btnEditText}
                      </Text>
                    </View>
                  </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    await POST (ACCEPT_ORDER_ENDPOINT, {}, {}, param)
                      .then ( async (res) => {
                        await AsyncStorage.setItem('orderId', res.orderId+ '')
                        NavigationService.navigate ('FindingServiceScreen', pickCoords);
                      })
                      .catch (error => {
                      });
                  }}
                  style={[
                    styles.button,
                    {
                      backgroundColor: '#3ddc84',
                      width: '70%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#fff',
                    },
                  ]}
                >
                  <Text
                    emphasis="bold"
                    style={{
                      fontSize: 17,
                      color: '#fff',
                      borderColor: '#fff',
                    }}
                  >
                    Send Request
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create ({
  createRequestContainer: {
    flex: 1,
  },
  viewContainer: {flex: 1},
  titleContainer: {
    height: 60,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 0.5,
  },
  formContainer: {
    paddingHorizontal: '5%',
    marginTop: 50,
    justifyContent: 'center'

  },
  headerContainer: {
    width: '70%',
    height: 30,
    alignItems: 'center',
    //backgroundColor: '#F56258',
    //borderRadius: 15,
    zIndex: 2,
    padding: 5,
    //marginLeft: -2,
    marginBottom: -15
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    fontWeight : "800"
  },
  inputContainer: {
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: '5%',
    paddingTop: 20,
    //paddingBottom: -10,
    zIndex: 1,
    justifyContent: 'center',

  },
  inputContainer2: {
    height: 160,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: '5%',
    //paddingTop: 20,
    //paddingBottom: -10,
    zIndex: 1,
    justifyContent: 'center',

  },
  locationNote: {
    fontSize: 16,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1.5,
    padding: 0,
    marginVertical: 20,
  },
  locationText: {
    fontSize: 16,
    marginTop: 5
  },
  deviceType: {
    fontSize: 16,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1.5,
    padding: 0,
    marginBottom: 10,
    width: 200,
    maxWidth: '100%',
    marginLeft: 10,

  },
  detailErr: {
    fontSize: 16,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1.5,
    padding: 0,
    //paddingBottom: 5,
    //marginTop: 10,
    marginBottom: 10,
    width: 200,
    maxWidth: '100%',
    marginLeft: 35,


  },
  buttonContainer: {
    marginTop: 20,
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
    borderRadius: 20,
  },
  deviceTypeContainer: {
    width: 330,
    height: 40,
    //borderColor: 'black',
    //borderWidth: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  descriptionContainer: {
    flexDirection: 'row'
  },
  icon: {
    marginLeft: 20
  }
});
