import {RouteProp} from '@react-navigation/native';
import {Routes} from '../NavigationRoutes';

export type BottomTabNavigatorParamList = {
  Pending: undefined;
  Error: undefined;
  Completed: undefined;
};

export type ErrorScreenRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  Routes.Error
>;

export type CompletedRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  Routes.Completed
>;
