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

  const titleClassNames = [...textClassNames, 'flex-1', 'text-xl'];
  const valueClassNames = [...textClassNames, 'text-right', 'self-end'];

  return (
    <View
      className={`${long ? 'w-full' : 'flex-1'} ${outline ? 'border' : ''}`}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: outline ? color : undefined,
        backgroundColor: !outline ? color : undefined,
      }}>
      <View className={classNames.join(' ')}>
        <Text
          className={titleClassNames.join(' ')}
          style={{color: outline ? color : 'white'}}>
          {title}
        </Text>
        <Text
          className={valueClassNames.join(' ')}
          style={{
            color: outline ? color : 'white',
            fontSize: value
              ? parseInt((64 / ((value.length % 3) + 1)).toFixed(0), 10)
              : 10,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default InfoCard;
