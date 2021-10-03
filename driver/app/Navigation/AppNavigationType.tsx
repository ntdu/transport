// ---------------- Auth Stack ----------------

export type AuthStackParams = {
  SplashScreen: undefined
  AuthScreen: undefined
  SignInScreen: undefined
  ForgotPasswordScreen: undefined
  SignUpScreen: undefined
  OTPScreen: { userName: string }
}

export type BookingStackParams = {
  InforPackageScreen: undefined
  DestinationScreen: undefined
  DashboardScreen: undefined
  SearchPlacesScreen: undefined
  RideScreen: undefined
  OrderTrackingScreen: undefined
  PhaseRenderScreen: undefined
  SimpleMapScreen: undefined
  QRScreen: undefined
}

export type SettingStackParams = {
  SettingScreen: undefined
  ProfileScreen: undefined
  OrderHistoryScreen: undefined
  NotificationScreen: undefined
  ChangePasswordScreen: undefined
  InviteFriendScreen: undefined
}

export type MainStackParams = {
  BookingStack: BookingStackParams
  SettingStack: SettingStackParams
}

export type RootStackParams = {
  AuthStack: AuthStackParams
  MainStack: BookingStackParams
}
