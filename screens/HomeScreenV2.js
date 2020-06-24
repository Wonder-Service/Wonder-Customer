import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableHighlight, Image, Dimensions } from 'react-native';
import NavigationService from '../service/navigation';
import { FontAwesome5 } from '@expo/vector-icons';
const hp = Dimensions.get ('screen').height;
const wp = Dimensions.get ('screen').width;


export default class HomeScreenV2 extends React.Component {

  handlerSelectCatogery = (skillId) => {
    NavigationService.navigate("RequestDetailScreen", { skillId: skillId })
  }

  render() {
    return (
      <SafeAreaView style={styles.Containter}>
        <StatusBar />
        <TouchableHighlight onPress={() => NavigationService.navigate("ProfileScreen")} >
        <View style={styles.bgHeader}>
          <Text style={styles.headerStyle}>Wonder Worker</Text>
          {/* <View style={styles.profile}>
            <Icon
              name='user-circle'
              type='font-awesome-5'
              color='#000'
            />
          </View> */}
          <View style={styles.profile}>
          <FontAwesome5 name="user-circle" size={24} color="black" />
          </View>
        </View>
        </TouchableHighlight>
        <View style={styles.welContainer}>
          <Text style={styles.wel}>Xin Chào!</Text>
          <Text style={styles.wel}>Chúng tôi có thể giúp gì được bạn?</Text>
        </View>

        <View style={styles.menu}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuText}>Dịch Vụ Sửa Chữa</Text>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(1)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/television.png')}
                />
                <Text style={styles.text}>Thiết bị giải trí</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(2)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/lamp.png')}
                />
                <Text style={styles.text}>Thiết bị chiếu sáng</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(3)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/washing-machine.png')}
                />
                <Text style={styles.text}>Thiết bị giặt ủi</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(4)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/cutlery.png')}
                />
                <Text style={styles.text}>Thiết bị nhà bếp</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(5)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/air-conditioner.png')}
                />
                <Text style={styles.text}>Điều hoà</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(6)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/faucet.png')}
                />
                <Text style={styles.text}>Hệ thống nước</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(7)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/Wifi.png')}
                />
                <Text style={styles.text}>Hệ thống internet</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(8)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/computer.png')}
                />
                <Text style={styles.text}>Máy tính và điện tử</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.menu}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuText}>Dịch Vụ Hỗ Trợ</Text>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(9)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/household.png')}
                />
                <Text style={styles.text}>Làm việc nhà</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(10)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/Garden.png')}
                />
                <Text style={styles.text}>Chăm sóc vườn</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(11)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/nail.png')}
                />
                <Text style={styles.text}>Chăm sóc móng</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.itemContainer}>
            <TouchableHighlight
              onPress={() => {
                this.handlerSelectCatogery(12)
              }
              }>
              <View style={styles.item}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/makeup.png')}
                />
                <Text style={styles.text}>Trang điểm</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Containter: {
    flex: 1,
    backgroundColor: '#f0eff4',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  header: {
    flex: 1,
    width: '100%',
  },
  menuText: {
    fontSize: (hp/100) * 2.3 ,
    fontWeight: '400',
    paddingHorizontal: 20
  },
  menuHeader: {
    width: wp/100 * 99.7,
    height: hp/100 * 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#f0eff4'
  },
  itemContainer: {
    width: wp/100 * 24.6,
    height: wp/100 * 24.6,
    overflow: 'hidden',
    borderTopWidth: 0,
    borderWidth: 0.224,
    margin: wp/100 * 0.15,
  },
  item: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 15
  },
  container: {
    flexDirection: 'row',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 24,
  },
  text: {
    fontSize: hp/100 * 1.2
  },
  welContainer: {
    // flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: hp/100 * 12,
    justifyContent: 'center',
    marginTop: hp/100 * 0.17,
  },
  wel: {
    fontSize: hp/100 * 3,
    fontWeight: '700',
    paddingHorizontal: 20,
    // marginTop: 20
  },
  bgHeader: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems:'center',
    elevation: 10,
    height: hp/100 * 7.5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    flexDirection: 'row',
    position: 'relative'
  },
  headerStyle: {
    fontSize: 25,
    textAlign: 'center',
    marginLeft: wp/100 * 5.5,
    color: '#000',
  },
  profile: {
    marginRight: wp/100 * 5.5,
    alignItems: 'center'
  }
});
