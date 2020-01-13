import React, {Component} from "react";
import {Image, Modal, StyleSheet, Text, View} from "react-native";
import * as Utils from "../lib/utils";

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.loading && (
        <Modal
          transparent={true}
          animationType={"fade"}
          visible={this.props.loading}
          onRequestClose={() => {
          }}
        >
          <View style={style.modalBackground}>
            <View
              style={[
                style.activityIndicatorWrapper,
                this.props.message &&
                this.props.message.length > 0 &&
                style.activityIndicatorWrapperWidthHeight
              ]}
            >
              {this.props.message && this.props.message.length > 0 ? (
                <Text style={style.message}>{this.props.message}</Text>
              ) : null}
              <Image source={require('../assets/Images/img/loading.gif')} style={{
                height: Utils.moderateVerticalScale(75),
                width: Utils.moderateVerticalScale(75)
              }}/>
            </View>
          </View>
        </Modal>
      )
    );
  }
}

const style = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#0000004a"
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: Utils.moderateScale(100),
    width: Utils.moderateScale(100),
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  activityIndicatorWrapperWidthHeight: {
    height: Utils.moderateScale(110),
    width: Utils.moderateScale(225)
  },
  message: {
    fontFamily: "Poppins-Regular",
    fontSize: Utils.moderateScale(14)
  }
});
