import React from "react";
import { AsyncStorage, Dimensions, Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as URL from "../config/urls";
import { Config } from "../config/appConfig";
import DialogManager, { DialogContent, ScaleAnimation } from "react-native-dialog-component";
import { Images } from "../assets/Images/index";
import * as APP from "../../app.json";
import * as Enums from "./enums";
import { Colors } from "../assets/styles/Colors";
import NetInfo from "@react-native-community/netinfo";
const { width, height } = Dimensions.get("window");
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.25) =>
  size + (scale(size) - size) * factor;
const moderateVerticalScale = (size, factor = 0.25) =>
  size + (verticalScale(size) - size) * factor;

function siteUrl(endpoint = "guest") {
  return URL.API_BASE_URL + endpoint + "/";
}

function displayAlert(
  title = "",
  messageText = "",
  buttonText = "Submit",
  callbackOnOk = null,
  cancelable = false,
  cancelableText = "Cancel",
  dismissOnBackPress = true,
  hasIcon = false,
  icon = Images.alert,
  callbackOnCancel = null
) {
  const displayAlertStyle = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: "#ffffff"
    },
    heading: {
      textAlign: "center",
      color: Colors.LightBlue,
      fontWeight: "bold",
      fontSize: moderateVerticalScale(18)
    },
    messageContainer: {
      marginTop: moderateScale(10),
      width: "85%",
      marginBottom: moderateScale(10)
    },
    messageText: {
      textAlign: "center",
      fontWeight: "bold",
      color: Colors.BlackText,
      fontSize: moderateVerticalScale(16)
    },
    acceptButton: {
      height: moderateVerticalScale(40),
      width: "40%",
      marginHorizontal: moderateScale(10),
      backgroundColor: Colors.LightBlue,
      borderRadius: moderateScale(4),
      justifyContent: "center",
      alignItems: "center"
    },
    cancelButton: {
      height: moderateVerticalScale(40),
      width: "40%",
      marginHorizontal: moderateScale(10),
      backgroundColor: "#ffff",
      borderRadius: moderateScale(4),
      borderColor: Colors.BorderColor,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    acceptButtonText: {
      color: Colors.White,
      fontWeight: "bold",
      fontSize: moderateVerticalScale(14)
    },
    cancelButtonText: {
      color: Colors.PrimaryText,
      fontWeight: "bold",
      fontSize: moderateVerticalScale(14)
    }
  });
  DialogManager.show(
    {
      haveTitleBar: false,
      width: width - scale(50),
      overlayOpacity: 0.4,
      dialogAnimation: new ScaleAnimation(),
      overlayBackgroundColor: "rgb(0, 0, 0)",
      dismissOnHardwareBackPress: dismissOnBackPress,
      dialogStyle: { borderRadius: 10, width: "90%", padding: 0 },
      children: (
        <DialogContent
          contentStyle={{ borderRadius: 10, padding: 0, margin: 0 }}
        >
          <View
            style={[
              displayAlertStyle.container,
              { borderRadius: 10, margin: 0, paddingHorizontal: 0 }
            ]}
          >
            <View
              style={{
                padding: moderateScale(20),
                marginVertical: moderateVerticalScale(5),
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={displayAlertStyle.heading}>{title}</Text>
              {hasIcon ? (
                <View
                  style={{
                    height: moderateScale(45),
                    width: moderateScale(45),
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "transparent",
                    marginVertical: moderateVerticalScale(10)
                  }}
                >
                  <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                      height: moderateScale(40),
                      width: moderateScale(40)
                    }}
                  />
                </View>
              ) : null}
              <View style={displayAlertStyle.messageContainer}>
                <Text style={displayAlertStyle.messageText}>{messageText}</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-evenly",
                alignContent: "center",
                alignItems: "center",
                width: "100%",
                marginHorizontal: 0,
                flexDirection: "row",
                marginBottom: 0,
                height: moderateVerticalScale(80)
              }}
            >
              {cancelable ? (
                <TouchableOpacity
                  onPress={() => {
                    DialogManager.dismissAll(() => {
                      typeof callbackOnCancel === "function" && callbackOnCancel();
                    });
                  }}
                  style={displayAlertStyle.cancelButton}
                >
                  <Text style={displayAlertStyle.cancelButtonText}>
                    {cancelableText.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  DialogManager.dismissAll(() => {
                    typeof callbackOnOk === "function" && callbackOnOk();
                  });
                }}
                style={[displayAlertStyle.acceptButton, cancelable ? {} : { width: '90%' }]}
              >
                <Text style={displayAlertStyle.acceptButtonText}>
                  {buttonText.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DialogContent>
      )
    },
    () => {
      // callback for show
    }
  );
}

function getFormBody(data) {
  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&");
}

function stripTrailingSlash(str) {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
}

async function makeApiRequest(url, endpoint = null, data, headers = {}, method = "POST", isRaw = false, isJson = true, altURL = null, showError = true) {
  let body = isRaw ? data : isJson ? JSON.stringify(data) : getFormBody(data);
  headers["Accept"] = "application/json";
  headers["Content-Type"] = isRaw ? "multipart/form-data" : isJson ? "application/json" : "application/x-www-form-urlencoded";
  let baseURL = altURL != null ? altURL : siteUrl(endpoint);
  baseURL = (endpoint != null && altURL != null) ? baseURL + endpoint + "/" : baseURL;
  const netStatus = await NetInfo.getConnectionInfo()
  if (netStatus.type == 'none' || netStatus.type == 'NONE' || netStatus.type == 'unknown' || netStatus.type == 'UNKNOWN') {
    if (showError) { displayAlert("Oops!", "NETWORK ERROR : Please check your internet connection.", "okay", null, false, "", true, true, Images.alert); }
    return false;
  } else {
    const URL = (url ? baseURL : stripTrailingSlash(baseURL)) + (url ? url : '');
    return fetch(URL, { method: method, headers: headers, body: body, })
      .then(response => { return response.json(); })
      .then(data => {
        if (data === false || typeof data !== "object") {
          if (showError) { displayAlert("Oops!", Enums.GlobalMessages.somethingWentWrong, "okay", null, false, "", true, true, Images.alert); }
          return false;
        } else if (data.statusCode != 200) {
          if (showError) { displayAlert("Oops!", data.message, "okay", null, false, "", true, true, Images.alert); }
          return false;
        } else {
          return data;
        }
      })
      .catch(e => {
        try {
          const error = JSON.parse(e.message);
          if (showError) { displayAlert("Oops!", error.message, "okay", null, false, "", true, true, Images.alert); }
        } catch (e) {
          if (showError) { displayAlert("Oops!", Enums.GlobalMessages.serverError, "okay", null, false, "", true, true, Images.alert); }
        }
        return false;
      });
  }
}

async function getStateAsyncStorage(item) {
  try {
    let savedState = await AsyncStorage.getItem(item);
    if (savedState !== null) {
      let parsedState = await JSON.parse(savedState);
      return parsedState;
    } else {
      return false;
    }
  } catch (error) {
    printLog("Error occurred while retrieving state. Error: " + error);
    return false;
  }
}

async function saveStateAsyncStorage(data) {
  try {
    await AsyncStorage.setItem("appData", JSON.stringify(data));
    return true;
  } catch (error) {
    printLog("Error occurred while saving state. Error: " + error);
    return false;
  }
}

async function requestStoragePermission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': APP.name,
        'message': 'This application need to access your storage to save local data.'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    }
  } catch (err) {
    console.log('Permission Error', err)
  }

  try {
    const permissions = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    ]);
    if (
      permissions[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED && permissions[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    printLog(err);
    return false;
  }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function printLog(...body) {
  return Config.Production == false && console.log(...body)
}

function toUpperCaseFirst(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (e) {
    return string
  }
}

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

function htmlRender(rawData) {
  let data = '<html> <head><meta name="viewport" content="width=device-width, initial-scale=1"> </head> <body>';
  data += rawData;
  data += '</body></html>'
  return data;
}

async function checkInternet(msg = null) {
  const netStatus = await NetInfo.getConnectionInfo();
  if (netStatus.type == 'none' || netStatus.type == 'NONE' || netStatus.type == 'unknown' || netStatus.type == 'UNKNOWN') {
    displayAlert("Oops!", msg || "NETWORK ERROR : Please check your internet connection.", "okay", null, false, "", true, true, Images.alert);
    return false;
  } else {
    return true
  }
}

export {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
  width,
  height,
  siteUrl,
  displayAlert,
  saveStateAsyncStorage,
  getStateAsyncStorage,
  makeApiRequest,
  getFormBody /*, isTablet, isEmpty*/,
  requestStoragePermission,
  getKeyByValue,
  printLog,
  toUpperCaseFirst,
  wait,
  htmlRender,
  checkInternet
};
