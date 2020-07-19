export const addItemToCart = (currentItems, itemToAdd) => {
    const existingCartItem = currentItems.find(currentItems => currentItems.id === itemToAdd.id);

    if (existingCartItem) {
        return currentItems.map(item => item.id === itemToAdd.id ? {...item, quantity: item.quantity + 1} : item)
    }

    return [...currentItems, {...itemToAdd, quantity: 1}]
};


export const removeSingleItemFromCart = (currentItems, itemToRemove) => {
    return currentItems.filter(currentItems => currentItems.id !== itemToRemove.id)
};

export const decreaseQuantityByOne = (currentItems, itemToDecrease) => {
    const existingCartItem = currentItems.find(currentItems => currentItems.id === itemToDecrease.id);

    if (existingCartItem.quantity >= 1) {
        return currentItems.map(item => item.id === itemToDecrease.id ? {
            ...itemToDecrease,
            quantity: item.quantity - 1
        } : item)
    }

    return currentItems

};