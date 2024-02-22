import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

const Logo = () => {
  return (
    <Svg width={42} height={46} viewBox="0 0 42 46" fill="none">
      <G filter="url(#filter0_b_32_5302)">
        <Path d="M21 35.5l-5.517-6.51H26.51L21 35.5z" fill="#E32222" />
        <Path
          d="M19.747 18.135C16.479 18.707 14 21.477 14 24.808c0 3.745 3.134 6.78 7 6.78s7-3.035 7-6.78c0-3.334-2.484-6.107-5.758-6.675l2.282 3.828h-.002c.348.582.548 1.258.548 1.978 0 2.18-1.825 3.947-4.075 3.947s-4.074-1.767-4.074-3.947c0-.72.2-1.396.548-1.978h-.002l2.28-3.826zM17.572 13.813c0-1.83 1.53-3.313 3.42-3.313 1.888 0 3.42 1.483 3.42 3.313s-1.532 3.312-3.42 3.312c-1.89 0-3.42-1.483-3.42-3.312z"
          fill="#E32222"
        />
      </G>
    </Svg>
  );
};

export default Logo;