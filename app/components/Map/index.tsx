import React from 'react';
import {View} from 'react-native';
import Bolge1 from 'app/components/Map/regions/Bolge1';
import Bolge2 from 'app/components/Map/regions/Bolge2';
import Bolge3 from 'app/components/Map/regions/Bolge3';

const Map = () => {
  return (
    <View className="flex h-[500px] w-full">
      <Bolge1 />
      <Bolge2 />
      <Bolge3 />
    </View>
  );
};

export default Map;
