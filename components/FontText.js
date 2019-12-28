import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export class FontText extends Component {
   render() {
      const { style, children } = this.props;
      const emphasis = this.props.emphasis == undefined ? "normal" : this.props.emphasis;
      return <Text style={[style, styles[emphasis]]}>{children}</Text>;
   }
}

const styles = StyleSheet.create({
   normal: {
      fontFamily: 'lato-regular'
   },
   bold: {
      fontFamily: 'lato-bold'
   },
   medium: {
      fontFamily: 'lato-medium'
   },
   light: {
      fontFamily: 'lato-light'
   }
})

export default FontText;
