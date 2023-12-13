import React from 'react';
import { Image, Spinner, Stack, Text } from 'tamagui';
import R from '../../assets';
import { sHeight, sWidth } from '../../shared/theme/size';
import { sizeScale } from '../../shared/theme/scale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/native';
import { SCREEN_NAME, SCREEN_STACK } from '../../navigation/stacks/RouteName';
import { callAPIV2 } from '../../shared/utils';
import endpoint from '../../shared/services/network/endpoint';
import { useStore } from '../../store';
import storageServices from '../../shared/services/storage/storageServices';

const SplashScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const { setUser } = useStore();

  const boostrap = async () => {
    const { accessToken } = await storageServices.getToken();

    if (!accessToken) {
      return setTimeout(() => {
        navigation.dispatch(StackActions.replace(SCREEN_NAME.Login));
      }, 1500);
    }

    callAPIV2({
      API: endpoint.getProfile,
      onSuccess(res) {
        setUser(res);

        setTimeout(() => {
          navigation.dispatch(
            StackActions.replace(SCREEN_STACK.Authentication),
          );
        }, 1500);
      },
      onError: () => {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace(SCREEN_NAME.Login));
        }, 1500);
      },
    });
  };

  React.useEffect(() => {
    boostrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
      <Text fontSize={sizeScale(28)} fontWeight={'bold'}>
        Diabetes Manager
      </Text>
      <Image
        mt={sHeight(23)}
        width={sWidth(119)}
        height={sHeight(115)}
        source={R.images.app_logo}
      />
      <Stack position="absolute" bottom={bottom + 20} alignSelf="center">
        <Spinner size="small" color={'$green10'} />
      </Stack>
    </Stack>
  );
};

export default SplashScreen;
