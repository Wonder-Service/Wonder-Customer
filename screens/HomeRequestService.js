import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Image,

  TouchableHighlight,
	ScrollView,
	Dimensions,Text,
	SafeAreaView
} from 'react-native';
import NavigationService from './../service/navigation';
import { APP_CONST } from '../app.const';

export default class HomeRequestService extends React.Component {
  constructor() {
		super();

		const isPortrait = () => {
			const dim = Dimensions.get('screen');
			return dim.height >= dim.width;
		};

		this.state = {
			orientation: isPortrait() ? 'portrait' : 'landscape'
		};
		// Event Listener for orientation changes
		Dimensions.addEventListener('change', () => {
			this.setState({
				orientation: isPortrait() ? 'portrait' : 'landscape'
			});
		});
	}

	handlerSelectCatogery = (skillId) => {
		NavigationService.navigate("RequestDetailScreen", {skillId:skillId})
	}


	render() {
		return (
			<SafeAreaView>
				<View style={styles.header}>
					<View>
						<Text style={{ paddingLeft: 0, fontSize: 17 }}>
							Xin chào Thắng,
                  </Text>
						<Text style={{ fontSize: 23 }}>
							Chọn loại thiết bị cần sửa chữa
                  </Text>
					</View>
				</View>
					<View style={styles.menu}>
						<View style={styles.itemContainer}>
							<TouchableHighlight
								onPress={() => {
									this.handlerSelectCatogery(1)
								}
								}>
								<View style={styles.item}>
									<Image
										style={styles.image}
										source={APP_CONST.TV_ICON}
									/>
									<Text>Thiết bị giải trí</Text>
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.itemContainer}>
							<TouchableHighlight
							onPress={() => {
								this.handlerSelectCatogery(2)
							}}
							>
								<View style={styles.item}>
									<Image
										style={styles.image}
										source={APP_CONST.LAMP_ICON}
									/>
									<Text>Thiết bị chiếu sáng</Text>
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.itemContainer}>
							<TouchableHighlight onPress={() => {
								this.handlerSelectCatogery(3)
							}}>
								<View style={styles.item}>
									<Image
										style={styles.image}
										source={APP_CONST.WASHING_MACHINE_ICON}
									/>
									<Text>Thiết bị giặt ủi</Text>
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.itemContainer}>
							<TouchableHighlight
							onPress={() => {
								this.handlerSelectCatogery(4)
							}}>
								<View style={styles.item}>
									<Image
										style={styles.image}
										source={APP_CONST.CUTLERY_ICON}
									/>
									<Text>Thiết bị nhà bếp</Text>
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.itemContainer}>
							<TouchableHighlight
							onPress={() => {
								this.handlerSelectCatogery(5)
							}}
							>
								<View style={styles.item}>
									<Image
										style={styles.image}
										source={APP_CONST.AIR_CONDITIONER_ICON}
									/>
									<Text>Điều hoà phòng</Text>
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.itemContainer}>
							<TouchableHighlight
							onPress={() => {
								this.handlerSelectCatogery(6)
							}}
							>
								<View style={styles.item}>
									<Image
										style={styles.image}
										source={APP_CONST.FAUCET_ICON}
									/>
									<Text>Hệ thống nước</Text>
								</View>
							</TouchableHighlight>
						</View>
					</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		height: 75,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: '#f0eff4'
	},
	menu: {
		paddingTop: 20,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		paddingHorizontal: 25,
		paddingBottom: 55,
		backgroundColor: '#f0eff4'
	},
	itemContainer: {
		width: 155,
		height: 190,
		borderRadius: 20,
		overflow: 'hidden',
		marginHorizontal: 5,
		marginBottom: 20,

		// shadow
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 11
		},
		shadowOpacity: 0.57,
		shadowRadius: 15.19,

      elevation: 23
   },
   item: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
   },
   image: {
      width: 80,
      height: 80,
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
});
