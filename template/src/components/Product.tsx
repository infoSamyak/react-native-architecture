import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';

type Props = {
  color: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
  scrollY: SharedValue<number>;
  scrollY2: SharedValue<number>;
  index: number;
  id: number;
  flatRef: React.RefObject<FlatList<any>>;
};
const Product: React.FC<Props> = ({
  color,
  image,
  title,
  description,
  scrollY,
  scrollY2,
  index,
  id,
  flatRef,
}) => {
  const width = Dimensions.get('window').width / 1.75 + 24;
  const navigation = useNavigation();

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRange2 = [(index - 1) * width, index * width, (index + 1) * width];
  const imageAnimation = useAnimatedStyle(() => ({
    transform: [
      {translateY: interpolate(scrollY.value, inputRange, [88, -88, 88])},
      {
        rotate:
          interpolate(scrollY2.value, inputRange2, [0, 90, 0, 360]) + 'deg',
      },
    ],
  }));
  const descriptionAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, inputRange, [0, 1, 0]),
    transform: [
      {translateY: interpolate(scrollY.value, inputRange, [0, -88, 0])},
    ],
  }));
  const titleAnimation = useAnimatedStyle(() => ({
    transform: [
      {translateY: interpolate(scrollY.value, inputRange, [0, -88, 0])},
    ],
  }));
  const containerAnimation = useAnimatedStyle(() => ({
    transform: [
      {translateY: interpolate(scrollY.value, inputRange, [88, 0, 88])},
    ],
  }));
  return (
    <Pressable
      style={styles.parent}
      onPress={() => {
        if (index === 0 || scrollY.value > 0) {
          scrollY2.value = withTiming(360, {duration: 3000});
          //   navigation.navigate('Details', {
          //     id,
          //     image,
          //     color,
          //     title,
          //     description,
          //   });
        } else {
          flatRef.current?.scrollToIndex({index});
        }
      }}>
      <SharedElement id={id.toString() + 'a'}>
        <View>
          <Animated.View
            style={[
              styles.container,
              {backgroundColor: color},
              containerAnimation,
            ]}>
            <Animated.Text style={[styles.title, titleAnimation]}>
              {title}
            </Animated.Text>
            <Animated.View style={[descriptionAnimation]}>
              <Text style={styles.description}>{description}</Text>
            </Animated.View>
          </Animated.View>
        </View>
      </SharedElement>
      <Animated.View style={[styles.imageContainer, imageAnimation]}>
        <SharedElement id={id.toString()}>
          <Image source={image} style={styles.image} />
        </SharedElement>
      </Animated.View>
    </Pressable>
  );
};

export default Product;

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  imageContainer: {
    height: 175,
    width: 175,
    position: 'absolute',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  image: {height: 175, width: 175},
  container: {
    width: Dimensions.get('window').width / 1.75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 175,
    paddingBottom: 74,
    paddingHorizontal: 18,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  description: {
    marginTop: 8,
    color: 'white',
  },
});
