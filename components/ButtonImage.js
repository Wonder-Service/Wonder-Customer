import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "galio-framework";

export default class ButtonImage extends React.Component {

  render() {
    const { icon, text, onPress } = this.props;
      return(
    <View style={{ flex: 1, marginTop: 20 }}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonView}>
          <Image
            style={{ width: 70, height: 70 }}
            source={icon}
          />
          <Text style={styles.mainButtonText}
          >
              {text}
        </Text>
        </View>
      </TouchableOpacity>
    </View>
      );
  }
}

const styles = StyleSheet.create({
    mainButtonText: {
        fontSize: 25,
        color: 'white',
      },
    
      buttonView: {
        padding: 20,
        backgroundColor: 'rgba(80, 203, 203, 1)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get ('screen').width * 8 / 10,
      },
      buttonCancelView: {
        padding: 15,
        backgroundColor: '#d63d2f',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get ('screen').width * 8 / 10,
      },
})
