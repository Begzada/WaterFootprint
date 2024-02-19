import React, {FC} from 'react';
import Button from 'app/components/Button';
import {Pressable, Text, TextInput, View} from 'react-native';
import {Line, Svg} from 'react-native-svg';

interface Props {
  onClose: () => void;
}

const QuestionForm: FC<Props> = ({onClose}) => {
  return (
    <View className="flex-1 px-3 py-8">
      <View className="flex-row justify-end items-center">
        <Pressable className="px-5 py-2" onPress={onClose}>
          <Svg width="20" height="19" viewBox="0 0 20 19" fill="none">
            <Line
              x1="1.35355"
              y1="0.646447"
              x2="19.3536"
              y2="18.6464"
              stroke="#949494"
            />
            <Line
              y1="-0.5"
              x2="25.4558"
              y2="-0.5"
              transform="matrix(-0.707107 0.707107 0.707107 0.707107 19 1)"
              stroke="#949494"
            />
          </Svg>
        </Pressable>
      </View>

      <View className="flex-1 flex-col justify-between">
        <View className="flex-1 justify-center gap-y-3">
          <Text className="text-black text-3xl font-semibold">Question</Text>
          <Text className="text-black text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            neque, quas quidem soluta molestias accusamus nobis consectetur a?
            At quidem eligendi modi dolorem repellat porro, optio delectus amet
            et aliquam?
          </Text>
        </View>

        <View className="w-full gap-y-6">
          <View className="flex-row gap-x-4">
            <Button outline title="Prev" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default QuestionForm;
