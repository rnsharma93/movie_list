import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Search from '../Search/Search';
import "./Header.css";


const Header = () => {

    return(
        <div className="header">
            <h1><Link to={'/'}>Movie Database</Link></h1>
            <p>Search to add Movies or TV Shows to add in your watch list</p>
            <Search />
        </div>


    );

}

export default Header;