import React, {Component} from "react";
import {Image, StyleSheet, View} from "react-native";
import * as Utils from "../lib/utils";

export default class LoaderInline extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.loading && (
        <View style={[style.loading, this.props.style]}>
          <Image source={require('../assets/Images/img/loading.gif')}
                 style={{height: Utils.moderateVerticalScale(75), width: Utils.moderateVerticalScale(75)}}/>
        </View>
      )
    );
  }
}

const style = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
