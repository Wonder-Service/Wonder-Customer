import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PUT } from '../api/caller';
import NavigationService from "../service/navigation";
import { ACCEPT_ORDER_ENDPOINT } from '../api/endpoint';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AcceptWokerPopup = (props) => {

  const handleAccept = async () => {
    let orderNewId = await AsyncStorage.getItem('orderId')
    console.log(orderNewId)
    console.log("worker", props.workerData.id)
    await PUT(
      ACCEPT_ORDER_ENDPOINT + '/' + orderNewId,
      {},
      {},
      {
        workerId: props.workerData.id,
      }
    ).then(res => {
      console.log(res)
      if (res.status === 200) {
        NavigationService.navigate('MapDirection');
      }
    });
  };


  return (
    <View style={{ marginTop: 70 }}>
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
            style={{ width: 122, height: 122, marginTop: 15 }}
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
            {props.workerData.name}{' '}
          </Text>
          <Icon
            name="shield-check"
            style={{ fontSize: 25, color: '#3ddc84' }}
          />
        </View>
        <FlatList
          data={props.workerData.skills}
          keyExtractor={item => (
            item.id.toString()
          )}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )
          }
        />
        <View style={{ flexDirection: 'row' }}>
          <Icon name="star" style={styles.starIcon} />
          <Icon name="star" style={styles.starIcon} />
          <Icon name="star" style={styles.starIcon} />
          <Icon name="star" style={styles.starIcon} />
          <Icon name="star-half" style={styles.starIcon} />
        </View>
        <Text style={{ fontSize: 16 }}>
          {props.workerData.phoneNumber}
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity onPress={handleAccept}>
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
          <TouchableOpacity onPress={props.handleDecline(true)}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#edebe9',
  },
  headerTextView: {
    width: width * 9 / 10,
    marginTop: 30,
    backgroundColor: '#f0eff4',
  },
  headerText: {
    padding: 20,
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#edebe9',
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

export default AcceptWokerPopup;
