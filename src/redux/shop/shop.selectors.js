import {createSelector} from "reselect";


const selectShop = state => state.shop;


export const selectConnections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectConnections],
    collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam => createSelector(
    [selectConnections],
    collections => collections[collectionUrlParam]
);