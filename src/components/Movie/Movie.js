import React, {useState} from  'react';
import { Link } from "react-router-dom";
import {IMAGE_PATH} from "../../Constants";


import "./Movie.css";


const Movie = ({details}) => {
    return (
        
            <div className="movie">
               <Link to={`/detail/${details.id}`}>
                <img className="movie__img" src={IMAGE_PATH+""+details.poster_path} />
                <div className="movie__info">{details.original_title}</div>  
                </Link> 
            </div>
        
    );
}


export default Movie;