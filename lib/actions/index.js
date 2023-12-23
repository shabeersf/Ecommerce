import AsyncStorage from "@react-native-async-storage/async-storage";

const WISHLIST_KEY = "user_wishlist";

export const getWishlist = async () => {
  try {
    const wishlist = await AsyncStorage.getItem(WISHLIST_KEY);
    if (wishlist) {
      return JSON.parse(wishlist);
    }
    return [];
  } catch (error) {
    console.error('Error getting wishlist:', error);
    return [];
  }
};

export const addToWishlist = async (idToAdd) => {
  try {
    let wishlist = await getWishlist();

    if (!wishlist) {
      // Wishlist doesn't exist yet, create a new one with the ID
      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify([idToAdd]));
    } else {
      if (!wishlist.includes(idToAdd)) {
        // ID doesn't exist in the wishlist, add it
        wishlist.push(idToAdd);
      } else {
        // ID exists in the wishlist, remove it
        wishlist = wishlist.filter((id) => id !== idToAdd);
      }
      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
  } catch (error) {
    console.error('Error adding/removing from wishlist:', error);
  }
};

export const checkIfInWishlist = async (idToCheck) => {
  try {
    const wishlist = await AsyncStorage.getItem(WISHLIST_KEY);
    if (wishlist) {
      const parsedWishlist = JSON.parse(wishlist);
      return parsedWishlist.includes(idToCheck);
    }
    return false;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};
export const clearWishlist = async () => {
  try {
    await AsyncStorage.removeItem(WISHLIST_KEY);
    // console.log('Wishlist cleared successfully');
    return []; // Return an empty array after clearing the wishlist
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    throw error; // Throw the error for better insight into the issue
  }
};
