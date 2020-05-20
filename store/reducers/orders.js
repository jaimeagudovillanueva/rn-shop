import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders: []
}

const addOrder = (state, action) => {
    const newOrder = new Order(
        action.orderData.id, 
        action.orderData.items, 
        action.orderData.amount, 
        action.orderData.date
    );
    return {
        orders: state.orders.concat(newOrder)
    }
}

const setOrders = (action) => {
    return { orders: action.orders }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER: return addOrder(state, action);
        case SET_ORDERS: return setOrders(action);
        default: return state;
    }
}