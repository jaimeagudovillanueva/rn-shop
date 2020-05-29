import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import ProductsNavigator from './ProductsNavigator';
import OrdersNavigator from './OrdersNavigator';
import AdminNavigator from './AdminNavigator';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const ShopDrawerNavigator = createDrawerNavigator();

const ShopNavigator = ()=> {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator 
            drawerContentOptions={{contentOptions: {
                    activeTintColor: Colors.primary
            }}}
            drawerContent={props => {
                return <View style={{flex: 1, padding: 20 }}>
                    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                        <DrawerItemList {...props} />
                        <Button title="Logout" color={Colors.primary} onPress={() => {
                            dispatch(authActions.logout());
                        }} />
                    </SafeAreaView>
                </View>
            }}
            >
            <ShopDrawerNavigator.Screen 
                name="Products"
                component={ProductsNavigator}
                options={{ 
                    drawerIcon: props => 
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                            size={23}
                            color={props.color}
                        />
                }}
            />
            <ShopDrawerNavigator.Screen 
                name="Orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon: props => 
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} 
                            size={23}
                            color={props.color}
                        />
                }}
            />
            <ShopDrawerNavigator.Screen 
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: props => 
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                            size={23}
                            color={props.color}
                        />
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
} 

export default ShopNavigator;