import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectTabs } from '../../redux/tabs/tabs.selector';

import './tab-list.styles.css';

const TabList = (props) => {
  const { tabs, activeTab } = props;

  return (
    <div className="card-header tabs-list">
      <ul className="nav nav-tabs card-header-tabs">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <Link
              className={`nav-link ${tab.id === activeTab ? 'active' : ''}`}
              to={`/dashboard?tab=${tab.id}`}
            >
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  tabs: selectTabs,
})

export default connect(mapStateToProps)(TabList);