import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders: []
}

const addOrder = (state, action) => {
    const newOrder = new Order(
        new Date().toString(), 
        action.orderData.items, 
        action.orderData.amount, 
        new Date()
    );
    return {
        orders: state.orders.concat(newOrder)
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER: return addOrder(state, action);
        default: return state;
    }
}