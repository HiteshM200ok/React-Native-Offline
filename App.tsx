/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './source/Navigation/RootNavigation/RootNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './source/Redux/Store/ReduxConfigStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
