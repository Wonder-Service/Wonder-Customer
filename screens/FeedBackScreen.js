import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  KeyboardAvoidingView,
  AsyncStorage,

} from 'react-native';
import { WORKER } from './FindingServiceScreen';
import { Rating } from 'react-native-ratings';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import NavigationService from '../service/navigation';
import { PUT, GET } from '../api/caller';
import Text from '../components/FontText';
import { ACCEPT_ORDER_ENDPOINT, USER_ENDPOINT } from '../api/endpoint';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class FeedBackScreen extends React.Component {
  state = {
    rate: 5,
    txtFeedBack: '',
    orderId: 1,
    workerName: '',
    phone: '',
    workerId: '',
  };

  async componentDidMount() {
    let orderNewId = await AsyncStorage.getItem('orderId')


    await GET(
      ACCEPT_ORDER_ENDPOINT + '/' + orderNewId,
      {},
      {}
    ).then((resOrderNew) => {
      this.setState({
        workerId: resOrderNew.workerId,
      })
    })

    await GET(
      USER_ENDPOINT + '/' + this.state.workerId,
      {},
      {},
    ).then((resWorker) => {
      this.setState({
        workerName: resWorker.fullname,
        phone: resWorker.phone,
      })
    })
  }

  ratingCompleted = rate => {
    this.setState({ rate: rate });
  };

  handleFeedbackButton = async () => {
    let orderNewId = await AsyncStorage.getItem('orderId')
    await PUT(
      ACCEPT_ORDER_ENDPOINT,
      {},
      {},
      {
        id: orderNewId,
        rate: this.state.rate,
        feedback: this.state.txtFeedBack,
      }
    ).then(res => {
      NavigationService.navigate('HomeScreenV2');
    })
  };

  render() {
    let workerId = AsyncStorage.getItem('workerId');
    const { txtFeedBack } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <View style={styles.feedBackFormContainer}>
            <Text
              style={{
                fontSize: 25,
                padding: 20,
                paddingTop: 20,
                fontFamily: 'lato-bold',
              }}
            >
              Feed Back Our Service
            </Text>
            <View style={styles.infoWorker}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{ width: 122, height: 122, marginTop: 15 }}
                  source={{
                    uri: 'https://www.pngrepo.com/png/17468/170/avatar.png',
                  }}
                />
                <View style={{ flexDirection: 'column' }}>
                  <View style={styles.textRow}>
                    <Text style={styles.textHeader}>Worker</Text>
                    <Text style={styles.text}>: {this.state.workerName}</Text>
                  </View>
                  <View style={styles.textRow}>
                    <Text style={styles.textHeader}>Phone</Text>
                    <Text style={styles.text}>: {this.state.phone}</Text>
                  </View>
                </View>
              </View>

            </View>

            <View
              style={{
                borderRadius: 2,
                borderColor: 'white',
                borderWidth: 0,
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    marginTop: 20,
                    color: '#ff9051',
                    fontSize: 32,
                    fontWeight: 'bold',
                  },
                ]}
              >
                Rate me, Thank you!
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                borderColor: 'black',
                borderWidth: 0,
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  { marginTop: 30, color: '#ff9051', fontSize: 22 },
                ]}
              >
                Please Swipe to Rate
              </Text>
              <Rating
                showRating
                imageSize={40}
                ratingTextColor="#ff9051"
                ratingColor="#ff9051"
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10 }}
                startingValue={5}
              />

              <View
                style={{
                  marginTop: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 1,
                  // borderColor: 'pink'
                }}
              >
                <Text
                  style={{
                    paddingLeft: 25,
                    paddingRight: 25,
                    fontSize: 18,
                    color: 'black',
                  }}
                >
                  I hope to received your comments to improve our services,
                  <Text
                    style={{
                      color: '#f1c40f',
                      fontWeight: 'bold',
                      fontSize: 25,
                    }}
                  >
                    Thank you!
                  </Text>
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  padding: 20,
                }}
              >
                <View
                  style={{
                    borderColor: '#ff9051',
                    borderRadius: 15,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >

                  <TextInput
                    style={{
                      fontSize: 18,
                      height: 70,
                      width: width * 8 / 10,
                      borderRadius: 5,
                      paddingBottom: 7,
                    }}
                    onChangeText={text => {
                      this.setState({ txtFeedBack: text });
                    }}
                    value={txtFeedBack}
                  />

                </View>
                <View>
                  <Button
                    style={{ height: '100%', borderRadius: 2 }}
                    title="FEEDBACK"
                    color="#ff9051"
                    onPress={
                      this.handleFeedbackButton
                    }
                  />
                </View>
              </View>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  feedBackFormContainer: {
    width: width * 9 / 10,
    height: height * 9 / 10,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15.19,
    elevation: 23,
  },
  headingContainer: {
    paddingTop: 50,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    color: '#27ae60',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#34495e',
  },
  viewContainer: {
    flex: 1,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 3
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '700',
    padding: 6,
    width: '30%',

  },
  text: {
    width: '70%',
    fontSize: 20,
    padding: 6,
    // fontWeight: '700',
    color: '#000',
  },
});
