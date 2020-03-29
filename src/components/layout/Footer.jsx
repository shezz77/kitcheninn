import React, {useContext} from 'react';
import AppContext from './../../context/cart-context';

import Food2YouLogo from './../../assets/images/Food2You logo.png';
import AppStoreIcon from './../../assets/images/app store icon.png';
import PlayStoreIcon from './../../assets/images/google play icon.png';

import ContactUs from '../shared/contact-us';

import {LANGUAGES} from "../../utils/globals";
import {navigate} from "../shared/services";
import {withRouter} from 'react-router-dom';


const Footer = props => {
    const context = useContext(AppContext);
    const {layout, contactUs} = context;

    const showContactUsModal = e => {
        e.preventDefault();
        contactUs.show = true;
        context.handleUpdateMainState({contactUs});
    };


    if (layout.language === LANGUAGES.ENGLISH) {
        return (
            <footer className="footer-area v4" style={{ backgroundImage: "url('images/footer-bg.png')" }}>
                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <a className="logo" href="#sa"><img src={Food2YouLogo} alt="sa"/></a>
                        </div>
                    </div>
                    <hr/>
                    <div className={'footer-widget-area'}>
                        <div className={'widget'}>
                            <ul>
                                <li>
                                    <a onClick={showContactUsModal} href={'#sa'}>Contact Us</a>
                                </li>
                                <li>
                                    <a onClick={e => {e.preventDefault(); navigate(props, '/privacy')}} href={'#sa'}>Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr/>
                    <ul className="app-button">
                        {/*<li><a href="https://itunes.apple.com/us/app/food2you/id1460190975?ls=1&mt=8" target='_blank' rel="noopener noreferrer"><img alt="" src={AppStoreIcon}/></a></li>*/}
                        <li><a href="https://apps.apple.com/us/app/kitcheninns/id1495725627?ls=1" target="_blank"><img alt="" src={AppStoreIcon}/></a></li>
                        <li><a href="https://play.google.com/store/apps/details?id=shezz.kitcheninns.sa&hl=en" target='_blank' rel="noopener noreferrer"><img alt="" src={PlayStoreIcon}/></a></li>
                    </ul>
                </div>
                <ContactUs modalShow={'modalIsOpen'} />
            </footer>
        );
    }
    else {
        return (
            <footer className="footer-area v4" style={{ backgroundImage: "url('images/footer-bg.png')"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <a className="logo" href="#sa"><img src={Food2YouLogo} alt="sa"/></a>
                        </div>
                    </div>
                    <hr />
                    <ul className="app-button">
                        <li><a href="#sa"><img alt="" src={AppStoreIcon}/></a></li>
                        <li><a href="#sa"><img alt="" src={PlayStoreIcon}/></a></li>
                    </ul>
                </div>
            </footer>
        );
    }
};

export default withRouter(Footer);
