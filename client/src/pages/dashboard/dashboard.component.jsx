import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchTabs } from "../../redux/tabs/tabs.action";
import { fetchCategories } from "../../redux/category/category.action";
import { fetchBookmarks } from "../../redux/bookmarks/bookmarks.action";
import { selectFirstTab } from "../../redux/tabs/tabs.selector";

import Header from "../../components/header/header.component";
import MenuBar from "../../components/menu-bar/menu-bar.component";
import TabList from "../../components/tab-list/tab-list.component";
import CategoryList from "../../components/category-list/category-list.component";
import Footer from "../../components/footer/footer.component";

import useActiveTab from "../../hooks/use-active-tab.hooks";

import "./dashboard.styles.css";
import { useEffect } from "react";

const Dashboard = ({
  firstTab,
  fetchTabs,
  fetchCategories,
  fetchBookmarks,
}) => {
  const activeTab = useActiveTab(firstTab);

  useEffect(() => {
    fetchTabs();
    fetchCategories();
    fetchBookmarks();
  }, [fetchTabs, fetchCategories, fetchBookmarks]);

  console.log("Dashboard");
  return (
    <div className="dashboard">
      <Header />
      <section className="section dashboard-section">
        <div className="container">
          <MenuBar />
          <div className="card">
            <TabList activeTab={activeTab} />
            <div className="card-body">
              <CategoryList activeTab={activeTab} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  firstTab: selectFirstTab,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTabs: () => dispatch(fetchTabs()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchBookmarks: () => dispatch(fetchBookmarks()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
