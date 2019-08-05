import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="side__drop">
    <ul>
      {/* <li className="row">
        <Link to="/#">
          <div className="side__drop--icon col-sm-4">
            <i className="fa fa-user blue" />
          </div>
          <div className="side__drop--label col-sm-8">
            <p>Profile</p>
          </div>
        </Link>
      </li> */}
      <li className="row">
        <Link to="/#">
          <div className="side__drop--icon col-sm-4">
            <i className="fa fa-user" />
          </div>
          <div className="side__drop--label col-snm-8">
            <p>Profile</p>
          </div>
        </Link>
      </li>
      <li className="row">
        <Link to="/#">
          <div className="side__drop--icon col-sm-4">
            <i className="fa fa-pencil-square-o" />
          </div>
          <div className="side__drop--label col-snm-8">
            <p>New story</p>
          </div>
        </Link>
      </li>
      <li className="row">
        <Link to="/#">
          <div className="side__drop--icon col-sm-4">
            <i className="fa fa-book" />
          </div>
          <div className="side__drop--label col-snm-8">
            <p>My Stories</p>
          </div>
        </Link>
      </li>
      <li className="row">
        <Link to="/#">
          <div className="side__drop--icon col-sm-4">
            <i className="fa fa-bookmark-o" />
          </div>
          <div className="side__drop--label col-snm-8">
            <p>Bookmarks</p>
          </div>
        </Link>
      </li>
      <li className="row">
        <Link to="/#">
          <div className="side__drop--icon col-sm-4">
            <i className="fa fa-user" />
          </div>
          <div className="side__drop--label col-snm-8">
            <p>Logout</p>
          </div>
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
