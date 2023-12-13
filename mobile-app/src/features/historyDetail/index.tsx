import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, XStack } from 'tamagui';
import Header from '../../shared/components/Header';
import { useRoute } from '@react-navigation/native';
import { callAPIV2 } from '../../shared/utils';
import endpoint from '../../shared/services/network/endpoint';
import HistoryItem from '../../shared/components/HistoryItem';
import { Image, Send } from '@tamagui/lucide-icons';
import { RefreshControl, TouchableOpacity } from 'react-native';
import _ from 'lodash';

const HistoryDetailScreen = () => {
  const { params } = useRoute<any>();

  const historyData = params?.data;

  const [medicines, setMedicines] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrescription = () => {
    callAPIV2({
      API: endpoint.getPrescription,
      payload: { medicalHistoryId: historyData.id },
      beforeSend: () => setRefreshing(true),
      onSuccess(res) {
        setMedicines(res.data);
      },
      onFinaly: () => setRefreshing(false),
    });
  };

  useEffect(() => {
    fetchPrescription();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View flex={1}>
      <Header title={'Detail'} showBackButton />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchPrescription}
          />
        }
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 12 }}>
        <HistoryItem disablePress data={historyData} />
        {!_.isEmpty(medicines) && (
          <View mt={'$3'} bg={'#fff'} br={7} px={'$4'} py={'$3'}>
            <Text fontWeight={'bold'} fontSize={15} mb={'$2'}>
              Prescriptions
            </Text>
            <View gap={'$2'}>
              {medicines.map((item, index) => (
                <View key={index}>
                  <XStack justifyContent="space-between">
                    <Text fontSize={15}>Name:</Text>
                    <Text fontWeight={'bold'} fontSize={15}>
                      {item.medicine.name}
                    </Text>
                  </XStack>
                  <XStack justifyContent="space-between" mt={'$1'}>
                    <Text fontSize={15}>Instructions:</Text>
                    <Text fontWeight={'bold'} fontSize={15}>
                      {item.userManual}
                    </Text>
                  </XStack>
                </View>
              ))}
            </View>
          </View>
        )}
        <XStack justifyContent="center" mt={'$5'} gap={'$4'}>
          <TouchableOpacity>
            <View alignItems="center">
              <View p={'$4'} br={999} bg={'#66CA98'}>
                <Send color={'#FFF'} />
              </View>
              <Text mt={'$1'}>Share</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View alignItems="center">
              <View p={'$4'} br={999} bg={'#66CA98'}>
                <Image color={'#FFF'} />
              </View>
              <Text mt={'$1'}>Gallary</Text>
            </View>
          </TouchableOpacity>
        </XStack>
      </ScrollView>
    </View>
  );
};

export default HistoryDetailScreen;
