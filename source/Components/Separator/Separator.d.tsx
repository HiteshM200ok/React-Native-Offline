import {ColorValue} from 'react-native';

export interface IPropsSeparator {
  height?: number;
  width?: number | undefined;
  borderStyle?: 'solid' | 'dotted' | 'dashed' | undefined;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  borderColor?: ColorValue;
  flex?: number;
}
