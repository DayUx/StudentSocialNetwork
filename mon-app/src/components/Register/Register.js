import React from 'react';

export default function Register() {
    return (
        <div className="login-register-div">
            <div className="logo">study.io</div>
            <form onSubmit={handleSubmit} className="login-register-form">
                <h1>Register</h1>
                <input required placeholder="Email"  name="email" type="email"/>
                <input required placeholder="Pseudo" name="pseudo"/>

                <input required placeholder="First Name" name="first-name"/>

                <input required placeholder="Second Name"  name="second-name"/>

                <input required placeholder="Password"  name="password" type="password"/>

                <input required placeholder="Confirm Password"  name="confirm-password" type="password"/>

                <input className="btn" value="Register" type="submit"/>
            </form>
            <div>
                <h1>Already register ?</h1>
                <button>Log In</button>
            </div>
        </div>
    );
}

const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    console.log("test")
}