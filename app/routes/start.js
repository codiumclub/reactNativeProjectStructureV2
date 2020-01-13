import React from "react";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

const loggedOutStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
}, {
    initialRouteName: "Home",
  }
);

const loggedInStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
}, {
    initialRouteName: "Home",
  }
);


const RootStackCreator = (signedIn = false) => {
  return createSwitchNavigator({
    LoggedOut: {
      screen: loggedOutStack
    },
    LoggedIn: {
      screen: loggedInStack
    }
  }, {
      initialRouteName: signedIn ? "LoggedIn" : "LoggedOut"
    }
  );
};
export default RootStackCreator;