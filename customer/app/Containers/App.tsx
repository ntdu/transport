/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import createStore from '@/Redux';
import RootContainer from './RootContainer';

// create our store
export const store = createStore()

const App = () => {
  
  return (
    <Provider store={store}>
      <RootContainer />
      {/* <Language /> */}
    </Provider>
  );
};

export default App;
