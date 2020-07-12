import React, { Fragment, useState } from "react";
import "../styles.css";
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from "../auth/helper/index";

export default function SignUp() {

    const [values, setValues] = useState({
        fullname: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { fullname, email, password, error, success } = values;

    const handleChange = fullname => event => {
        setValues({ ...values, error: false, [fullname]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ fullname, email, password })
            .then(data => {
                if (data?.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        fullname: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    });
                }
            })
            .catch(console.log("Error in signup"));
    };

    const signUpForm = () => {
        return (
            <Fragment>
                <div className="contact-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <div className="line-dec"></div>
                                    <h1>Sign Up</h1>
                                </div>
                            </div>
                            <div className="col">
                                {successMessage()}
                                {errorMessage()}
                                <div className="right-content">
                                    <div className="container" id="signin">
                                        <form >
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <fieldset>
                                                        <input name="fullname" type="text" onChange={handleChange("fullname")} className="form-control" id="subject" value={fullname} placeholder="Full Name" required autoFocus/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-md-12">
                                                    <fieldset>
                                                        <input name="email" onChange={handleChange("email")} type="email" className="form-control" value={email} id="subject" placeholder="Email" required/>
                                                    </fieldset>
                                                </div>
                                                <div className="col-md-12">
                                                    <fieldset>
                                                        <input name="subject" type="password" onChange={handleChange("password")} className="form-control" id="subject" placeholder="Password" value={password} required="" />
                                                    </fieldset>
                                                </div>
                                                <div className="col">
                                                    <fieldset>
                                                        <button type="button" onClick={onSubmit} className="btn btn-primary btn-block" id="btn">Create Account</button>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </form>
                                        <hr />
                                        <p className="text-center">Already have an account? <Link to="/signin"> Sign in </Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success mt-4" role="alert"
                        style={{ display: success ? "" : "none" }}
                    >
                            <h5 class="alert-heading">
                            <svg width="28" height="28" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                                &nbsp; Success!
                            </h5>
                        New account has been successfully added and it is ready to be used. Please&nbsp;
                        <Link to="/signin">Sign In</Link>
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger" role="alert"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Base>
            {signUpForm()}
        </Base>
    )
}