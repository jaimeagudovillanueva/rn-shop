import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartAction from '../../store/actions/cart';
import * as productsAction from '../../store/actions/products';
import HeaderButton from '../../components/ui/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsAction.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsRefreshing, setError]);

    // Nos subscribimos a focus para que se recarguen los productos cada vez
    // que se vuelve a cargar la página. Ya que el useEffect inicial solo se ejecuta cuando
    // se renderiza el componente y al usar sideDrawer solo se renderiza la primera vez, ya que
    // al abandonar el componente no se elimina si no que se oculta
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            loadProducts();
        })
        return () => {
            unsubscribe();
        }
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => setIsLoading(false));
    }, [loadProducts, setIsLoading]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { 
            productId: id,
            productTitle: title
        })
    }

    if (error) {
        return <View style={styles.centered}>
            <Text>An error ocurred!</Text>
            <Button title="Try again" onPress={loadProducts} color={Colors.primary}/>
        </View>
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    }

    if (isLoading && products.lenth === 0) {
        return <View style={styles.centered}>
            <Text>No products found. Maybe start adding some!</Text>
        </View>
    }

    return <FlatList 
        data={products} 
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        renderItem={itemData => 
            <ProductItem 
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title) }
            >
                <Button color={Colors.primary} 
                    title="View Details" 
                    onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} 
                />
                <Button color={Colors.primary} 
                    title="To Cart" 
                    onPress={() => dispatch(cartAction.addToCart(itemData.item))} 
                />
            </ProductItem>
        }/>
}

const styles = StyleSheet.create({
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})
 
export const screenOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                    onPress={() =>{navData.navigation.toggleDrawer()}}/>
            </HeaderButtons>,
        headerRight: () => 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Cart' 
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                    onPress={() =>{navData.navigation.navigate('Cart')}}/>
            </HeaderButtons>
    }
}

export default ProductsOverviewScreen;