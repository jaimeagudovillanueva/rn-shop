import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from "../actions/orders";

const initialState = {
    items: {},
    totalAmount: 0
}

const addToCart = (state, action) => {
    const addedProduct = action.product;
    const prodPrice = addedProduct.price;
    const prodTitle = addedProduct.title;

    let updatedOrNewCartItem;
    if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
            state.items[addedProduct.id].quantity + 1, 
            prodPrice, 
            prodTitle,
            state.items[addedProduct.id].price + prodPrice
        );
    } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice); 
    }

    return {
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
    }
}

const removeFromCart = (state, action) => {
    const selectedCartItem = state.items[action.productId];

    let updatedCartItems;
    if (selectedCartItem.quantity > 1) {
        const updatedCartItem = new CartItem(
            selectedCartItem.quantity - 1, 
            selectedCartItem.price, 
            selectedCartItem.title,
            selectedCartItem.sum - selectedCartItem.price
        );
        updatedCartItems = { ...state.items, [action.productId]: updatedCartItem}
    } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
    }

    return {
        items: updatedCartItems,
        totalAmount: Math.abs(state.totalAmount - selectedCartItem.price)
    }
}

const addOrder = () => {
    return initialState;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: return addToCart(state, action);
        case REMOVE_FROM_CART: return removeFromCart(state, action);
        case ADD_ORDER: return addOrder();
        default: return state;
    }
}