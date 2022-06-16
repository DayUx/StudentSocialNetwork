import React, {useState,useContext, useEffect} from 'react';
import {registerRoute} from '../../utils/APIRoutes';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../AuthProvider";


export default function Register() {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (user){

            navigate('/');

        }
    }, []);





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

    const redirection=()=> {
        navigate('/login')
      }

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(registerRoute, {
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
                    localStorage.setItem('user',JSON.stringify(res.data.user));
                    navigate('/');
                } else {
                    console.log(res.data);
                }
            }))
    };


    return (
        <div className="login-register-div">
            <div className="logo">study.io</div>
            <form onSubmit={submitHandler} className="login-register-form">
                <h1>Register</h1>
                <input required placeholder="Email" name="email" type="email" onChange={changeHandler}
                       value={fields.email}/>
                <input required placeholder="Pseudo" name="pseudo" onChange={changeHandler} value={fields.pseudo}/>

                <input required placeholder="First Name" name="first_name" onChange={changeHandler}
                       value={fields.first_name}/>

                <input required placeholder="Second Name" name="second_name" onChange={changeHandler}
                       value={fields.second_name}/>

                <input required placeholder="Password" name="password" type="password" onChange={changeHandler}
                       value={fields.password}/>

                <input required placeholder="Confirm Password" name="confirm-password" type="password"/>

                <input className="btn" value="Register" type="submit"/>
            </form>
            <div>
                <h1>Already register ?</h1>
                <button onClick={redirection}>Log In</button>
            </div>
        </div>
    );
}

