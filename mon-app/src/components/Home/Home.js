import React, {useContext, useEffect} from 'react';
import Parser from 'html-react-parser';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../AuthProvider";
import Dashboard from "../Dashboard/Dashboard";


export default function Home() {
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (!user){

            navigate('/login');

        }
    }, []);

    return user ? (
        <Dashboard/>
    ) : null;
}