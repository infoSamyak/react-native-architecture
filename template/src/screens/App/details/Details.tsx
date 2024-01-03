import React, {useEffect} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  InteractionManager,
  Text,
  View,
  useAnimatedValue,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import styles from './styles';

const Details = ({route}) => {
  const navigation = useNavigation();
  const rot = useAnimatedValue(0);
  const scroll = useAnimatedValue(Dimensions.get('window').height / 1.5);
  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        Animated.parallel([
          Animated.loop(
            Animated.timing(rot, {
              toValue: 1,
              duration: 30000,
              useNativeDriver: true,
              easing: Easing.linear,
            }),
          ),
          Animated.timing(scroll, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.bezier(0.4, 0.4, 0.3, 1),
          }),
        ]).start();
      });

      return () => task.cancel();
    }, [rot, scroll]),
  );

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      let bool = true;
      rot.addListener(v => {
        if (bool) {
          Animated.timing(rot, {
            toValue: 1,
            duration: 300 - v.value * 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }).start(() => {
            navigation.dispatch(e.data.action);
          });
          bool = false;
        }
      });
    });
  }, [navigation, rot]);

  const rotInter = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={{flex: 1}}>
      <SharedElement id={route.params.id.toString() + 'a'}>
        <View
          style={[styles.colorView, {backgroundColor: route.params.color}]}
        />
      </SharedElement>

      <SharedElement id={route.params.id.toString()} style={{}}>
        <Animated.Image
          source={route.params.image}
          style={[styles.image, {transform: [{rotate: rotInter}]}]}
        />
      </SharedElement>
      <Animated.ScrollView
        style={[styles.scrollView, {transform: [{translateY: scroll}]}]}>
        <Text style={styles.title}>{route.params.title}</Text>
        <Text style={styles.description}>{route.params.description}</Text>
      </Animated.ScrollView>
    </View>
  );
};

export default Details;
