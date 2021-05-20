import React from 'react';

import AppIcon from "../../assets/images/AppIcon.png";
import FoodCart from "../shared/food-cart";
import Layout from "../../hoc/Layout";
import FormIndex from "./forms";
import ConfirmModal from "./popups/confirm-modal";
import {
    isMobile
  } from "react-device-detect";

const Index = () => {
    return (
        <Layout>
            <div className="contant">
                <div className="getapp">
                    {!isMobile && (

                    <div className="container">
                        <a href="#sa"><img alt="" src={AppIcon}/> Get the App</a>
                    </div>
                    )}
                </div>
                <div>
                    <div className="row">
                        <div className="col-lg-2">

                        </div>
                        <div className="col-lg-8">
                            <div className="container-fluid">
                                <section className="block">
                                    <div className="no-gutters">
                                            <FormIndex/>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal/>

            
        </Layout>
    );
};

export default Index;
