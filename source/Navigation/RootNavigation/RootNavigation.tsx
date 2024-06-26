import React, {useEffect} from 'react';
import {Routes} from '../NavigationRoutes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from '../../Assets/AssetsRoot';
import {TabNavigatorScreenOptions} from '../NavigationConfigs';
import {NetInfo} from '../../Services/NetInfoService';

// screens
import PendingScreen from '../../Screens/PendingScreen/PendingScreen';
import ErrorScreen from '../../Screens/ErrorScreen/ErrorScreen';
import CompletedScreen from '../../Screens/CompletedScreen/CompletedScreen';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  /**
   * Subscribe network availability
   */
  useEffect(() => {
    NetInfo.subscribeNetInfoService();

    return () => {
      NetInfo.unsubscribeNetInfoService();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.Primary} />
      <Tab.Navigator screenOptions={TabNavigatorScreenOptions}>
        <Tab.Screen name={Routes.Pending} component={PendingScreen} />
        <Tab.Screen name={Routes.Error} component={ErrorScreen} />
        <Tab.Screen name={Routes.Completed} component={CompletedScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigation;
