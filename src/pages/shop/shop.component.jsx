import React from "react";
// import SHOP_DATA from "./shop.data";
import CollectionsOverview from "../../components/collections-overview/collection-overview.component";
import CollectionOverviewContainer from "../../components/collections-overview/collection-overview.container";

import { Route } from "react-router-dom";

import CollectionPage from "../collection/collection.component";
import CollectionPageContainer from "../collection/collection.container";

import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

import { createStructuredSelector } from "reselect";

import {
  selectCollectionFetching,
  selectCollectionsLoaded,
} from "../../redux/shop/shop.selector";

// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from "../../firebase/firebase.utils";

//the function to add
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  // replace the constructor
  // constructor(){
  //   super();

  //   this.state = {
  //     isLoading: true
  //   }
  // }
  // change the class component to the functinal components
  //the state is the same as constructor and this.state above

  componentDidMount() {
    //dispatch the async function to the shop component.
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

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
  // Added some comments
  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
