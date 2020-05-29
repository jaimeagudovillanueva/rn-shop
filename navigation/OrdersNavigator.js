import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './DefaultNavOptions';
import OrdersScreen, { screenOptions } from '../screens/shop/OrdersScreen';

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
    return <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <OrdersStackNavigator.Screen 
            name="Orders"
            component={OrdersScreen}
            options={screenOptions}
        />
    </OrdersStackNavigator.Navigator>
}

export default OrdersNavigator;