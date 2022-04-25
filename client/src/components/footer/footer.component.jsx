import React from "react";

import "./footer.sytles.css";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12 col-sm-12">
            <p className="copyright">
              &copy; 2022 Bookmark Easy . Design:
              <a
                rel="nofollow"
                href="https://github.com/sonuuno2020/BookmarkEasy"
              >
                One 4 All
              </a>
            </p>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12">
            <ul className="social">
              {/* <li>
                <a href="/">FAQ</a>
              </li>
              <li>
                <a href="/">User Guide</a>
              </li>
              <li>
                <a href="/">Terms of Service</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">About</a>
              </li> */}
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
