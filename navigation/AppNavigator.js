import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import ShopNavigator from './ShopNavigator';
import AuthNavigator from './AuthNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    console.log('AUTH ' + isAuth + "TRY " + didTryAutoLogin);
    return <NavigationContainer>
        {isAuth && <ShopNavigator />}
        {!isAuth && didTryAutoLogin && <AuthNavigator />}
        {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>;
}

export default AppNavigator;