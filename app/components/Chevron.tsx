import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Path, Svg} from 'react-native-svg';

interface ChevronProps {
  isExpanded: boolean;
}

const Chevron: React.FC<ChevronProps> = ({isExpanded}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withSpring(isExpanded ? 270 : 90);
  }, [isExpanded]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: 20,
          height: 20,
          flexDirection: 'row',
        },
      ]}>
      <Svg width="20" height="20" fill="#555555" viewBox="0 0 16 16">
        <Path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
        />
      </Svg>
    </Animated.View>
  );
};

export default Chevron;
