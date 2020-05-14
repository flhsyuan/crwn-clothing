import React from "react";
// import SHOP_DATA from "./shop.data";
import CollectionsOverview from "../../components/collections-overview/collection-overview.component";

import { Route } from "react-router-dom";

import CollectionPage from "../collection/collection.component";

import { connect } from "react-redux";

import { updateCollections } from "../../redux/shop/shop.actions";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
//the function to add
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  // constructor(){
  //   super();

  //   this.state = {
  //     isLoading: true
  //   }
  // }
  //the state is the same as constructor and this.state above
  state = {
    isLoading: true,
  };
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    //async because the data is inside the snapshot object

    // The following are the onSnapshot pattern
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      //the data loading is finished
      this.setState({ isLoading: false });
    });

    // The following are the promise pattern
    // The get() and onShapshot() are probably the same, the only difference is that the get() is a promise.
    // collectionRef.get().then(async (snapshot) => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   //the data loading is finished
    //   this.setState({ isLoading: false });
    // });

    // The following are the native fetch from the API.
    // However, the document object is heavily nested. we have to dive into layers to get the data.
    // fetch("https://firestore.googleapis.com/v1/projects/crwn-clothing-beee3/databases/(default)/documents/collections")
    // .then(response = response.json())
    // .then(collections => console.log(collections));
  }
  render() {
    const { match } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
