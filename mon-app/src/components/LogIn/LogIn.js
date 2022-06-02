import React from 'react';

export default function LogIn() {
    return (
        <div className="login-div">
            <form className="login-form">
                <h1>Log In</h1>
                <input required placeholder="Pseudo" name="pseudo"/>

                <input required placeholder="Password" name="password" type="password"/>

                <input className="btn" value="Sign In" type="submit"/>
            </form>
            <div>
                <h1>New here ?</h1>
                <button > Register</button>
            </div>
        </div>
    );
}