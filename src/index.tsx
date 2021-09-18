import { Dispatch, SetStateAction, useRef } from 'react';
import { View, PanResponder, Animated, Platform } from 'react-native';

type PropsTypes = {
  stackSpacing: number;
  onSwipe: Dispatch<SetStateAction<number>>;
  data: any[];
  renderItem: (data: any) => JSX.Element;
  swipeThreshold: number;
  swipeDuration: number;
};

const FlatSwipeStack = ({
  data,
  onSwipe,
  stackSpacing,
  renderItem,
  swipeThreshold,
  swipeDuration,
}: PropsTypes) => {
  const viewPan = useRef(new Animated.ValueXY()).current;
  const viewStackedAnim = useRef(new Animated.Value(0)).current;
  const currentStackedViewIndex = useRef(0);
  const nextIndex = () => {
    const index = Math.min(
      currentStackedViewIndex.current + 1,
      data.length - 1
    );
    if (index === data.length - 1) {
      return 0;
    }
    return index;
  };
  const afterNextIndex = () => {
    const nIndex = nextIndex();
    const index = Math.min(
      currentStackedViewIndex.current + 2,
      data.length - 1
    );
    if (index === data.length - 1) {
      return 0;
    }
    if (index === currentStackedViewIndex.current) {
      return nIndex;
    }
    return index;
  };
  const moveIndex = () => {
    const index = nextIndex();
    currentStackedViewIndex.current = index;
    onSwipe(index);
  };

  const doAnimate = (
    ref: Animated.ValueXY | Animated.Value,
    toValue: number,
    callBack = () => {}
  ) => {
    Animated.timing(ref, {
      toValue,
      duration: swipeDuration,
      useNativeDriver: false,
    }).start(callBack);
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_event, { dx }) => Math.abs(dx) >= 5,
      onPanResponderMove: (_event, { dx }) => {
        viewPan.setValue({ x: dx, y: Number(viewPan.y) });
      },
      onPanResponderTerminationRequest: () => Platform.OS === 'android',
      onPanResponderRelease: (_event, { dx }) => {
        if (data.length <= 1) return;
        if (Math.abs(dx) > swipeThreshold) {
          doAnimate(viewPan, 0);
          doAnimate(viewStackedAnim, 1, () => {
            viewStackedAnim.setValue(0);
            moveIndex();
          });
        }
      },
      onPanResponderTerminate: () => true,
    })
  ).current;

  const getViewTransformation = () => {
    const lastScale = data.length === 2 ? 0.9 : 0.8;
    const lastBottom = data.length === 2 ? stackSpacing * 2 : stackSpacing * 3;
    return {
      transform: [
        { translateX: viewPan.x },
        {
          scale: viewStackedAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, lastScale],
          }),
        },
      ],
      bottom: viewStackedAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [stackSpacing, lastBottom],
      }),
      opacity: viewStackedAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      zIndex: viewStackedAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [3, 2, 0],
      }),
    };
  };

  const LastView = () => (
    <Animated.View
      key={`${data[afterNextIndex()]?.id}`}
      style={{
        zIndex: 1,
        position: 'absolute',
        transform: [
          {
            scaleX: viewStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 0.9],
            }),
          },
        ],
        bottom: viewStackedAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [stackSpacing * 3, stackSpacing * 2],
        }),
        opacity: viewStackedAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 0.6],
        }),
      }}
    >
      {data[afterNextIndex()] && renderItem(data[afterNextIndex()])}
    </Animated.View>
  );

  return (
    <View style={{ paddingTop: stackSpacing * 3 + 20, alignItems: 'center' }}>
      <LastView />
      {data[nextIndex()] && (
        <Animated.View
          key={`${data[nextIndex()]?.id}`}
          style={{
            zIndex: 2,
            position: 'absolute',
            transform: [
              {
                scaleX: viewStackedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              },
            ],
            bottom: viewStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [stackSpacing * 2, stackSpacing],
            }),
            opacity: viewStackedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1],
            }),
          }}
        >
          {renderItem(data[nextIndex()])}
        </Animated.View>
      )}
      {data[currentStackedViewIndex.current] && (
        <Animated.View
          key={`${data[currentStackedViewIndex.current]?.id}`}
          {...panResponder.panHandlers}
          style={getViewTransformation()}
        >
          {renderItem(data[currentStackedViewIndex.current])}
        </Animated.View>
      )}
    </View>
  );
};

export default FlatSwipeStack;
