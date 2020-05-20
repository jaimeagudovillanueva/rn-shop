import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableNativeFeedback, 
    Platform, StyleSheet } from 'react-native';

import Card from '../ui/Card';

const ProductItem = props => {
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }
    return (   
        <Card style={styles.product}> 
            <TouchableComponent onPress={props.onSelect} useForeground>
                <View>
                    <Image style={styles.image} source={{uri: props.image}}/>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableComponent>
        </Card>
    );
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    image: {
        width: '100%',
        height: '60%',
        resizeMode: "center"
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2   
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }
});

export default ProductItem;