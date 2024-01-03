import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useAnimatedValue,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const ProductDetail = ({navigation}) => {
  const translateAnimLeft = useAnimatedValue(0);
  const translateAnimRight = useAnimatedValue(0);
  const widthAnim = useAnimatedValue(150);
  const rotateAnim = useAnimatedValue(0);
  const rotateBAnim = useAnimatedValue(0);
  const cartTextAnim = useAnimatedValue(0);
  const translateAnimUp = useAnimatedValue(0);
  const fadeAnim = useAnimatedValue(1);

  useFocusEffect(
    useCallback(() => {
      translateAnimUp.setValue(0);
      fadeAnim.setValue(1);
    }, []),
  );

  const addToCart = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(translateAnimLeft, {
          toValue: -15,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.bezier(0, 0, 1, 1),
        }),
        Animated.timing(translateAnimRight, {
          toValue: 15,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.bezier(0, 0, 1, 1),
        }),
      ]),
      Animated.parallel([
        Animated.timing(translateAnimLeft, {
          toValue: Dimensions.get('window').width / 2 - 88,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.bezier(0.5, 0, 0.5, 1),
        }),
        Animated.timing(translateAnimRight, {
          toValue: -(Dimensions.get('window').width / 2 - 88),
          duration: 400,
          useNativeDriver: true,
          easing: Easing.bezier(0.5, 0, 0.5, 1),
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rotateBAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(widthAnim, {
          toValue: 40,
          duration: 500,
          delay: 100,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(cartTextAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  const rotateBInterpolate = rotateBAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-45deg'],
  });

  return (
    <ScrollView style={styles.parent}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={require('../../assets/images/watch.png')}
          style={[styles.image, {opacity: fadeAnim}]}
        />
      </View>
      <Text style={styles.name}>Quartz Watch</Text>

      <Text style={styles.description} numberOfLines={2}>
        500
      </Text>

      <Text style={styles.description} numberOfLines={4}>
        {
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
      </Text>

      <View style={styles.bottomContainer}>
        <Pressable
          style={{zIndex: 1}}
          onPress={() => {
            Animated.parallel([
              Animated.spring(translateAnimUp, {
                toValue: -Dimensions.get('window').height,
                stiffness: 150,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 10,
                restSpeedThreshold: 10,
                useNativeDriver: true,
              }),
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }),
            ]).start();

            navigation.navigate('Cart');
          }}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [
                  {translateY: translateAnimUp},
                  {translateX: translateAnimLeft},
                  {rotate: rotateInterpolate},
                ],
              },
            ]}>
            <Image
              source={require('../../assets/images/arrow_back.png')}
              style={styles.icon}
            />
          </Animated.View>
        </Pressable>
        <Animated.View style={[styles.iconContainer, {width: widthAnim}]}>
          <Text
            numberOfLines={1}
            style={styles.cartText}
            onPress={() => addToCart()}>
            Add To Cart
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [
                {translateX: translateAnimRight},
                {rotate: rotateBInterpolate},
              ],
            },
          ]}>
          <Image
            source={require('../../assets/images/bookmark.png')}
            style={styles.icon}
          />
        </Animated.View>
      </View>
      <Animated.Text style={[styles.goToText, {opacity: cartTextAnim}]}>
        Go To Cart
      </Animated.Text>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  parent: {backgroundColor: 'white'},
  ccs: {flex: 1},
  imageContainer: {height: 400, width: 200, alignSelf: 'center'},
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginTop: 48,
    alignSelf: 'center',
  },
  description: {
    fontSize: 18,
    color: 'black',
    marginTop: 8,
    alignSelf: 'center',
    marginHorizontal: 24,
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 48,
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    backgroundColor: '#a9957b',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 80,
  },
  icon: {height: 32, width: 32, resizeMode: 'contain', tintColor: 'white'},
  cartText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  goToText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
  },
});
