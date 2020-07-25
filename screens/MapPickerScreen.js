import React from 'react';
import MapView, {Marker} from 'react-native-maps';

import {StyleSheet, View, Dimensions, Text, Button, AsyncStorage} from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import NavigationService from './../service/navigation';
import {GET} from '../api/caller';

export default class MapPickerScreen extends React.Component {
  state = {
    latitude: 10.855108,
    longitude: 106.767674,
    pickCoords: {
      picklatitude: 10.855108,
      picklongitude: 106.767674,
    },
    address: null,
  };

  coordsPicker = name => {
    return async e => {
      if (e.persist) {
        e.persist (); // Avoids warnings relating to https://fb.me/react-event-pooling
      }
      await this.setState ({
        pickCoords: {
          picklatitude: e.nativeEvent.coordinate.latitude,
          picklongitude: e.nativeEvent.coordinate.longitude,
        },
      });
      await AsyncStorage.setItem('pickLatitude', e.nativeEvent.coordinate.latitude + '')
      await AsyncStorage.setItem('pickLongitude', e.nativeEvent.coordinate.longitude + '' )
    };
  };
  handlePickerCoodrs = () => {
    NavigationService.navigate ('RequestDetailScreen', {pickCoords: this.state.pickCoords});
  };

  render () {
    const {latitude, longitude, pickCoords,address} = this.state;
    const endpoint = new URL ('https://maps.googleapis.com/maps/api/geocode');
    let url = new URL ('/json', endpoint);
    const params = {
      address: address,
      key: 'AIzaSyBF3Kg42z_Q3fVAwJdnuOgxLCcZAj3K56E',
    };
    Object.keys (params).forEach (key =>
      url.searchParams.append (key, params[key])
    );
    return (
      <View style={{flex: 1}}>
        <View
          style={{flex: 1, backgroundColor: '#fff', flexDirection: 'row'}}
        >
          <TextInput
            style={{
              padding: 10,
              marginTop: 15,
              fontSize: 17,
              borderBottomWidth: 1,
              flex: 7,
            }}
            onChangeText={ (text) =>  {
                this.setState({address:text})
            }}
            placeholder="search address"
          />
          <Button
            style={{flex: 3}}
            title="search"
            onPress={async () => {
              await fetch (url, {
                method: 'GET',
              }).then (res => res.json() ).then(data => {
                  this.setState({pickCoords:{picklatitude: data.results[0].geometry.location.lat, picklongitude: data.results[0].geometry.location.lng}})
              });
            }}
          />
        </View>
        <MapView
          style={{flex: 8}}
          onPress={this.coordsPicker ('Map::onPress')}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: pickCoords.picklatitude,
            longitude: pickCoords.picklongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: pickCoords.picklatitude,
              longitude: pickCoords.picklongitude,
            }}
          />

        </MapView>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <TouchableOpacity onPress={this.handlePickerCoodrs}>
            <View
              style={{
                width: Dimensions.get ('screen').width * 8 / 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
                marginStart: 20,
              }}
            >
              <Text style={{color: 'white', padding: 10}}>
                Ok
              </Text>
            </View>
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
});
