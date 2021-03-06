import React from 'react';
import { useState } from 'react';
import {Link} from "react-router-dom";
import "./Navbar.css"; 

//https://reactrouter.com/docs/en/v6/getting-started/overview
//<h3 className="logo">Nobless</h3>  Låg i toppen
const Navbar = () => {
    
    const [isMobile, setIsMobile] = useState(false);
    
    return (
        <nav className="navbar">
            
            
            <ul onClick={() => setIsMobile(false)} className={isMobile? "nav-links-mobile" : "nav-links"}>
                
                <Link to="/" className="home">
                    <li>Bokningar</li>
                </Link>
                <Link to="/produktforsaljning" className="home">
                    <li>Produktförsäljning</li>
                </Link>
                <Link to="/dagsavslut" className="about">
                    <li>Dagsavslut</li>
                </Link>
                <Link to="/produkter" className="about">
                    <li>Produkter</li>
                </Link>
                <Link to="/om" className="about">
                    <li>Om appen</li>
                </Link>

            </ul>
            <button onClick={() => setIsMobile(!isMobile)} className="mobile-menu-icon">
                {isMobile ? (
                    <i className="fa fa-times"></i>
                ) : (
                    <i className="fa fa-bars"></i>
                )}
            </button>
            
        </nav>
    )
}

export default Navbar
