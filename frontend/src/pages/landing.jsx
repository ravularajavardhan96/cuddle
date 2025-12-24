import React from "react";
import {Link} from 'react-router-dom';

// import  '../App.css';

export default function LandingPage(){
    // const theme = useContext(authContext);
    return(
        
       <div className="landingPageContainer">
        
        <nav>
            <div className="navHeader">
                <h2>Apna Video Call</h2>
            </div>
            <div className="navList">
            <Link to="/auth">Join as guest</Link>
             <Link to="/auth">Register</Link>
            <Link to="/auth">Login</Link>
           
            {/* <p>Register</p> */}
            {/* <button>Login</button> */}
            </div>
        </nav>

        <div className="landingMainContainer">
            <div>
                <h2><span style={{color:"orange"}}>Connect</span> with your</h2>
                <h2>   Loved ones</h2>
                <p>Cover a distance by Cuddle call</p>
                <div role="button"><Link to={"/auth"}>Get Started</Link></div>
            </div>
            <div><img src="/mobile.png" alt="" /></div>
        </div>
       </div>
    )
}