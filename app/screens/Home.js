import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import LoaderInline from "../components/LoaderInline";
import { ActionCreators } from "../actions/index";
import * as Enum from '../lib/enums';
import firebase, { Notification, NotificationOpen } from 'react-native-firebase'; // If you want to add Firebase notification

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  _isMounted = false;

  constructor(props) {
    super(props);
    this.refresh = this.props.navigation.getParam('refresh') || false
  }

  async componentDidMount() {
    this._mounted = true;
    /**
     * Uncomment below line if you want to add Firebase Notification, for more information check rnfirebase.io
     */
    // const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    // this.setState({ isMounted: true }, () => {
    //   if (notificationOpen) {
    //     if (global.userData) {
    //       this.props.navigation.navigate('Notification');
    //     }
    //   }

    //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    //     if (global.userData) {
    //       this.props.navigation.navigate('Notification');
    //     }
    //   });

    //   this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
    //     let n = notification;
    //     if (global.userData) {
    //       const localNotification = new firebase.notifications.Notification()
    //         .setTitle(n.data.title)
    //         .android.setChannelId('default_notification_channel_id')
    //         .android.setAutoCancel(true)
    //         .android.setPriority(firebase.notifications.Android.Priority.Max)
    //         .setSound("default")
    //         .setBody(n.data.body)
    //         .setData({
    //           notification_type: n.data.notification_type,
    //           item_id: n.data.item_id,
    //         });
    //       firebase.notifications().displayNotification(localNotification);
    //     }
    //   });
    // });
  }

  componentWillReceiveProps(props) {
    const refresh = props.navigation.getParam('refresh') || false;
    if (refresh != this.refresh) {

    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <LoaderInline loading={true} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return { userData: state.appData.userData };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: data => dispatch(ActionCreators.updateUserData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
