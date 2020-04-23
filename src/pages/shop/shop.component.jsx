import React from "react";
// import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/preview-collection/preview-collection.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop.selector";

const ShopPage = ({ collections }) => (
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     // collections: SHOP_DATA,
  //   };
  //
  <div className="shop-page">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(ShopPage);
