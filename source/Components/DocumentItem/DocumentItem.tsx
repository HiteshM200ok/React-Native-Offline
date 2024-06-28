/*eslint radix: ["error", "as-needed"]*/

import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../Assets/AssetsRoot';
import {DocumentUpload} from './DocumentItem.d';
import {useDocumentItemHook} from './DocumentItemHook';
import {useEffect, useRef} from 'react';
import {EventRegister} from 'react-native-event-listeners';
import {isPlainObject, isNumber} from 'lodash';
import {EventRegisterKeys} from '../../Utils/Utils';

const DocumentItem = ({
  item,
  type = 'Pending',
  onPressUpload,
  onPressCancel,
  onPressSelect,
}: DocumentUpload) => {
  const {count, setCount} = useDocumentItemHook();
  const listener: any = useRef();

  useEffect(() => {
    listener.current = EventRegister.addEventListener(
      EventRegisterKeys.documentUpload,
      value => {
        if (!isPlainObject(value) || !value.guid || !isNumber(value.count)) {
          return;
        }
        if (item.guid !== value.guid) {
          return;
        }
        setCount(parseInt(Number.parseFloat(value.count).toFixed(2)));
      },
    );

    return () => {
      if (listener.current != null) {
        EventRegister.removeEventListener(listener.current);
      }
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDocumentIcon = (itemType: any) => {
    let iconName = '';

    switch (itemType) {
      case 'application/pdf':
        iconName = 'file-pdf-box';
        break;
      case 'image/png':
      case 'image/jpeg':
      case 'image/jpg':
        iconName = 'file-image';
        break;
      default:
        break;
    }

    return iconName;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPressSelect(item);
      }}>
      <View
        aria-disabled={item.isSelected}
        style={[
          styles.container,
          {
            backgroundColor: item.isSelected
              ? Colors.LightGray
              : Colors.LightBlue,
          },
        ]}>
        <View style={styles.item}>
          <Icon
            name={
              item.isSelected
                ? 'checkbox-marked-circle'
                : getDocumentIcon(item.type)
            }
            size={25}
            color={'black'}
          />
          <View style={styles.itemDetailView}>
            <Text> Name: {item.name}</Text>
            <Text> Type: {item.type}</Text>
          </View>
          {item.isUploaded ? (
            <Icon
              name={'checkbox-marked-circle-outline'}
              size={30}
              color={'green'}
              style={styles.completeIcon}
            />
          ) : null}
        </View>
        {!item.isUploaded && type !== 'Completed' ? (
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[
                styles.uploadButton,
                {backgroundColor: item.isSelected ? 'gray' : Colors.Primary},
              ]}
              disabled={item.isUploading || item.isSelected}
              onPress={() => onPressUpload?.(item)}>
              <Text style={styles.buttonText}>
                {item.isUploading ? `Uploading...${count}%` : 'Upload'}{' '}
              </Text>
            </TouchableOpacity>

            {item.isUploading ? (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => onPressCancel?.(item)}>
                <Text style={styles.buttonText}> Cancel </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetailView: {
    flex: 1,
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  uploadButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.Primary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    flex: 1,
    color: Colors.White,
  },
  completeIcon: {
    marginLeft: 10,
  },
});

export default DocumentItem;
