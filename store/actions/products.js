import Product from '../../models/product';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            // Gracias a redux-thunk podemos ejecutar aquí código asíncrono en vez de devolver
            // directamente el objeto con el tipo y los datos
            const response = await fetch('https://rn-shop-61737.firebaseio.com/products.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(new Product(
                    key, 
                    resData[key].ownerId, 
                    resData[key].title, 
                    resData[key].imageUrl, 
                    resData[key].description, 
                    resData[key].price)
                );
            }

            dispatch({
                type: SET_PRODUCTS, 
                products: loadedProducts, 
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            });
        } catch (err) {
            // log error 
            throw err;
        }
    }
}

export const createProduct = (title, description, imageUrl, price) => {
     // Gracias a redux-thunk podemos ejecutar aquí código asíncrono en vez de devolver
     // directamente el objeto con el tipo y los datos. Además nos da acceso al estado
     // del global store gracias a la función getState
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-shop-61737.firebaseio.com/products.json?auth=${token}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, imageUrl, price, ownerId: userId })
        });

        const responseData = await response.json();
        dispatch({ 
            type: CREATE_PRODUCT, 
            productData: { 
                id: responseData.name, 
                title, 
                description, 
                imageUrl, 
                price,
                ownerId: userId
            } 
        })
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://rn-shop-61737.firebaseio.com/products/${id}.json?auth=${token}`, 
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, imageUrl })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({ 
            type: UPDATE_PRODUCT, 
            pid: id,
            productData: { title, description, imageUrl } 
        });
    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://rn-shop-61737.firebaseio.com/products/${productId}.json?auth=${token}`, 
        {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({ type: DELETE_PRODUCT, pid: productId });
    }
}