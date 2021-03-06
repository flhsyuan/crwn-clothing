import { createSelector } from "reselect";

// the map used to map the url id which is the string to the number id
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// switch the map into an array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

// the selectCollection need a parameter which is the collectionId
export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    //the collections is now an object.
    (collections) => (collections ? collections[collectionUrlParam] : null)
  );

export const selectCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectCollectionsLoaded = createSelector(
  [selectShop],
  // the !! will return false when the following is falsey values:(null, "", 0)
  (shop) => !!shop.collections
);
