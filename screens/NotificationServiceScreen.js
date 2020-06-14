import React from 'react';
import {View, StyleSheet, Text, Dimensions, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get ('screen').width;
export default class NotificationServiceScreen extends React.Component {
  state = {
    workerName: null,
   
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerTextView}>
          <Text style={styles.titleText}>
            We found a Worker to fix your problem
          </Text>
        </View>
        {/* Worker information */}
        <View style={styles.headerContainer}>
          <Text emphasis="medium" style={{color: '#ffff', fontSize: 17}}>
            Worker Information
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textStyle}> Worker Name: Dinh Duc Duong</Text>
          <Text style={styles.textStyle}> Phone number: 0300335466</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text emphasis="bold" style={styles.locationText}>
            Device's Name
          </Text>
          <TextInput
            style={styles.deviceType}
            editable={false}
            placeholder="Name Model Device (Ex: Moniter LG MK6300)"
          />
          <Text emphasis="bold" style={styles.locationText}>
            Description
          </Text>
          <TextInput
            multiline={true}
            maxLength={200}
            editable={false}
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.detailErr}
            placeholder="Chi tiết: TV không lên màn hình..."
          />
          <Text>Service Price from Worker:</Text>
          <Text style={{color: 'red'}}>200,000 - 300,000</Text>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => NavigationService.navigate ('FindingServiceScreen')}
            style={[
              styles.button,
              {
                backgroundColor: '#3ddc84',
                width: '70%',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#fff',
                paddingHorizontal: 50,

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
              Accept Price
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => NavigationService.navigate ('FindingServiceScreen')}
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
                paddingHorizontal: 40,
                borderColor: '#fff',
              }}
            >
              Decline
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    padding: 20,
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  headerContainer: {
    width: '70%',
    alignItems: 'center',
    backgroundColor: '#F56258',
    borderRadius: 15,
    zIndex: 2,
    padding: 5,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 15,
    color: '#fff',
  },
  inputContainer: {
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: '5%',
    padding: 20,
    marginTop: -12,
    zIndex: 1,
    width: width * 9 / 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 18,
  },
  headerTextView: {
    width: width * 9 / 10,
    marginTop: 30,
    backgroundColor: '#f0eff4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceType: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 17,
  },
  button: {
    marginTop: 20,
    width: '40%',
    borderColor: '#F56258',
    borderWidth: 1,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: '6%',
    borderRadius: 25
 }
});
