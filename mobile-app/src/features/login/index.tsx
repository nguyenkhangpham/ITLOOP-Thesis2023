import React, { useState } from 'react';
import { Button, Image, Input, ScrollView, Stack, Text, XStack } from 'tamagui';
import R from '../../assets';
import { sHeight, sWidth } from '../../shared/theme/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sizeScale } from '../../shared/theme/scale';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Input as TextInput } from '@ui-kitten/components';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import _ from 'lodash';
import { toast } from '@baronha/ting';
import { callAPIV2 } from '../../shared/utils';
import endpoint from '../../shared/services/network/endpoint';
import { StackActions, useNavigation } from '@react-navigation/native';
import { SCREEN_STACK } from '../../navigation/stacks/RouteName';
import storageServices from '../../shared/services/storage/storageServices';
import { useStore } from '../../store';

const LoginScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const { setUser } = useStore();

  const [isSecureInput, setIsSecureInput] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState({
    email: __DEV__ ? 'patient@gmail.com' : '',
    password: __DEV__ ? '12345678' : '',
  });

  const handleOnLogin = () => {
    const isValid = _.values(inputValue).some(value => !_.isEmpty(value));

    if (!isValid) {
      return toast({ title: 'An error occurred!', preset: 'error' });
    }

    // call api
    callAPIV2({
      API: endpoint.requestLogin,
      payload: inputValue,
      onSuccess: res => {
        storageServices.putToken({
          accessToken: res.auth.accessToken,
          refreshToken: res.auth.refreshToken,
        });
        setUser(res.user);
        toast({ title: 'Login successfully' });

        navigation.dispatch(StackActions.replace(SCREEN_STACK.Authentication));
      },
      onFinaly() {},
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <Stack
          flex={1}
          alignItems="center"
          pt={top + 20}
          px={sWidth(20)}
          bg={'white'}>
          <Image w={sWidth(33)} h={sHeight(32)} source={R.images.app_logo} />
          <Text mt={sHeight(50)} fontSize={sizeScale(28)} fontWeight={'bold'}>
            Sign In
          </Text>
          <Stack w={'100%'} mt={sHeight(30)}>
            <Text fontSize={sizeScale(16)} mb={sHeight(6)} color={'#A7A6A5'}>
              Email
            </Text>
            <Input
              value={inputValue.email}
              onChangeText={text =>
                setInputValue(prev => ({ ...prev, email: text }))
              }
              bg={'#EFF2F1'}
              placeholder="patient@self.com"
              borderColor={'#EFF2F1'}
              h={sHeight(44)}
            />
            <Text
              fontSize={sizeScale(16)}
              mb={sHeight(6)}
              mt={sHeight(16)}
              color={'#A7A6A5'}>
              Password
            </Text>
            <TextInput
              value={inputValue.password}
              onChangeText={text =>
                setInputValue(prev => ({ ...prev, password: text }))
              }
              placeholder="Your password"
              secureTextEntry={isSecureInput}
              style={{
                borderColor: '#EFF2F1',
                backgroundColor: '#EFF2F1',
                borderRadius: 7,
              }}
              placeholderTextColor={'#989999'}
              accessoryRight={
                <TouchableOpacity
                  onPress={() => setIsSecureInput(prev => !prev)}>
                  {isSecureInput ? (
                    <EyeOff color={'#A7A6A5'} />
                  ) : (
                    <Eye color={'#A7A6A5'} />
                  )}
                </TouchableOpacity>
              }
            />
          </Stack>
          <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 15 }}>
            <Text fontWeight={'bold'} color={'#66CA98'}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
          <Stack mt={sHeight(100)}>
            <Button onPress={handleOnLogin} w={sWidth(211)} bg={'#66CA98'}>
              <Text color={'white'} fontWeight={'bold'}>
                Sign In
              </Text>
            </Button>
          </Stack>
          <XStack mt={sHeight(10)}>
            <Text color={'#A7A6A5'}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text color={'#66CA98'} fontWeight={'bold'}>
                Ask doctor
              </Text>
            </TouchableOpacity>
          </XStack>
        </Stack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
