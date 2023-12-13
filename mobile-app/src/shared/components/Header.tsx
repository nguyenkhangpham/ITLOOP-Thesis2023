import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from '@tamagui/lucide-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, XStack } from 'tamagui';

interface Props {
  showBackButton?: boolean;
  title: string;
}

const Header = ({ showBackButton, title }: Props) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View bg={'#fff'}>
      <View h={top} />
      <XStack h={30} alignItems="center" pb={10}>
        {showBackButton ? (
          <View flex={1}>
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}
              style={{
                marginLeft: 15,
                padding: 4,
                backgroundColor: '#EEEEEE',
                alignSelf: 'flex-start',
                borderRadius: 100,
              }}>
              <ChevronLeft size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <View flex={1} />
        )}
        <View flex={2} justifyContent="center" alignItems="center">
          <Text fontWeight={'bold'} fontSize={17}>
            {title}
          </Text>
        </View>
        <View flex={1} />
      </XStack>
    </View>
  );
};

export default Header;
