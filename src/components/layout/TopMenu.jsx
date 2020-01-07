import React, {useContext} from 'react';
import Food2YouWhite from './../../assets/images/Food2You logo.png';
import AppContext from './../../context/cart-context';
// import {LANGUAGES} from "../../utils/globals";

const TopMenu = () => {
    const context = useContext(AppContext);
    const {layout} = context;

    const handleRedirect = () => {
        let hostname = window.location.hostname;
        if (hostname === "en.food2you.com"){
            window.location.href = 'http://food2you.com';
        } else {
            window.location.href = 'http://kitcheninns.com';
        }

    };

    return (
        <nav className="navbar mainmenu-area" data-spy="affix" data-offset-top="200">
            <div className="container">
                <div className="navbar-header">
                    <button onClick={handleRedirect} type="button" className="navbar-toggle">
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>

                    <a className="logo" href="#f2u"><img src={Food2YouWhite} alt=""/></a>
                </div>
                <div className="collapse navbar-collapse" id="mainmenu">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="active"><a href="/">Home</a></li>
                        <li><a href="#service-page">Our booking experience</a></li>
                        {/*<li><a onClick={handleRedirect} href="#f2u">{layout.language}</a></li>*/}
                    </ul>
                </div>
            </div>
        </nav>
    );

};

export default TopMenu;
