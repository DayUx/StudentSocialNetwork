import React from 'react';

export default function LogIn() {
    return (
        <div className="login-div">
            <form className="login-form">
                <h1>Log In</h1>
                <input required name="pseudo"/>
                <input required name="password" type="password"/>
                <input value="Log In" type="submit"/>
            </form>

        </div>
    );
}