import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useLayoutEffect} from 'react';
import {
  CheckBox,
  DocumentItem,
  Separator,
} from '../../Components/ComponentsRoot';
import {useCompletedScreen} from './CompletedScreenHook';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Assets/AssetsRoot';

const CompletedScreen = () => {
  const {
    completedDocuments,
    selectedCount,
    isAllSelected,
    clearAllDoc,
    selectDocument,
    selectAllDocument,
  } = useCompletedScreen();
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
          type="Completed"
          onPressUpload={() => {}}
          onPressCancel={() => {}}
          onPressSelect={() => selectDocument(item)}
        />
      );
    },
    [selectDocument],
  );

  const renderHeader = useCallback(() => {
    return (
      <TouchableOpacity style={styles.listHeader} onPress={selectAllDocument}>
        {completedDocuments !== null && completedDocuments.length !== 0 ? (
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
  }, [completedDocuments, isAllSelected, selectedCount, selectAllDocument]);

  const renderHeaderRight = useCallback(() => {
    return (
      <TouchableOpacity onPress={clearAllDoc}>
        <Icon
          name="trash-outline"
          size={22}
          color={Colors.White}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    );
  }, [clearAllDoc]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Completed',
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <View style={styles.container}>
      <View style={styles.itemView}>
        <FlatList
          data={completedDocuments}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={renderSeparatorComponent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    padding: 10,
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  deleteIcon: {
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

export default CompletedScreen;
