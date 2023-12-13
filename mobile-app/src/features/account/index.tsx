import React from 'react';
import { Image, ScrollView, Stack, Text, View } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sHeight, sWidth } from '../../shared/theme/size';
import R from '../../assets';
import { useStore } from '../../store';
import { sizeScale } from '../../shared/theme/scale';
import Category from './components/Category';
import {
  Globe2,
  HelpCircle,
  Power,
  Settings,
  Shield,
} from '@tamagui/lucide-icons';
import storageServices from '../../shared/services/storage/storageServices';
import { toast } from '@baronha/ting';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SCREEN_NAME, SCREEN_STACK } from '../../navigation/stacks/RouteName';

const AccountScreen = () => {
  const { top } = useSafeAreaInsets();
  const { user, setUser } = useStore();

  const navigation = useNavigation();

  const handleOnLogout = async () => {
    await storageServices.putToken({ accessToken: '', refreshToken: '' });
    setUser({});

    toast({ title: 'Logout succefully' });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: SCREEN_STACK.UnAuthentication,
            params: { screen: SCREEN_NAME.Login },
          },
        ],
      }),
    );
  };

  return (
    <ScrollView
      pt={top}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
      <View
        w={sWidth(90)}
        h={sHeight(90)}
        borderRadius={45}
        borderColor={'#66CA98'}
        borderWidth={1}
        p={4}>
        <Image w={'100%'} h={'100%'} source={R.images.avatar_placeholder} />
      </View>
      <View alignItems="center" mt={'$3'}>
        <Text fontWeight={'bold'} fontSize={sizeScale(18)}>
          {user.fullName}
        </Text>
        <Text mt={'$0.75'} color={'$gray10'} fontSize={sizeScale(15)}>
          {user.email}
        </Text>
      </View>
      <View w={'100%'} px={sWidth(20)} mt={sHeight(50)}>
        <Category>
          <Category.Item
            onPress={() => {}}
            icon={<Settings size={20} fill={'#66CA98'} color={'white'} />}
            label="Setting"
          />
          <Category.Item
            onPress={() => {}}
            icon={<Globe2 size={20} color={'#66CA98'} />}
            label="Language"
          />
          <Category.Divider />
          <Category.Item
            onPress={() => {}}
            icon={<HelpCircle size={20} fill={'#66CA98'} color={'white'} />}
            label="Support center"
          />
          <Category.Item
            onPress={() => {}}
            icon={<Shield size={20} fill={'#66CA98'} color={'#66CA98'} />}
            label="Privacy and policy"
          />
          <Category.Item
            onPress={handleOnLogout}
            icon={<Power size={20} color={'$red10'} />}
            label="Logout"
            isDanger
          />
        </Category>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;
