/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div>
    <footer className="position-static fixed-bottom">
      <div className="container ">
        <h4 className="text-center mt-5">Authors Haven</h4>
        <hr />
        <div className="row mb-2">
          <div className="col-sm-4" />
          <div className="col-sm-4">
            <div className="social-links container">
              <Link to="" className="social-links__item">
                <i className="fab fa-facebook" />
              </Link>
              <Link to="" className="social-links__item">
                <i className="fab fa-twitter" />
              </Link>
              <Link to="" className="social-links__item">
                <i className="fab fa-pinterest" />
              </Link>
              <Link to="" className="social-links__item">
                <i className="fab fa-instagram" />
              </Link>
            </div>
          </div>
          <div className="col-sm-4" />
        </div>
        <h6 className="white text-center mb-5">Copyright &copy; 2019 Team Tesla</h6>
      </div>
    </footer>
  </div>
);
export default Footer;
