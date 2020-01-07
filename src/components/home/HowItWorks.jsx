import React from 'react';

import GreatIcon from './../../assets/images/GreatIcon.png';
import PickedIcon from './../../assets/images/PickedIcon.png';
import Food2YouLogo2 from './../../assets/images/Food2YouLogo2.png';

const HowItWorks = () => {
    return (
        <section className="section-padding" id="service-page">
            <div className="container">
                <div className="page-title text-center text-white">
                    <h4 className="heading-4 title" title="Why aSaas is much popular"> How It Works</h4>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-4 wow fadeInUp">
                        <div className="single-service">
                            <div className="service-icon">
                                <img alt="" src={PickedIcon}/>
                            </div>
                            <h4 className="title">Picked by foodies</h4>
                            <p>Browse the restaurants and menus to choose something exiting!</p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 wow fadeInLeft">
                        <div className="single-service">
                            <div className="service-icon">
                                <img alt="" src={GreatIcon}/>
                            </div>
                            <h4 className="title">Great restaurants</h4>
                            <p>The restaurants will cook and prepare your meal just the way you like it.</p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 wow fadeInRight">
                        <div className="single-service">
                            <div className="service-icon">
                                <img style={{ maxHeight: '109px' }} alt="" src={Food2YouLogo2}/>
                            </div>
                            <h4 className="title">Delivered on time</h4>
                            <p>Our specialty trained delivery team will bring it fresh out of the oven to your door.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;