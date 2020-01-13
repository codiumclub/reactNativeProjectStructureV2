
const GlobalMessages = Object.freeze({
  "networkRequestError": "Unable to connect to internet. Please check your connection.",
  "somethingWentWrong": "Something went wrong. Please try again later.",
  "serverError": "Server error. Please try again or Contact the administrator.",
  "loginError": "Unable to process your authentication. Please try again or contact administrator."
});

const UserType = Object.freeze({
  "admin": "admin",
  "subAdmin": "subadmin",
})

const DateFormat = Object.freeze({
  "DDMMYYYY": "DD/MM/YYYY",
  "DashDDMMYYYY": "DD-MM-YYYY",
  "DashYYYYMMDD": "YYYY-MM-DD",
  "MMMDDYYYY": "MMM DD, YYYY",
  "DDMMMYYYY": "DD MMM, YYYY"
})

const UserStatus = Object.freeze({
  "active": "active",
  "blocked": "blocked",
  "deleted": "deleted",
  "inactive": "inactive",
  "bankPending": "bank_pending",
  "paymentPending": "payment_pending"
})

const ShortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export { UserType, DateFormat, UserStatus, GlobalMessages, ShortMonths, FullMonths }