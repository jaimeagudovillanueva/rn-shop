import React, { useState, useEffect }  from 'react';
import { View, Text, FlatList, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/ui/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch, setIsLoading]);

    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size='large' color={Colors.primary}/></View>
    }

    if (orders.length === 0) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No orders found, maybe start ordering some products</Text>
        </View>
    }

    return (
        <FlatList 
            data={orders} 
            renderItem={itemData => 
                <OrderItem 
                    items={itemData.item.items}
                    amount={itemData.item.totalAmount} 
                    date={itemData.item.readableDate}/>
            } 
        />
    )   
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
        headerTitle: 'Your Orders',
        headerLeft: () => 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                    onPress={() =>{navData.navigation.toggleDrawer()}}/>
            </HeaderButtons>
    }    
}

export default OrdersScreen;