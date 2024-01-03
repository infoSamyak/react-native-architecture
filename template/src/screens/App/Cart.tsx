import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const Cart = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: '#a9957b',
          paddingVertical: 18,
          paddingHorizontal: 24,
        }}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          Cart
        </Text>
      </View>
      <View style={{padding: 18}}>
        <View style={{flexDirection: 'row'}}>
          {/* <SharedElement id={`0`}> */}
          <Image
            source={require('../../assets/images/watch.png')}
            style={styles.image}
          />
          {/* </SharedElement> */}
          <View style={{flex: 1}}>
            {/* <SharedElement id={`1`} style={{alignItems: 'flex-start'}}> */}
            <Text style={styles.name}>Quartz Watch</Text>
            {/* </SharedElement> */}
            {/* <SharedElement id={`2`}> */}
            <Text style={styles.description}>{'500'}</Text>
            {/* </SharedElement> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  image: {height: 100, width: 100, resizeMode: 'contain'},
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginTop: 8,
  },
});
