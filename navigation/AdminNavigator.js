import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './DefaultNavOptions';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
    return <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AdminStackNavigator.Screen 
            name="UserProducts"
            component={UserProductsScreen}
            options={userProductsScreenOptions}
        />
        <AdminStackNavigator.Screen 
            name="EditProduct"
            component={EditProductScreen}
            options={editProductScreenOptions}
        />
    </AdminStackNavigator.Navigator>
}

export default AdminNavigator;