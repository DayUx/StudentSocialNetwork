import React, { useState } from 'react';


export default function Register() {


    const [fields, setFields] = useState({ // <-- create field state
        email: '', password: '', second_name: '', first_name: '', pseudo: '',
    });
    const changeHandler = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setFields((fields) => ({
            ...fields, [name]: value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log("ok");
            }
        })
    };


    return (
        <div className="login-register-div">
            <div className="logo">study.io</div>
            <form onSubmit={submitHandler} className="login-register-form">
                <h1>Register</h1>
                <input required placeholder="Email"  name="email" type="email" onChange={changeHandler}  value={fields.email}/>
                <input required placeholder="Pseudo" name="pseudo" onChange={changeHandler}  value={fields.pseudo}/>

                {/*<input required placeholder="First Name" name="first-name" onChange={changeHandler}  value={fields.first_name}/>*/}

                {/*<input required placeholder="Second Name"  name="second-name" onChange={changeHandler}  value={fields.second_name}/>*/}

                <input required placeholder="Password"  name="password" type="password" onChange={changeHandler}  value={fields.password}/>

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

