import React, {useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {IPropsCheckBox} from './Checkbox.d';
import {Colors} from '../../Assets/AssetsRoot';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CheckBox: React.FC<IPropsCheckBox> = ({
  size = 20,
  isSelected = false,
  checkIconColor = Colors.White,
  checkIconSize = 16,
  selectBorderColor = Colors.Black,
  borderColor = Colors.Black49,
  marginBottom,
  marginLeft = 10,
  marginRight,
  marginTop,
  selectedBgColor = Colors.Black,
  bgColor = Colors.White,
}): JSX.Element => {
  const containerStyles: ViewStyle = useMemo(
    () => ({
      height: size,
      width: size,
      borderWidth: 1.5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: isSelected ? selectBorderColor : borderColor,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      backgroundColor: isSelected ? selectedBgColor : bgColor,
    }),
    [
      size,
      isSelected,
      borderColor,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      selectBorderColor,
      selectedBgColor,
      bgColor,
    ],
  );

  return (
    <View style={containerStyles}>
      {isSelected ? (
        <MaterialIcons
          name="check"
          size={checkIconSize}
          color={checkIconColor}
        />
      ) : null}
    </View>
  );
};

export default React.memo(CheckBox);
