import { ChevronRight } from '@tamagui/lucide-icons';
import React from 'react';
import { StackProps, Text, View, XStack } from 'tamagui';
import { sizeScale } from '../../../shared/theme/scale';
import { sHeight } from '../../../shared/theme/size';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from '@ui-kitten/components';

type ItemType = typeof CategoryItem | typeof CategoryDivider;

interface CategoryProps extends StackProps {
  children: React.ReactElement<ItemType> | React.ReactElement<ItemType>[];
}

interface CategoryItemProps {
  label: string;
  icon: any;
  onPress: () => void;
  isDanger?: boolean;
}

const Category = ({ children, ...Rest }: CategoryProps) => {
  return (
    <View gap={sHeight(20)} {...Rest}>
      {children}
    </View>
  );
};

const CategoryItem = ({
  label,
  icon,
  isDanger,
  onPress,
}: CategoryItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center">
          <View p={7} br={8} bg={'$gray6'} mr={'$3'}>
            {icon}
          </View>
          <Text
            fontWeight={'bold'}
            fontSize={sizeScale(15)}
            color={isDanger ? '$red10' : '#333'}>
            {label}
          </Text>
        </XStack>
        <ChevronRight color={'$gray9'} />
      </XStack>
    </TouchableOpacity>
  );
};

const CategoryDivider = (props: StackProps) => {
  return <View w={'100%'} h={1} bg={'$gray7'} {...props} />;
};

export default Object.assign(Category, {
  Item: CategoryItem,
  Divider: CategoryDivider,
});
