import '@app/styles/global.css';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Accordion from 'app/components/Accordion';
import Button from 'app/components/Button';
import InfoCard from 'app/components/InfoCard';
import QuestionForm from 'app/components/QuestionForm';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Map from 'app/components/Map';
import COLORS from 'app/constants/colors';
import data from 'app/constants/data';
import {useMMKVNumber} from 'react-native-mmkv';
import {storage} from 'index';
import {high, low} from 'app/constants/tips';

function App(): React.JSX.Element {
  const [result, setResult] = useMMKVNumber('result', storage);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#E32222');
  const [info, setInfo] = useState(data.total);

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

  const handleSelectRegion = (region: string) => {
    if (COLORS[region as keyof typeof COLORS] === color) {
      setColor('#E32222');
      setInfo(data.total);
      return;
    }
    setColor(COLORS[region as keyof typeof COLORS]);
    setInfo(data[region as keyof typeof data]);
  };

  const renderTips = useMemo(() => {
    const tips = result && (result > 6000 ? high : low);

    if (!tips) {
      return null;
    }

    return tips.map(tip => (
      <Accordion key={tip.title} title={tip.title} content={tip.details} />
    ));
  }, [result]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1" contentContainerClassName="pb-[50px]">
          <Map regionName={info.name} onSelectRegion={handleSelectRegion} />
          <View className="flex w-full px-[13px] py-[40px] gap-y-3">
            <View className="flex-row gap-3">
              <InfoCard
                color={color}
                title="Population"
                value={`${info.population / 1_000_000}M`}
              />
              <InfoCard
                color={color}
                title="Fill rate"
                value={`${info.percentage.toFixed(0)}%`}
              />
            </View>
            <InfoCard
              outline
              long
              color={color}
              title="Average water footprint"
              value={`${(info.perPerson * 100).toFixed(0)} lt/day`}
            />

            <View className="flex-col mt-[40px] gap-y-3">
              {result && (
                <InfoCard
                  long
                  color="#3B82F6"
                  title="Your water usage"
                  value={`${result} Lt/day`}
                />
              )}

              <Button
                title={result ? 'Calculate again' : 'Calculate water footprint'}
                onPress={() => toggleSheet()}
              />
            </View>

            {result && (
              <View className="flex-col mt-[40px] gap-y-3">
                <Text className="text-black text-xl font-semibold">Tips</Text>
                {renderTips}
              </View>
            )}
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
