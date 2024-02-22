import React, {FC, useMemo, useRef, useState} from 'react';
import Button from 'app/components/Button';
import {Pressable, Text, View} from 'react-native';
import {Line, Svg} from 'react-native-svg';
import InfoCard from 'app/components/InfoCard';

interface Props {
  onClose: (total: number | null) => void;
}

const QUESTIONS_ANSWERS = [
  {
    question: 'How do you wash your laundry?',
    answers: [
      {title: 'Handwash', value: 120},
      {title: 'Washing machine', value: 40},
    ],
  },
  {
    question: 'How many times do you do laundry a week?',
    answers: [
      {title: '0-7 times', value: 3.5},
      {title: '7-14 times', value: 10.5},
      {title: '14-21 times', value: 17.5},
      {title: '21+ times', value: 21},
    ],
  },
  {
    question: 'If you have a car, how many times a month do you wash it?',
    answers: [
      {title: '0-7 times', value: 3.5},
      {title: '7-14 times', value: 10.5},
      {title: '14-21 times', value: 17.5},
      {title: '21+ times', value: 21},
    ],
  },
  {
    question: 'How many cups of tea do you drink a day?',
    answers: [
      {title: '0-3 cups', value: 1.5},
      {title: '3-6 cups', value: 4.5},
      {title: '6-9 cups', value: 7.5},
      {title: '9+ cups', value: 9},
    ],
  },
  {
    question: 'With or without sugar?',
    answers: [
      {title: 'With sugar', value: 35.5},
      {title: 'Without sugar', value: 28},
    ],
  },
  {
    question: 'How many times a day do you brush your teeth?',
    answers: [
      {title: '0 times', value: 0},
      {title: '1-2 times', value: 1.5},
      {title: '3+ times', value: 3},
    ],
  },
  {
    question: 'How many times do you take a shower in a week?',
    answers: [
      {title: '0-2 times', value: 1},
      {title: '2-4 times', value: 3},
      {title: '4-7 times', value: 5},
      {title: '7+ times', value: 7},
    ],
  },
  {
    question: 'How long does a shower take?',
    answers: [
      {title: '0-10 min.', value: 120},
      {title: '10-20 min.', value: 240},
      {title: '20-30 min.', value: 360},
      {title: '30-40 min.', value: 480},
      {title: '40+ min.', value: 500},
    ],
  },
  {
    question: 'Do you wash dishes by hand or in the machine?',
    answers: [
      {title: 'Handwash', value: 130},
      {title: 'Dishwasher', value: 15},
    ],
  },
  {
    question: 'How many times do you wash them in  a week?',
    answers: [
      {title: '0-7 times', value: 3.5},
      {title: '7-14 times', value: 10.5},
      {title: '14-21 times', value: 17.5},
      {title: '21+ times', value: 21},
    ],
  },
  {
    question: 'How many times do you consume meat in a month?',
    answers: [
      {title: '0-7 times', value: 3.5},
      {title: '7-14 times', value: 10.5},
      {title: '14-21 times', value: 17.5},
      {title: '21+ times', value: 21},
    ],
  },
  {
    question: 'What is the amount of your meat consumption in a month?',
    answers: [
      {title: '0-5 kg', value: 2.5},
      {title: '5-10 kg', value: 7.5},
      {title: '10-20 kg', value: 15},
      {title: '20+ kg', value: 20},
    ],
  },
];

const calculateTotal = (answers: number[]) => {
  const washing = (answers[0] * answers[1]) / 7;
  const car = (answers[2] * 550) / 7;
  const tea = (answers[3] * answers[4]) / 3;
  const brushing = answers[5] * 15;
  const shower = (answers[6] * answers[7]) / 7;
  const dishwash = (answers[8] * answers[9]) / 7;
  const meat = (9400 * answers[10] * answers[11]) / 30;
  return Number(
    ((washing + car + tea + brushing + shower + dishwash + meat) / 10).toFixed(
      0,
    ),
  );
};

const QuestionForm: FC<Props> = ({onClose}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const answers = useRef<number[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const handleClose = () => {
    setCurrentIndex(0);
    setTotal(null);
    answers.current = [];
    onClose(total);
  };

  const renderAnswers = useMemo(
    () =>
      QUESTIONS_ANSWERS[currentIndex].answers.map((answer, index) => (
        <Button
          key={answer.title + index + currentIndex}
          outline
          title={answer.title}
          onPress={() => {
            answers.current = [...answers.current, answer.value];
            if (currentIndex === QUESTIONS_ANSWERS.length - 1) {
              setTotal(calculateTotal(answers.current));
              return;
            }
            setCurrentIndex(prev => prev + 1);
          }}
        />
      )),
    [currentIndex],
  );

  return (
    <View className="flex-1 px-3 py-8">
      {!total && (
        <View className="flex-row justify-end items-center">
          <Pressable className="px-5 py-2" onPress={handleClose}>
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
      )}

      <View className="flex-1 flex-col justify-between">
        {!total ? (
          <>
            <View className="flex-1 justify-center gap-y-3">
              <Text className="text-black text-3xl font-semibold">
                {QUESTIONS_ANSWERS[currentIndex].question}
              </Text>
            </View>

            <View className="w-full gap-y-6">
              <View className="flex-col gap-y-2">{renderAnswers}</View>
            </View>
          </>
        ) : (
          <View className="flex-1 justify-center items-center gap-y-5">
            <Text className="text-black text-3xl font-semibold">
              Thanks for taking our survey!
            </Text>
            <InfoCard
              long
              color="#3B82F6"
              title="Your water usage"
              value={`${total} Lt/day`}
            />

            <Button title="Close" onPress={handleClose} />
          </View>
        )}
      </View>
    </View>
  );
};

export default QuestionForm;
