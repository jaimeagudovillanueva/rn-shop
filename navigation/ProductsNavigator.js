import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultNavOptions } from './DefaultNavOptions';
import ProductsOverviewScreen, { screenOptions as productsOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, { screenOptions as productsDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
    return <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProductsStackNavigator.Screen 
            name="ProductsOverview"
            component={ProductsOverviewScreen}
            options={productsOverviewScreenOptions}
        />
        <ProductsStackNavigator.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={productsDetailScreenOptions}
        />
        <ProductsStackNavigator.Screen 
            name="Cart" 
            component={CartScreen}
            options={cartScreenOptions}
        />
    </ProductsStackNavigator.Navigator>
}

export default ProductsNavigator;