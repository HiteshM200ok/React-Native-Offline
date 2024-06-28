import React from 'react';
import {useCallback, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  CheckBox,
  DocumentItem,
  Separator,
} from '../../Components/ComponentsRoot';
import {useErrorScreen} from './ErrorScreenHook';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../Assets/Colors';

const ErrorScreen = () => {
  const {
    errorDocuments,
    isAllSelected,
    selectedCount,
    clearAllDoc,
    uploadDocument,
    uploadAllDoc,
    selectDocument,
    selectAllDocument,
  } = useErrorScreen();

  const navigation = useNavigation();

  const renderEmptyComponent = useCallback(() => {
    return <Text style={styles.noItemText}> No records found! </Text>;
  }, []);

  const renderSeparatorComponent = useCallback(() => {
    return <Separator />;
  }, []);

  const renderItem = useCallback(
    ({item}: {item: any}) => {
      return (
        <DocumentItem
          item={item}
          type="Error"
          onPressUpload={() => uploadDocument(item, 'Pending')}
          onPressSelect={() => selectDocument(item)}
        />
      );
    },
    [selectDocument, uploadDocument],
  );

  const renderHeader = useCallback(() => {
    return (
      <TouchableOpacity style={styles.listHeader} onPress={selectAllDocument}>
        {errorDocuments !== null && errorDocuments.length !== 0 ? (
          <View style={styles.checkBoxView}>
            <CheckBox marginLeft={0} isSelected={isAllSelected} />
            <Text
              style={
                styles.selectAllText
              }>{`Select All (${selectedCount})`}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  }, [errorDocuments, isAllSelected, selectedCount, selectAllDocument]);

  const renderHeaderRight = useCallback(() => {
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={uploadAllDoc}>
          <Icon
            name="cloud-upload-outline"
            size={22}
            color={Colors.White}
            style={styles.cloudIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={clearAllDoc}>
          <Icon
            name="trash-outline"
            size={22}
            color={Colors.White}
            style={styles.trshIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }, [uploadAllDoc, clearAllDoc]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Error',
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <View style={styles.container}>
      <View style={styles.itemView}>
        <FlatList
          data={errorDocuments}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={renderEmptyComponent}
          ItemSeparatorComponent={renderSeparatorComponent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  listHeader: {
    padding: 10,
    backgroundColor: Colors.White,
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
  },
  cloudIcon: {
    marginLeft: 20,
  },
  trshIcon: {
    marginLeft: 20,
    marginRight: 15,
  },
  itemView: {
    flexGrow: 1,
  },
  noItemText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ErrorScreen;
