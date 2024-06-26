import {ColorValue} from 'react-native';

export interface IPropsCheckBox {
  size?: number;
  isSelected: boolean;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  selectedBgColor?: ColorValue;
  bgColor?: ColorValue;
  selectBorderColor?: ColorValue;
  borderColor?: ColorValue;
  checkIconColor?: ColorValue;
  checkIconSize?: number;
}
