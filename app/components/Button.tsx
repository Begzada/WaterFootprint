import React, {FC} from 'react';
import {Pressable, Text} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  outline?: boolean;
}

const Button: FC<Props> = ({title, onPress, outline}) => {
  const classNames = [
    'w-full',
    'h-[54px]',
    'justify-center',
    'items-center',
    'rounded-xl',
  ];

  const titleClassNames = ['text-xl', 'font-medium'];

  if (outline) {
    classNames.push('border', 'border-primary-500', 'active:opacity-50');
    titleClassNames.push('text-primary-500');
  } else {
    classNames.push('bg-primary-500', 'active:bg-primary-600');
    titleClassNames.push('text-white');
  }

  return (
    <Pressable className={classNames.join(' ')} onPress={onPress}>
      <Text className={titleClassNames.join(' ')}>{title}</Text>
    </Pressable>
  );
};

export default Button;
