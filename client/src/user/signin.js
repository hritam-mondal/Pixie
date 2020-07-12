import React, { Fragment, useState } from "react";
import "../styles.css";
import Base from '../core/Base';
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../auth/helper";

export default function SignIn() {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAutheticated();
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data?.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    });
                });
            }
        })
    };
    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/" />;
            }
        }
        if (isAutheticated()) {
            return <Redirect to="/" />;
        }
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    const signInForm = () => (
        <Fragment>
            <div className="contact-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>Sign In</h1>
                            </div>
                        </div>
                        <div className="col">
                            {loadingMessage()}
                            {errorMessage()}
                            <div className="right-content">
                                <div className="container" id="signin">
                                    <form >
                                        <div className="row">
                                            <div className="col-md-12">
                                                <fieldset>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        onChange={handleChange("email")}
                                                        value={email}
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Email"
                                                        autoFocus
                                                        required />
                                                </fieldset>
                                            </div>
                                            <div className="col-md-12">
                                                <fieldset>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        onChange={handleChange("password")}
                                                        value={password}
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Password"
                                                        required="" />
                                                </fieldset>
                                            </div>
                                            <div className="col">
                                                <fieldset>
                                                    <button type="button" onClick={onSubmit} class="btn btn-primary btn-block" id="btn">Sign in</button>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                    <hr />
                                    <p className="text-center">Don't have an account? <Link to="/signup"> Sign Up </Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

    return (
        <Base>
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}