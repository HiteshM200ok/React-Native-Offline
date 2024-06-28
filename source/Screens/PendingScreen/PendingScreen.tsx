import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {Colors} from '../../Assets/AssetsRoot';
import {useCallback, useLayoutEffect} from 'react';
import {
  CheckBox,
  DocumentItem,
  Separator,
} from '../../Components/ComponentsRoot';
import {usePendingScreen} from './PendingScreenHook';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const PendingScreen = () => {
  const {
    pendingDocuments,
    isAllSelected,
    selectedCount,
    onPickFiles,
    clearAllDoc,
    uploadDocument,
    selectDocument,
    uploadAllDoc,
    cancelDocument,
    selectAllDocument,
  } = usePendingScreen();
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
          type="Pending"
          onPressUpload={() => uploadDocument(item, 'Active')}
          onPressCancel={cancelDocument}
          onPressSelect={() => selectDocument(item)}
        />
      );
    },
    [uploadDocument, cancelDocument, selectDocument],
  );

  const renderHeader = useCallback(() => {
    return (
      <TouchableOpacity style={styles.listHeader} onPress={selectAllDocument}>
        {pendingDocuments !== null && pendingDocuments.length !== 0 ? (
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
  }, [pendingDocuments, isAllSelected, selectedCount, selectAllDocument]);

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
        <TouchableOpacity onPress={onPickFiles}>
          <Icon
            name="document-text-outline"
            size={22}
            color={Colors.White}
            style={styles.pickIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={clearAllDoc}>
          <Icon
            name="trash-outline"
            size={22}
            color={Colors.White}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }, [uploadAllDoc, onPickFiles, clearAllDoc]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Pending',
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <View style={styles.container}>
      <View style={styles.itemView}>
        <FlatList
          data={pendingDocuments}
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
  noItemText: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  itemView: {
    flexGrow: 1,
  },
  cloudIcon: {
    marginLeft: 20,
  },
  pickIcon: {
    marginLeft: 30,
  },
  deleteIcon: {
    marginLeft: 30,
  },
});

export default PendingScreen;
