import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { deleteTab } from "../../../redux/tabs/tabs.action";
import { selectFirstTab } from "../../../redux/tabs/tabs.selector";

import useActiveTab from "../../../hooks/use-active-tab.hooks";

const TabDropdown = ({ deleteTab }) => {
  const activeTab = useActiveTab();

  const handleDeleteTab = () => {
    try {
      deleteTab(activeTab);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="custom-dropdown">
      <Link to="#" className="nav-link">
        Tab
      </Link>
      <ul className="custom-dropdown-section">
        {/* <li><span>Rename Tab</span></li> */}
        {/* <li>
          <span>Sort A-Z</span>
        </li>
        <li>
          <span>Sort Z-A</span>
        </li> */}
        {/* <li><span>Change Tab Order</span></li> */}
        <li>
          <span to="#" onClick={handleDeleteTab}>
            Delete Tab
          </span>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  firstTab: selectFirstTab,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTab: (activeTab) => dispatch(deleteTab(activeTab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabDropdown);
