import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'tamagui';
import Header from '../../shared/components/Header';
import HistoryItem from '../../shared/components/HistoryItem';
import { callAPIV2 } from '../../shared/utils';
import endpoint from '../../shared/services/network/endpoint';
import { useStore } from '../../store';

const HistoryScreen = () => {
  const [histories, setHistories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useStore();

  const getMedicalHistory = () => {
    callAPIV2({
      API: endpoint.getMedicalHistory,
      payload: { patientId: user?.id },
      beforeSend: () => setRefreshing(true),
      onSuccess(res) {
        setHistories(res.data);
      },
      onFinaly: () => setRefreshing(false),
    });
  };

  useEffect(() => {
    getMedicalHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View flex={1}>
      <Header title="Medical history" />
      <FlatList
        refreshing={refreshing}
        onRefresh={getMedicalHistory}
        contentContainerStyle={{
          paddingTop: 12,
          paddingHorizontal: 15,
          gap: 10,
        }}
        data={histories}
        renderItem={({ item }) => <HistoryItem data={item} />}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
};

export default HistoryScreen;
