import React, {useContext, useEffect, useState} from 'react';

import {getSchoolsOfUserRoute, getSchoolsRoute} from "../../utils/APIRoutes";
import {AuthContext} from "../AuthProvider";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";


export default function Dashboard() {


    const {user} = useContext(AuthContext);
    const [buttons, setButtons] = useState([]);
    const [schools, setSchools] = useState([]);
    const [active, setActive] = useState(false);
    const [addSchool, setAddSchool] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

    const [overlay, setOverlay] = useState(false);


    const createSchool = () => {
        setOverlay(true);
        setAddSchool(true);
        setActive(false);
    }


    const toggleClass = () => {

        let list = [];
        if (!active) {
            fetch(getSchoolsRoute, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json().then(data => ({
                data: data, status: response.status
            })).then(res => {
                console.log(res.data.schools);
                for (let i = 0; i < res.data.schools.length; i++) {
                    list.push(<div className="school-button" value={res.data.schools[i]._id}>
                        <div className={"school-button-icon"} style={{
                            backgroundImage: "url(" + res.data.schools[i].image + ")",
                        }}></div>
                        <h2>{res.data.schools[i].nom}</h2></div>)
                }
                setSchools(list)
            }))
        }
        setActive(!active);
        setAddSchool(false);
        setOverlay(true);

    };


    const closeEverything = () => {
        setActive(false);

        setOverlay(false);
        setAddSchool(false);
    };

    useEffect(() => {
        let t = [];
        fetch(getSchoolsOfUserRoute, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({user_id: user.id})
        }).then(response => response.json().then(data => ({
            data: data, status: response.status
        })).then(res => {
            console.log(res.data.servers_id_and_image);
            for (let i = 0; i < res.data.servers_id_and_image.length; i++) {
                console.log(res.data.servers_id_and_image[i]._id);

                t.push(<button
                    style={{
                        backgroundImage: "url(" + res.data.servers_id_and_image[i].image + ")",
                    }}>
                </button>);
                setButtons(t);
            }
            t.push(<button onClick={toggleClass}><FontAwesomeIcon icon={faPlus}/></button>);

            console.log(buttons);
        }))
    }, []);


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);

            setSelectedFile(reader.result);
        }
    }



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
            <div className={active ? 'visible addSchoolMenu' : 'addSchoolMenu'}>
                <div className={"existing-schools"}>
                    <div className="addSchoolMenu_header">
                        <h1>Join a school</h1>
                        {schools}
                    </div>
                </div>
                <div className={"create-school"}>
                    <button onClick={createSchool}>Add a non existing school</button>
                </div>
            </div>

            <div className={addSchool ? 'visible create-school-menu' : 'create-school-menu'}>
                <div className={"create-school-menu-header"}>
                    <h1>Create a school</h1>
                </div>
                <form>
                    <div className={"preview-container"}>
                        <input type='file' onChange={onSelectFile}/>
                        <img className="preview" src={selectedFile}/></div>
                    <input required placeholder="Nom de l'école" name="nom" />
                    <input required placeholder="Description" name="description" />

                    <button type="submit">Create</button>
                </form>

            </div>


            <div className={overlay ? "overlay visible" : "overlay"} onClick={closeEverything}>

            </div>
        </div>);
}