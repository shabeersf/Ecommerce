import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "user_cart";

export const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    if (cart) {
      return JSON.parse(cart);
    }
    return [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};
export const getCartItem = async (itemId) => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    if (cart) {
      const parsedCart = JSON.parse(cart);
      const item = parsedCart.find(item => item.id === itemId);
      return item ? item : null;
    }
    return null;
  } catch (error) {
    console.error('Error getting cart item:', error);
    return null;
  }
};

export const getCartIds = async () => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    if (cart) {
      const parsedCart = JSON.parse(cart); // Parse the retrieved string into an array
      const ids = parsedCart.map(item => parseInt(item.id, 10));

      return ids;
    }
    return [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};


export const addToCart = async (productToAdd, quantity = 1) => {
  try {
    let cart = await getCart();

    if (!cart) {
      // Cart doesn't exist yet, create a new one with the product
      productToAdd.quantity = quantity;
      await AsyncStorage.setItem(CART_KEY, JSON.stringify([productToAdd]));
    } else {
      const existingItemIndex = cart.findIndex(item => item.id === productToAdd.id);

      if (existingItemIndex === -1) {
        // Product doesn't exist in the cart, add it
        productToAdd.quantity = quantity;
        cart.push(productToAdd);
      } else {
        // Product exists in the cart, update its quantity
        cart[existingItemIndex].quantity = quantity;
      }
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  } catch (error) {
    console.error('Error adding/removing from cart:', error);
  }
};


  

  export const checkIfInCart = async (idToCheck) => {
    try {
      const cart = await AsyncStorage.getItem(CART_KEY);
      if (cart) {
        const parsedCart = JSON.parse(cart);
        // Check if any item in the cart has the specified ID
        const isInCart = parsedCart.some(item => item.id === idToCheck);
        return isInCart;
      }
      return false; // Return false if cart is empty or null
    } catch (error) {
      console.error('Error checking cart:', error);
      return false; // Return false in case of errors
    }
  };
  


  
  export const clearCart = async () => {
    try {
      await AsyncStorage.removeItem(CART_KEY);
      return []; // Return an empty array after clearing the wishlist
    } catch (error) {
        console.error('Error clearing cart:', error);
        return [];
    }
  };