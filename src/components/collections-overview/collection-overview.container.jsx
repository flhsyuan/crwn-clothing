import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collection-overview.component";
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
  isLoading: selectCollectionFetching,
});

//compose is to combine all the HOC together. Read from the right to left.
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
