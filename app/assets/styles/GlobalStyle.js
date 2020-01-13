import {Platform, StyleSheet} from "react-native";
import * as Utils from "../../lib/utils";

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  imageBackground: {
    width: Utils.width,
    height: Utils.height,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: Utils.moderateScale(14),
    paddingTop: Utils.verticalScale(5)
  },
  textHeading: {
    color: "#030103",
    fontFamily: "Poppins-Regular",
    fontSize: Utils.moderateScale(16),
    fontWeight: "500",
    paddingTop: Utils.verticalScale(3)
  },
  textBlack: {
    color: "#000"
  },
  textContent: {
    color: "#A3A3A3"
  },
  textWhite: {
    color: "#FFFFFF"
  },
  textPrimary: {
    color: "#333333"
  },
  textWarning: {
    color: "#F76D02"
  },
  textInfo: {
    color: "#FFC02D"
  },
  textDanger: {
    color: "#A50310"
  },
  textError: {
    color: "#E21818"
  },
  textPlaceholder: {
    color: "#A3A3A3"
  },
  textURL: {
    color: "#0C3BC1"
  },
  card: {
    borderRadius: Utils.moderateScale(Platform.OS == "android" ? 10 : 8),
    paddingVertical: Utils.moderateVerticalScale(5),
    paddingHorizontal: Utils.moderateVerticalScale(3),
    margin: Utils.moderateScale(2),
    fontSize: Utils.moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  cardWhite: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF"
  },
  cardInfo: {
    backgroundColor: "#FFDA22",
    borderColor: "#FFDA22"
  },
  cardDanger: {
    backgroundColor: "#A50310",
    borderColor: "#A50310"
  },
  cardWarning: {
    backgroundColor: "#F76D02",
    borderColor: "#F76D02"
  },
  cardSeparator: {
    backgroundColor: "#DDDDDD"
  },
  header: {
    width: Utils.width,
    backgroundColor: "#333",
    height: Utils.moderateVerticalScale(80),
    paddingTop: Utils.moderateVerticalScale(10),
    elevation: 0
  },
  headerBody: {
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "flex-start",
    flex: 8
  },
  headerTitle: {
    marginLeft: Utils.moderateScale(10),
    color: "#fff",
    fontWeight: '900',
    fontSize: Utils.moderateScale(14)
  },
});
