import React, { useEffect, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  Keyboard,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Formik } from 'formik'
// import messaging from '@react-native-firebase/messaging'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import {
  AuthStackParams,
  RootStackParams
} from '@/Navigation/AppNavigationType'

import { 
  AuthScreens,
  MainScreens,
  AppStacks
} from '@/Constants/AppNavigationConstants'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import AuthActions from '@/Redux/AuthRedux'
import { RootState } from '@/Types'

// Components
import {
  BLabelTextInput,
  BButton,
  BActivityIndicator,
  BBackButton
} from '@/Components'

// Functions
import { refTextInputFocus } from '@/Functions/RefFunctions'
import ValidateSignIn from '@/Functions/Validates/ValidateSignIn'
import { confirmAlert } from '@/Functions/AlertFunctions'

// Styles
import styles from './Styles/SignInScreenStyles'

// Language
import { translate } from '@/Language'

type SignInScreenNavigationProp = StackNavigationProp<
  AuthStackParams,
  AuthScreens.SignInScreen
>
type NavigationProp = StackNavigationProp<RootStackParams, AppStacks.AuthStack>

type Value = {
  userName: string
  password: string
}

let isSignIn = false
const SignInScreen = () => {
  // const navigation = useNavigation<SignInScreenNavigationProp>()
  const navigation = useNavigation<NavigationProp>()
  const dispatch = useDispatch()

  const [tempUserName, setTempUserName] = useState('')

  const { fetchingSignInRequest, errorSignIn } = useSelector(
    (state: RootState) => state.auth
  )

  const passwordRef = useRef<TextInput>(null)

  const onPhoneNumberSubmitEditing = () => refTextInputFocus(passwordRef)

  const onPressSignInButton = (values: Value) => {
    Keyboard.dismiss()
    const { userName, password } = values
    dispatch(AuthActions.signInRequest(userName, password))
    setTempUserName(userName)
    isSignIn = true
  }

  const navigateToOTPScreen = () => {
    console.log('navigateToOTPScreen')
    // navigation.navigate(AuthScreens.OTPScreen, {
    //   userName: tempUserName
    // })
  }

  const navigateToForgotPassword = () => {
    console.log('navigateToForgotPassword')
    // navigation.navigate(AuthScreens.ForgotPasswordScreen)

  }

  // useEffect(() => {
  //   // eslint-disable-next-line prettier/prettier
  //   ;(async () => {
  //     const authStatus = await messaging().requestPermission()
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL
  //     if (!enabled) {
  //       return
  //     }
  //     console.log('AUTH STATUS: ', authStatus)
  //     const fcmToken = await messaging().getToken()
  //     if (!fcmToken) {
  //       return
  //     }
  //     console.log('FIREBASE TOKEN: ', fcmToken)
  //     messaging().onMessage(async (remoteMessage) => {
  //       Alert.alert('A message', JSON.stringify(remoteMessage))
  //     })
  //   })()
  // })

  const navigateToHomeScreen = () => {
    console.log('navigateToHomeScreen')
    navigation.reset({
      index: 0,
      routes: [
        {
          name: AppStacks.MainStack,
          params: { screen: MainScreens.HomeScreen }
        }
      ]
    })
  }

  useEffect(() => {
    if (!fetchingSignInRequest && isSignIn) {
      isSignIn = false
      if (errorSignIn) {
        return confirmAlert({
          title: 'Error Sign In',
          content: 'Your username and password is ront',
          onPressOK: () => {}
        })
      }
      // navigateToOTPScreen()
      navigateToHomeScreen()
    }
  }, [isSignIn, fetchingSignInRequest, errorSignIn])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.contentWrapper}
        behavior={'padding'}
        keyboardVerticalOffset={0}
        enabled={Platform.OS === 'ios'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <BBackButton wrapperStyle={styles.bBackButton} />
          <Text style={styles.signInText}>{translate('signIn')}</Text>
          <Formik
            initialValues={{
              userName: '0919696141',
              password: 'Kaaa@m11e23f58Z!AV44!!'
            }}
            onSubmit={(values) => onPressSignInButton(values)}
            validationSchema={ValidateSignIn}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <>
                <BLabelTextInput
                  value={values.userName}
                  label={translate('userName')}
                  wrapperStyle={styles.textInput}
                  errorMessage={errors.userName}
                  isRequired
                  returnKeyType={'next'}
                  keyboardType={'number-pad'}
                  onChangeText={handleChange('userName')}
                  onSubmitEditing={onPhoneNumberSubmitEditing}
                />
                <BLabelTextInput
                  ref={passwordRef}
                  value={values.password}
                  label={translate('password')}
                  wrapperStyle={styles.textInput}
                  errorMessage={errors.password}
                  isRequired
                  secureTextEntry
                  returnKeyType={'done'}
                  onChangeText={handleChange('password')}
                />
                <BButton
                  content={translate('SignIn')}
                  buttonStyle={styles.buttonStyle}
                  onPressButton={handleSubmit}
                />
                <TouchableOpacity
                  onPress={navigateToForgotPassword}
                  style={styles.forgotPasswordButton}
                >
                  <Text style={styles.forgotPassword}>
                    {translate('forgotPassword').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      {fetchingSignInRequest && <BActivityIndicator />}
    </SafeAreaView>
  )
}

export default SignInScreen
