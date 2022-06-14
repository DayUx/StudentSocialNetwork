import React from 'react';
import Parser from 'html-react-parser';



export default function Home() {

    const user = JSON.parse(localStorage.getItem('user'));

    return (


        <div>
            {Parser(user.email)}
        </div>



    );
}