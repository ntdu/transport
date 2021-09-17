import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import AuthActions from '@/Redux/AuthRedux'
import { RootState, RegisterType } from '@/Types'

// Navigation
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParams } from '@/Navigation/AppNavigationType'
import { AuthScreens } from '@/Constants/AppNavigationConstants'

// Components
import RenderPhase from './Components/RenderPhase'
import { BActivityIndicator } from '@/Components'

// Functions
import ValidateSchema from '@/Functions/Validates/ValidateSignUp'
import { confirmAlert } from '@/Functions/AlertFunctions'

// Constants
import { errorAuthSignUp } from '@/Constants/ErrorNetworkConstants'
import { translate } from '@/Language'
let isSignUp = false

type SignUpScreenNavigationProps = StackNavigationProp<
  AuthStackParams,
  AuthScreens.SignUpScreen
>

type Values = {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: boolean
  dateOfBirth: string
  address: string
}

const SignUpScreen = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation<SignUpScreenNavigationProps>()

  const authState = useSelector((state: RootState) => state.auth)

  const { fetchingSignUpRequest, errorSignUp } = authState

  const [phone_number, setPhoneNumber] = useState('')
  const [phase, setPhase] = useState(0)

  const dateOfBirth = new Date('1998-11-24').toISOString().substr(0, 10)

  const increasePhase = () => setPhase(phase + 1)

  const decreasePhase = () => setPhase(phase - 1)

  const handleSignUp = async (values: Values) => {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      address
    } = values
    const registerDetail: RegisterType = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
      address
    }
    setPhoneNumber(phoneNumber)
    isSignUp = true
    dispatch(AuthActions.signUpRequest(registerDetail))
  }

  const navigateToOtpScreen = () =>
    navigation.navigate(AuthScreens.OTPScreen, {
      userName: phone_number
    })

  useEffect(() => {
    if (isSignUp && !fetchingSignUpRequest) {
      if (errorSignUp) {
        switch (errorSignUp) {
          case errorAuthSignUp.WEAK_PASSWORD:
            confirmAlert({
              title: translate('passwordWeak'),
              content: translate('pleaseChangePassword'),
              onPressOK: () => {}
            })
            break
          case errorAuthSignUp.USED_EMAIL_OR_PHONE_NUMBER:
            confirmAlert({
              title: translate('sameUserNameorPassword'),
              content: translate('pleaseChooseAnotherNameorPassword'),
              onPressOK: () => {}
            })
            break
          default:
            break
        }
        setPhase(0)
        return
      }
      // navigateToOtpScreen()
      isSignUp = false
    }
  }, [fetchingSignUpRequest, errorSignUp, isSignUp])

  return (
    <>
      <Formik
        initialValues={{
          email: 'ntdu198@gmail.com',
          lastName: 'Nguyen',
          firstName: 'Du',
          password: 'Kaaa@m11e23f58Z!AV44!!',
          gender: false,
          dateOfBirth,
          address: '123 Tran Hung Dao',
          phoneNumber: '0354471333'
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values) => {
          handleSignUp(values)
        }}
      >
        <RenderPhase
          phase={phase}
          increasePhase={increasePhase}
          decreasePhase={decreasePhase}
        />
      </Formik>
      {fetchingSignUpRequest && <BActivityIndicator />}
    </>
  )
}

export default SignUpScreen
