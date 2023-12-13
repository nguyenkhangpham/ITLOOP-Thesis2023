import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Input, ScrollView, Text, View, XStack } from 'tamagui';
import R from '../../assets';
import { sHeight } from '../../shared/theme/size';
import {
  Activity,
  CalendarCheck,
  MapPin,
  SlidersHorizontal,
} from '@tamagui/lucide-icons';
import { Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import { searchMock } from './variables/mock';
import { useStore } from '../../store';
import { callAPIV2 } from '../../shared/utils';
import endpoint from '../../shared/services/network/endpoint';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { BOTTOM_TABS } from '../../navigation/stacks/RouteName';
import Carousel from 'react-native-reanimated-carousel';
import HistoryItem from '../../shared/components/HistoryItem';

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useStore();

  const { width } = Dimensions.get('screen');

  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const mockData = Array(3)
    .fill({})
    // @ts-ignore
    .map((n, index) => R.images[`banner_${index + 1}`]);

  const navigation = useNavigation();

  const getMedicalHistoryHome = () => {
    callAPIV2({
      API: endpoint.getMedicalHistory,
      payload: { limit: 3, patientId: user?.id },
      beforeSend: () => setRefreshing(true),
      onSuccess(res) {
        setHistory(res.data);
      },
      onFinaly: () => setRefreshing(false),
    });
  };

  useEffect(() => {
    getMedicalHistoryHome();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      pt={top}
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getMedicalHistoryHome}
        />
      }>
      <XStack px={15} justifyContent="space-between" alignItems="center">
        <View>  
          <Text fontSize={18} fontWeight={'bold'}>
            Welcome back, {user?.fullName}
          </Text>
          <XStack alignItems="center" mt={'$2'}>
            <MapPin color={'#a5a5a5'} size={15} />
            <Text ml={'$1'} color={'#a5a5a5'} fontSize={15}>
              Budapest, Hungary
            </Text>
          </XStack>
        </View>
        <Image w={48} h={48} source={R.images.avatar_placeholder} />
      </XStack>
      <XStack px={15} mt={'$4'} alignItems="center">
        <Input
          flex={1}
          onChangeText={() => {}}
          bg={'#FFF'}
          placeholder={`Example “blood glucose”`}
          borderColor={'#EFF2F1'}
          h={sHeight(44)}
        />
        <TouchableOpacity>
          <View
            ml={'$3'}
            h={sHeight(44)}
            aspectRatio={1}
            alignItems="center"
            justifyContent="center"
            borderRadius={7}
            bg={'#66CA98'}>
            <SlidersHorizontal size={22} color={'#fff'} />
          </View>
        </TouchableOpacity>
      </XStack>
      <ScrollView
        horizontal
        mt={'$3'}
        contentContainerStyle={{ gap: 7, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}>
        {searchMock.map((value, index) => (
          <TouchableOpacity key={index}>
            <View px={'$4'} py={'$2'} bg={'#E9E9E9'} br={7}>
              <Text>#{value}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Carousel
        // loop
        width={width}
        height={200}
        mode={'parallax'}
        autoPlay
        pagingEnabled
        snapEnabled
        scrollAnimationDuration={4000}
        modeConfig={{
          parallaxScrollingScale: 0.8,
          parallaxScrollingOffset: 100,
        }}
        style={{ width }}
        data={mockData}
        renderItem={({ item }) => (
          <View w={'100%'} h={'100%'} bg={'#fff'}>
            <Image style={{ width: '100%', height: '100%' }} source={item} />
          </View>
        )}
      />
      <View mt={'$2'}>
        <Text ml={15} fontSize={17} fontWeight={'bold'} mb={'$3'}>
          Recommend for you
        </Text>
        <ScrollView
          horizontal
          pagingEnabled
          contentContainerStyle={{ gap: 15, paddingHorizontal: 15 }}
          showsHorizontalScrollIndicator={false}>
          <View p={'$4'} bg={'#66CA98'} br={12} w={width - 30}>
            <XStack>
              <Activity size={20} color={'#FFF'} />
              <Text fontSize={18} ml={'$2'} fontWeight={'bold'} color={'#FFF'}>
                Exercise
              </Text>
            </XStack>
            <Text fontSize={15} mt={'$2'} fontWeight={'bold'} color={'#FFF'}>
              Nurture Your Well-being
            </Text>
            <Text fontSize={13} mt={'$1'} color={'#fafafa'}>
              Engage in therapeutic exercises tailored to enhance your health
              journey
            </Text>
          </View>
          <View p={'$4'} bg={'#F78773'} br={12} w={width - 30}>
            <XStack>
              <CalendarCheck size={20} color={'#FFF'} />
              <Text fontSize={18} ml={'$2'} fontWeight={'bold'} color={'#FFF'}>
                Schedule
              </Text>
            </XStack>
            <Text fontSize={15} mt={'$2'} fontWeight={'bold'} color={'#FFF'}>
              Schedule an appointment
            </Text>
            <Text fontSize={13} mt={'$1'} color={'#fafafa'}>
              Make an appointment with your doctor, let us make it easier for
              you
            </Text>
          </View>
        </ScrollView>
      </View>
      <View px={15} mt={'$4'}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={17} fontWeight={'bold'}>
            Recent
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(CommonActions.navigate(BOTTOM_TABS.History));
            }}>
            <Text fontSize={15} fontWeight={'bold'} color={'#66CA98'}>
              See all
            </Text>
          </TouchableOpacity>
        </XStack>
        <View gap={'$2'} mt={'$3'}>
          {history?.map((item, index) => (
            <HistoryItem key={index} data={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
