import React from 'react';

export default function Register() {
    return (
        <div className="register-div">
            <form className="register-form">
                <h1>Register</h1>
                <label htmlFor="pseudo">Pseudo</label>
                <input required name="pseudo"/>

                <label htmlFor="email">Email</label>
                <input required name="email" type="email"/>

                <label htmlFor="password">Password</label>
                <input required name="password" type="password"/>

                <label htmlFor="confirm-password">Confirm password</label>
                <input required name="confirm-password" type="password"/>

                <input value="Register" type="submit"/>
            </form>

        </div>
    );
}