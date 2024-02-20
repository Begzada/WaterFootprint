import '@app/styles/global.css';
import React, {useCallback, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Accordion from 'app/components/Accordion';
import Button from 'app/components/Button';
import InfoCard from 'app/components/InfoCard';
import QuestionForm from 'app/components/QuestionForm';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Map from 'app/components/Map';

const color = '#5724E8';

function App(): React.JSX.Element {
  const [result, setResult] = useState<number | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleSheet = useCallback(
    (total?: number | null) => {
      if (bottomSheetRef.current) {
        if (isOpen) {
          bottomSheetRef.current.forceClose();
        } else {
          bottomSheetRef.current.snapToIndex(0);
        }
      }
      if (total) {
        setResult(total);
      }
    },
    [bottomSheetRef, isOpen],
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1" contentContainerClassName="pb-[50px]">
          <View className={'bg-[#5724E8]'} />
          <Map />
          <View className="flex w-full px-[13px] py-[40px] gap-y-3">
            <Text className="text-black text-xl font-semibold">
              Secilen bolgenin adi
            </Text>
            <View className="flex-row gap-3">
              <InfoCard color={color} title="Doluluk orani" value="50%" />
              <InfoCard color={color} title="Doluluk orani" value="50%" />
            </View>
            <InfoCard
              outline
              long
              color={color}
              title="Doluluk orani"
              value="50%"
            />

            <View className="flex-col mt-[40px] gap-y-3">
              {result ? (
                <InfoCard
                  long
                  color="#3B82F6"
                  title="Your water usage"
                  value={`${result} Lt/day`}
                />
              ) : (
                <Button
                  title="Calculate water footprint"
                  onPress={toggleSheet}
                />
              )}
            </View>

            <View className="flex-col mt-[40px] gap-y-3">
              <Text className="text-black text-xl font-semibold">Tips</Text>
              <Accordion
                title="Detail"
                content="Water, the seemingly simple molecule of H₂O, holds within its structure the essence of life on Earth. This transparent liquid, essential for all known living organisms, shapes our planet's landscapes, carves its canyons, and fills its"
              />
              <Accordion
                title="Detail"
                content="Water, the seemingly simple molecule of H₂O, holds within its structure the essence of life on Earth. This transparent liquid, essential for all known living organisms, shapes our planet's landscapes, carves its canyons, and fills its"
              />
              <Accordion
                title="Detail"
                content="Water, the seemingly simple molecule of H₂O, holds within its structure the essence of life on Earth. This transparent liquid, essential for all known living organisms, shapes our planet's landscapes, carves its canyons, and fills its"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        handleStyle={{
          display: 'none',
        }}
        backgroundStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        index={-1}
        snapPoints={['90%']}
        onChange={handleSheetChanges}>
        <QuestionForm onClose={toggleSheet} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default App;
