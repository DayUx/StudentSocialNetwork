import React, {useContext, useEffect, useState} from 'react';

import {getSchoolsOfUserRoute,getSchoolsRoute} from "../../utils/APIRoutes";
import {AuthContext} from "../AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";


export default function Dashboard() {


    const {user} = useContext(AuthContext);
    const [buttons, setButtons] = useState([]);
    const [schools, setSchools] = useState([]);
    const [isActive, setActive] = useState(false);
    let active = false

    let overlayIsActive = false;
    const [overlay, setOverlay] = useState(false);

    const toggleClass = () => {
        console.log(active);
        console.log(isActive);
        let list = [];
        if (!active) {
            fetch(getSchoolsRoute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response =>
                response.json().then(data => ({
                        data: data,
                        status: response.status
                    })
                ).then(res => {
                    console.log(res.data.schools);
                    for (let i = 0; i < res.data.schools.length; i++) {
                        list.push(<div className="school-button" value={res.data.schools[i]._id}><div className={"school-button-icon"} style={
                            {
                                backgroundImage: "url(" + res.data.schools[i].image + ")",
                            }
                        } ></div><h2>{res.data.schools[i].nom}</h2></div>)
                    }
                    setSchools(list)
                }))
        }
        setActive(!active);
        setOverlay(!overlayIsActive);

    };





    const closeEverything = () => {
        setActive(false);

        setOverlay(false);
        console.log(active);
        console.log(isActive);
    };

    useEffect(() => {
        let t = [];
        fetch(getSchoolsOfUserRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: user.id})
        }).then(response =>
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                console.log(res.data.servers_id_and_image);
                for (let i = 0; i < res.data.servers_id_and_image.length; i++) {
                    console.log(res.data.servers_id_and_image[i]._id);

                    t.push(
                        <button
                            style={
                                {
                                    backgroundImage: "url(" + res.data.servers_id_and_image[i].image + ")",
                                }
                            }>
                        </button>);
                    setButtons(t);
                }
                t.push(<button onClick={toggleClass}><FontAwesomeIcon icon={faPlus} /></button>);

                console.log(buttons);
            }))
    }, []);


    return (


        <div className="dashboard">
            <nav>
                <div className="nav-wrapper">
                    {buttons}
                </div>
            </nav>
            <div className="school_page">
                <div className="school_page_header">
                </div>
                <div className="school_page_body">
                </div>
            </div>
            <div className={isActive ? 'visible addSchoolMenu' : 'addSchoolMenu' }>
                <div className={"existing-schools"}>
                    <div className="addSchoolMenu_header">
                        <h1>Join a school</h1>
                        {schools}
                    </div>
                </div>
                <div className={"create-school"}>
                    <button>Add a non existing school</button>
                </div>
            </div>
        <div className={overlay ? "overlay visible" : "overlay"} onClick={closeEverything}>

        </div>
        </div>
    );
}