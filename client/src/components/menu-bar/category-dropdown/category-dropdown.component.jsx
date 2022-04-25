import React from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = () => {
  return (
    <div className="custom-dropdown">
      <Link to="#" className="nav-link">
        Categories
      </Link>
      {/* <ul className='custom-dropdown-section'>
        <li><Link to='#'>Sort A-Z</Link></li>
        <li><Link to='#'>Sort Z-A</Link></li>
        <li><Link to='#'>Collapse all</Link></li>
        <li><Link to='#'>Expand all</Link></li>
      </ul> */}
    </div>
  );
};

export default CategoryDropdown;
