import React, {useRef} from 'react';
import {Dimensions, FlatList, View} from 'react-native';

import {Product} from 'components';

import data from './data';
import styles from './styles';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const Home = () => {
  const scrollY = useSharedValue(0);
  const scrollY2 = useSharedValue(0);
  const flatRef = useRef<FlatList>(null);

  return (
    <View style={styles.parent}>
      <Animated.FlatList
        ref={flatRef}
        data={data}
        horizontal
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {x: scrollY}}}],
        //   {useNativeDriver: false},
        // )}
        onScroll={useAnimatedScrollHandler(event => {
          scrollY.value = event.contentOffset.x;
          scrollY2.value = event.contentOffset.x;
        })}
        snapToInterval={Dimensions.get('window').width / 1.75 + 24}
        decelerationRate="fast"
        renderItem={({item, index}) => {
          return (
            <Product
              flatRef={flatRef}
              color={item.color}
              image={item.image}
              title={item.title}
              id={item.id}
              description={item.description}
              scrollY={scrollY}
              scrollY2={scrollY2}
              index={index}
            />
          );
        }}
      />
    </View>
  );
};

export default Home;
