import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {IPropsSeparator} from './Separator.d';
import Colors from '../../Assets/Colors';

const Separator = ({
  height = StyleSheet.hairlineWidth,
  width,
  borderStyle = 'solid',
  borderColor = Colors.DownRiver,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  marginHorizontal,
  marginVertical,
  flex,
}: IPropsSeparator) => {
  const style: ViewStyle = useMemo(() => {
    return {
      height,
      width,
      backgroundColor: borderColor,
      borderStyle,
      marginHorizontal,
      marginVertical,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      flex,
    };
  }, [
    flex,
    height,
    width,
    borderStyle,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginHorizontal,
    marginVertical,
    borderColor,
  ]);

  return <View style={style} />;
};

export default React.memo(Separator);
