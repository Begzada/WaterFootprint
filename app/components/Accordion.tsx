import React, {FC, useCallback, useState} from 'react';
import Chevron from 'app/components/Chevron';
import {Pressable, Text, View, LayoutChangeEvent} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface Props {
  title: string;
  content: string;
}

const Accordion: FC<Props> = ({title, content}) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [hasMeasured, setHasMeasured] = useState<number>(0);

  const toggle = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const onContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (hasMeasured < 2) {
        setContentHeight(event.nativeEvent.layout.height);
        setHasMeasured(prev => prev + 1);
      }
    },
    [hasMeasured],
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(isExpanded ? contentHeight + 70 : 50),
      backgroundColor: withTiming(isExpanded ? '#f2edfd' : 'white'),
      borderWidth: withTiming(isExpanded ? 0 : 1),
    };
  }, [isExpanded, contentHeight]);

  return (
    <Animated.View
      className="relative flex-col w-full rounded-xl border border-[#555555] items-center px-5 overflow-hidden"
      style={animatedStyle}>
      <Pressable
        className="flex-row items-center justify-between h-[50px]"
        onPress={toggle}>
        <Text className="flex-1 text-black text-lg">{title}</Text>
        <Chevron isExpanded={isExpanded} />
      </Pressable>

      {hasMeasured < 1 && (
        <View onLayout={onContentLayout} className="absolute overflow-hidden">
          <Text className="text-black text-lg text-left mt-3">{content}</Text>
        </View>
      )}

      <View
        style={{width: '100%', overflow: 'hidden'}}
        className="w-full overflow-hidden">
        {hasMeasured === 1 && (
          <Text className="w-full text-black text-lg text-left mt-3">
            {content}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

export default Accordion;
