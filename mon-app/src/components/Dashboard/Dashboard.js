import React from 'react';



export default function Dashboard() {

    const schools_buttons = [];

    for (let i = 0; i < 10; i++) {
       schools_buttons.push( <button>School {i}</button>);
    }


    return(
        <div className="dashboard">
            <nav>
                <div className="nav-wrapper">
                    {schools_buttons}
                </div>
            </nav>
            <div className="school_page">
                <div className="school_page_header">
                </div>
                <div className="school_page_body">
                </div>
            </div>
        </div>
    );
}