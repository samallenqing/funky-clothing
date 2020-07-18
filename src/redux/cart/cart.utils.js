export const addItemToCart = (currentItems, itemToAdd) => {
    const existingCartItem = currentItems.find(currentItems => currentItems.id === itemToAdd.id);

    if (existingCartItem) {
        return currentItems.map(item => item.id === itemToAdd.id ? {...item, quantity: item.quantity + 1} : item)
    }

    return [...currentItems, {...itemToAdd, quantity: 1}]
};

