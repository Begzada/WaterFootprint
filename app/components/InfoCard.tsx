import React, {FC} from 'react';
import {Text, View} from 'react-native';

interface Props {
  title: string;
  value: string;
  long?: boolean;
  outline?: boolean;
  color: string;
}

const InfoCard: FC<Props> = ({title, value, long, outline, color}) => {
  const classNames = ['w-full', 'rounded-xl', 'p-3'];
  const textClassNames = ['font-medium'];

  if (long) {
    classNames.push('flex-row', 'h-[90px]');
  } else {
    classNames.push('flex-col', 'aspect-square');
  }

  if (color) {
    if (outline) {
      textClassNames.push(`text-${color}`);
    } else {
      classNames.push(`bg-${color}`);
      textClassNames.push('text-white');
    }
  }

  const titleClassNames = [...textClassNames, 'flex-1', 'text-xl'];
  const valueClassNames = [
    ...textClassNames,
    'text-[64px]',
    'text-right',
    'h-[72px]',
  ];

  return (
    <View
      className={`flex-1 ${outline ? `border border-${color}` : ''}`}
      style={{borderRadius: 12, overflow: 'hidden'}}>
      <View className={classNames.join(' ')}>
        <Text className={titleClassNames.join(' ')}>{title}</Text>
        <Text className={valueClassNames.join(' ')}>{value}</Text>
      </View>
    </View>
  );
};

export default InfoCard;
