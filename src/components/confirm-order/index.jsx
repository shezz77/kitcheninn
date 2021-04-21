import React from 'react';

import AppIcon from "../../assets/images/AppIcon.png";
import FoodCart from "../shared/food-cart";
import Layout from "../../hoc/Layout";
import FormIndex from "./forms";
import ConfirmModal from "./popups/confirm-modal";

const Index = () => {
    return (
        <Layout>
            <div className="contant">
                <div className="getapp">
                    <div className="container">
                        <a href="#sa"><img alt="" src={AppIcon}/> Get the App</a>
                    </div>
                </div>
                <div className="container">
                    <section className="block">
                        <div className="row no-gutters">
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <FormIndex/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <ConfirmModal/>

            
        </Layout>
    );
};

export default Index;
