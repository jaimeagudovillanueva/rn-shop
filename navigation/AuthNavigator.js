import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './DefaultNavOptions';
import AuthScreen, { screenOptions } from '../screens/user/AuthScreen';

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
    return <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AuthStackNavigator.Screen 
            name="Auth"
            component={AuthScreen}
            options={screenOptions}
        />
    </AuthStackNavigator.Navigator>
}

export default AuthNavigator;