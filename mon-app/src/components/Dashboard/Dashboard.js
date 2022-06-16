import React from 'react';



export default function Dashboard() {
    return(

        <div>
            <nav>
                <div className="nav-wrapper">
                    {
                        for (let i = 0; i < 10; i++) {
                        <a href="#" className="brand-logo">Logo</a>
                        }
                    }
                </div>
            </nav>
            <div>

            </div>
        </div>
    );
}