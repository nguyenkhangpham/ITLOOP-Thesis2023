import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, View, XStack } from 'tamagui';
import { Calendar } from '@tamagui/lucide-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SCREEN_NAME } from '../../navigation/stacks/RouteName';

interface Props {
  data?: any;
  disablePress?: boolean;
}

const HistoryItem = ({ data, disablePress }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      disabled={disablePress}
      onPress={() => {
        navigation.dispatch(
          CommonActions.navigate(SCREEN_NAME.HistoryDetail, { data }),
        );
      }}>
      <View br={12} px={'$4'} py={'$3'} bg={'#FFF'}>
        <XStack justifyContent="space-between">
          <XStack alignItems="center">
            <Calendar size={15} color={'#a5a5a5'} />
            <Text ml={'$2'} color={'#a5a5a5'}>
              23 Mar
            </Text>
          </XStack>
          <Text ml={'$2'} color={'#a5a5a5'}>
            Patient ID: #{data?.id}
          </Text>
        </XStack>
        <XStack justifyContent="space-between" mt={'$2.5'}>
          <Text fontSize={15} color={'#333'}>
            Diagnose:
          </Text>
          <Text fontSize={15} fontWeight={'bold'}>
            {data?.diagnoseNow}
          </Text>
        </XStack>
        <XStack justifyContent="space-between" mt={'$2'}>
          <Text fontSize={15} color={'#333'}>
            Pulse:
          </Text>
          <Text fontSize={15} fontWeight={'bold'}>
            {data?.pulse}
          </Text>
        </XStack>
        <XStack justifyContent="space-between" mt={'$2'}>
          <Text fontSize={15} color={'#333'}>
            Blood glucose:
          </Text>
          <Text fontSize={15} fontWeight={'bold'}>
            {data?.bloodGlucose}
          </Text>
        </XStack>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryItem;
