import React, {useState,useContext, useEffect} from 'react';
import {loginRoute} from "../../utils/APIRoutes";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../AuthProvider";

export default function LogIn() {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (user){

            navigate('/');

        }
    }, []);


    const [fields, setFields] = useState({ // <-- create field state
        email: '', password: '',
    });
    const changeHandler = (e) => {
        const {name, value} = e.target;
        setFields((fields) => ({
            ...fields, [name]: value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(fields);
        fetch(loginRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        }).then(response =>
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                console.log(res);
                if (res.data.status === true) {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    console.log(res.data.user);
                    navigate('/');
                } else {
                    console.log(res.data);
                }
            }))
    };

    return (<div className="login-register-div">
        <div className="logo">study.io</div>
        <form onSubmit={submitHandler} className="login-register-form">
            <h1>Log In</h1>
            <input required placeholder="Email" type="email" name="email" onChange={changeHandler}
                   value={fields.email}/>
            <input required placeholder="Password" name="password" type="password" onChange={changeHandler}
                   value={fields.password}/>
            <input className="btn" value="Sign In" type="submit"/>
        </form>
        <div>
            <h1>New here ?</h1>
            <button> Register</button>
        </div>
    </div>);
}