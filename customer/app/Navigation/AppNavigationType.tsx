// ---------------- Auth Stack ----------------

// import { HistoryByDate } from '@/Types'

export type AuthStackParams = {
  SplashScreen: undefined
  AuthScreen: undefined
  SignInScreen: undefined
  // ForgotPasswordScreen: undefined
  SignUpScreen: undefined
  OTPScreen: { userName: string }
}

// // ---------------- Home Stack ----------------
export type HomeStackParams = {
  HomeScreen: undefined
}

// // ---------------- Account Stack ----------------
// export type AccountStackParams = {
//   AccountScreen: undefined
// }

// // ---------------- History Stack ----------------
// export type HistoryStackParams = {
//   History: HistoryMeterialTabParams
//   HistoryDetail: { historyByDate: HistoryByDate }
// }

// // ---------------- Tab Params----------------
// export type HistoryMeterialTabParams = {
//   StaticHistory: undefined
//   DayHistory: undefined
// }
// export type TabParams = {
//   Home: HomeStackParams
//   History: HistoryMeterialTabParams
//   Account: AccountStackParams
// }
export type TabParams = {
  Home: HomeStackParams
}
// // ---------------- Main Stack----------------

// export type MainStackParams = {
//   TabScreen: TabParams
//   RideScreen: undefined
//   PhaseRideScreen: undefined
//   PayScreen: undefined
// }

export type MainStackParams = {
  TabScreen: TabParams
  RideScreen: undefined
}

export type RootStackParams = {
  AuthStack: AuthStackParams
  MainStack: MainStackParams
}
