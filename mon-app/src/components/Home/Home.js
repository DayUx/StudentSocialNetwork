import React, {useContext, useEffect} from 'react';
import Parser from 'html-react-parser';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../AuthProvider";
import Dashboard from "../Dashboard/Dashboard";
import School from "../../../backend/api/model/schoolModel"


export default function Home() {
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (!user){

            navigate('/login');

        }
    }, []);

    const images = function(id){
        
        const id_et_image = School.find({"users.id": id});
        if (id_et_image == null){
            for (let i = 0; i < id_et_image; i++){
                
                delete id_et_image[i].ville;
                delete id_et_image[i].nom;
                delete id_et_image[i].description;
                delete id_et_image[i].messages;
                delete id_et_image[i].users;
            }
        }
        return id_et_image;
    }

    const messages = function(){
        const id_et_image = School.find({});

        console.log(id_et_image);

        return id_et_image;
    }

    return user ? (
        <Dashboard/>
    ) : null;
}