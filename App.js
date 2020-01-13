import React, { Component } from "react";
import { Platform, StatusBar, View, TextInput, Text, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { applyMiddleware, createStore } from "redux";
import appReducer from "./app/reducers/index";
import { ActionCreators } from "./app/actions/index";
import RootStackCreator from "./app/routes/start";
import NavigationService from "./app/config/NavigationService";
import { Provider } from "react-redux";
import { setCustomText } from "react-native-global-props";
import SplashScreen from "react-native-splash-screen";
import DeviceInfo from "react-native-device-info";
import * as Utils from "./app/lib/utils";

const store = createStore(appReducer, applyMiddleware(/*middleware, */));
const customTextProps = { style: { fontFamily: "Poppins" } };
setCustomText(customTextProps);

global.userData = null;
global.deviceType = DeviceInfo.isTablet() ? 'tablet' : 'phone';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps.allowFontScaling = false;
  }

  async componentDidMount() {
    let appState = await Utils.getStateAsyncStorage("appData");
    if (appState) {
      store.dispatch(ActionCreators.setInitialState(appState));
      global.userData = appState.userData;
    }
    await this.setState({ isReady: true });
    if (Platform.OS === "android") {
      await Utils.requestStoragePermission();
      StatusBar.setBackgroundColor("#318fff", false);
    }
    StatusBar.setHidden(false);
    StatusBar.setBarStyle("light-content", false);
    SplashScreen.hide();
  }

  render() {
    let appState = store.getState();
    let signedIn = false;
    try {
      signedIn = appState.appData.userData.token.length > 0 ? true : false;
    } catch (error) {
      signedIn = false;
    }
    // signedIn = true;
    const RootStack = RootStackCreator(signedIn);
    const AppContainer = createAppContainer(RootStack);

    if (this.state.isReady) {
      return (
        <Provider store={store}>
          <AppContainer ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
        </Provider>
      );
    } else {
      return <View />;
    }
  }
}