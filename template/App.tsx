import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Cart from 'screens/App/Cart';
import ProductDetail from 'screens/App/ProductDetail';
import {Details} from 'screens/App/details';
import {Home} from 'screens/App/home';

const App = () => {
  const Stack = createSharedElementStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            detachPreviousScreen: false,
            ...TransitionPresets.ScaleFromCenterAndroid,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 1000,
                  // This is super rough approximation of the path used for the curve by android
                  // See http://aosp.opersys.com/xref/android-10.0.0_r2/xref/frameworks/base/core/res/res/interpolator/fast_out_extra_slow_in.xml
                  easing: Easing.bezier(0.35, 0.45, 0, 1),
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 1000,
                  // This is super rough approximation of the path used for the curve by android
                  // See http://aosp.opersys.com/xref/android-10.0.0_r2/xref/frameworks/base/core/res/res/interpolator/fast_out_extra_slow_in.xml
                  easing: Easing.bezier(0.35, 0.45, 0, 1),
                },
              },
            },
          }}
          sharedElements={route => {
            const {id} = route.params;
            return [
              {
                id: id + 'a',
                animation: 'fade',
              },
              {
                id: id,
                // animation: 'fade',
                resize: 'auto',
                align: 'center-top',
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
