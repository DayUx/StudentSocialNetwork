import React from 'react';



export default function Dashboard() {

    const schools_buttons = [];

    for (let i = 0; i < 10; i++) {
       schools_buttons.push( <button>School {i}</button>);
    }


    return(

        <div>
            <nav>
                <div className="nav-wrapper">
                    {schools_buttons}
                </div>
            </nav>
            <div>

            </div>
        </div>
    );
}