import axios, { AxiosResponse } from 'axios';

//USER FUNCTIONS
export const requestLogin = (email: string, password: string) => {
    return axios.post<{ token: string, expiresIn: string }>('http://localhost:8080/auth/login', {
      email: email,
      password: password
    })
    .then(response => {
      
      return(response.data.token);
      
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestSignUp = (email: string, password: string, fullName: string) => {
    return axios.post<{ token: string, expiresIn: string }>('http://localhost:8080/auth/signup', {
      email: email,
      password: password,
      fullName: fullName
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestUserData = (userToken: string) => {
    return axios.get<any>('http://localhost:8080/users/me', {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

//PRODUCT FUNCTIONS

export const requestAllProducts = () => {
    return axios.get<any>('http://localhost:8080/api/product', {
        
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestProductById = (productId: number) => {
    return axios.get<any>('http://localhost:8080/api/product/' + productId, {

    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestProduct = (path: string) => {
    return axios.get<any>('http://localhost:8080/api/product/getByPath/' + path, {

    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

interface productInterface {
    id: number | undefined,
    name: string,
    path: string,
    description: string,
    price: string,
    image: string,
    category: string,
}

export const requestCreateProduct = (userToken: string, product: productInterface) => {
    return axios.post<any>('http://localhost:8080/api/product',
        product, 
    {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestDeleteProduct = (userToken: string, productId: number) => {
    return axios.delete<any>(`http://localhost:8080/api/product/${productId}`, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.status;
    })
    .catch(error => {
        // Manejo de errores
        throw error;
    });
};

export const requestUpdateProduct = (userToken: string, product: productInterface) => {
    return axios.put<any>('http://localhost:8080/api/product',
        product, 
    {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

//CART FUNCTIONS

export const requestCart = (userToken: string) => {
    return axios.get<any>('http://localhost:8080/api/shoppingCart', {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data.shoppingCartProducts;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestProductInCart = (userToken: string, productId: number) => {
    return axios.get<any>('http://localhost:8080/api/shoppingCart/productInCart/' + productId, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestUpdateProductQuantityInCart = (userToken: string, productId: number, quantity: number) => {
    return axios.patch<any>('http://localhost:8080/api/shoppingCart/editProductQuantity', {
        quantity: quantity,
        product: {
            id: productId
        }
    }, 
    {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestAddProductQuantitytoCart = (userToken: string, productId: number, quantity: number) => {
    return axios.patch<any>('http://localhost:8080/api/shoppingCart/addProductQuantity', {
        quantity: quantity,
        product: {
            id: productId
        }
    }, 
    {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestAddProductToCart = (userToken: string, productId: number, quantity: number) => {
    return axios.post<any>('http://localhost:8080/api/shoppingCart', {
        quantity: quantity,
        product: {
            id: productId
        }
    }, 
    {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestRemoveProductFromCart = (userToken: string, productId: number) => {
    return axios.delete<any>('http://localhost:8080/api/shoppingCart', {
        data: {
            product: {
                id: productId
            }
        },
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestGetCartTotal = (userToken: string) => {
    return axios.get<any>('http://localhost:8080/api/shoppingCart/getTotal', {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

//WISHLIST FUNCTIONS

export const requestWishlist = (userToken: string) => {
    return axios.get<any>('http://localhost:8080/api/wishlist', {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data.wishlistProducts;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestProductInWishlist = (userToken: string, productId: number) => {
    return axios.get<any>('http://localhost:8080/api/wishlist/productInWishlist/' + productId, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestUpdateProductQuantityInWishlist = (userToken: string, productId: number, quantity: number) => {
    return axios.patch<any>('http://localhost:8080/api/wishlist', {
        quantity: quantity,
        product: {
            id: productId
        }
    }, 
    {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestAddProductToWishlist = (userToken: string, productId: number) => {
    return axios.post<any>('http://localhost:8080/api/wishlist', {
        quantity: 1,
        product: {
            id: productId
        }
    }, 
    {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestRemoveProductFromWishlist = (userToken: string, productId: number) => {
    return axios.delete<any>('http://localhost:8080/api/wishlist', {
        data: {
            product: {
                id: productId
            }
        },
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestAddWishlistToCart = (userToken: string) => {
    return axios.post<any>('http://localhost:8080/api/shoppingCart/addWishlistToCart', {}, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

//ORDER FUNCTIONS

export const requestAllOrders = (userToken: string) => {
    return axios.get<any>('http://localhost:8080/api/order/getAllOrders', {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestAllOrdersByUser = (userToken: string) => {
    return axios.get<any>('http://localhost:8080/api/order/getAllOrdersByUser', {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestOrderById = (userToken: string, orderId: number) => {
    return axios.get<any>('http://localhost:8080/api/order/getOrderById/' + orderId, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

export const requestOrderByIdAsUser = (userToken: string, orderId: number) => {
    return axios.get<any>('http://localhost:8080/api/order/getOrderByIdAsUser/' + orderId, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};



export const requestEditOrderStatus = (userToken: string, orderId:number, newStatus: number) => {
    return axios.patch<any>('http://localhost:8080/api/order/editStatus', {
        id: orderId,
        status: newStatus
    }, 
    {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};

interface orderDetailsInterface {
    province: string,
    city: string,
    address1: string,
    address2: string | undefined,
    zipCode: string,
    cardNumber: string,
}

export const requestConvertCartToOrder = (userToken: string, orderDetails: orderDetailsInterface) => {
    return axios.post<any>('http://localhost:8080/api/order/convertCartToOrder',
        orderDetails
    , {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      //setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error;
    });
};