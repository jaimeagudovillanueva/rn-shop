import PRODUCTS from '../../data/dummy-data';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';
import { ActionSheetIOS } from 'react-native';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const setProducts = (action) => {
    return {
        availableProducts: action.products,
        userProducts: action.products.filter(prod => prod.ownerId === 'u1')
    }
}

const createProduct = (state, action) => {
    const newProduct = new Product(
        action.productData.id, 
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
    );
    return {
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
    }
}

const updateProduct = (state, action) => {
    const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
    const updatedProduct = new Product(
        action.pid, 
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price,
    );
 
    const updatedUserProducts = [...state.userProducts];
    updatedUserProducts[productIndex] = updatedProduct;

    const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
    const updatedAvailableProducts = [...state.availableProducts];
    updatedAvailableProducts[availableProductIndex] = updatedProduct;

    return {
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
    }
}

const deleteProduct = (state, action) => {
    return { 
        userProducts: state.userProducts.filter(product => product.id !== action.pid),
        availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: return setProducts(action);
        case CREATE_PRODUCT: return createProduct(state, action);
        case UPDATE_PRODUCT: return updateProduct(state, action);
        case DELETE_PRODUCT: return deleteProduct(state, action);
        default: return state;
    }
}
