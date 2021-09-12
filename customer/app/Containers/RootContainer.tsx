import React, { useEffect } from 'react'
import { StatusBar } from 'react-native';
import ReduxNavigation from '@/Navigation/ReduxNavigation';

// Redux
import { useDispatch } from 'react-redux'
import StartupActions from '@/Redux/StartupRedux'

// Components
// import { RNetWork } from '@/Components'
import { Text } from 'react-native';

const RootContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(StartupActions.startup())
  }, [])
  console.log("------------------------------------------------------------------")
  console.log("RootContainer")
  return (
   
    <>
      <StatusBar translucent barStyle={'dark-content'} />
      {/* <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      /> */}
      {/* <Text>ABc</Text> */}
      <ReduxNavigation />
   
    </>

  )
}

export default RootContainer
