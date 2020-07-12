import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAutheticated, isAdmin } from "../auth/helper";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#3a8bcd" };
    } else {
        return { color: "#000000" };
    }
};

const Menu = ({ history }) => (
    <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link style={currentTab(history, "/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/products")} className="nav-link" to="/products">
                    Products
                        </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">
                    Cart
                        </Link>
            </li>
            {isAutheticated() && isAutheticated().user.role === 0 && (
                <li className="nav-item">
                    <Link style={currentTab(history, "/about")} className="nav-link" to="/about">
                        About
                        </Link>
                </li>
            )}
            {!isAutheticated() && (
                <li className="nav-item">
                    <Link style={currentTab(history, "/about")} className="nav-link" to="/about">
                        About
                        </Link>
                </li>
            )}
            {!isAutheticated() && (
                <li className="nav-item">
                    <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">
                        Sign In
                        </Link>
                </li>
            )}
            {isAutheticated() && isAutheticated().user.role === 1 && (
                <li lassName="nav-item">
                    <Link className="nav-link" style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                        Admin Panel
                    </Link>
                </li>
            )}
            {isAutheticated() && (
                <li lassName="nav-item">
                    <Link className="nav-link" style={currentTab(history, "/signin")} onClick={() => { signout(() => { history.push("/"); }); }}>
                        Sign Out
                    </Link>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);