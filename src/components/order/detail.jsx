import React, {useContext} from 'react';
import MainContext from './../../context/cart-context';

const RestaurantDetailHeader = () => {
    let context = useContext(MainContext);
    let {restaurant} = context;

    return (
        <div className="row">
        <div className="col-sm-12">
            <ul className="resturant-list order">
                <li>
                    <div className="text-holder">
                        <div className="row row-eq-height">
                            <div className="col-md-2 col-sm-2 col-xs-2 center-content">
                                <div className="logo-container">
                                    <img alt="" className="rest_img" src={restaurant.logo}/>
                                </div>
                            </div>
                            <div className="col-md-10 col-sm-10 col-xs-10 verticaly-center">
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <h2>{restaurant ? restaurant.name_en : ''}</h2>
                                        <ul className="list">
                                            <li><a href="#sa">{restaurant.address_en}</a></li><br/>
                                            <li>{restaurant.tags && (
                                                restaurant.tags.map((tag) => (
                                                    `${tag.name_en}`
                                                )).toString()
                                            )}</li><br/>
                                            <li>{restaurant.kashruts && (
                                                restaurant.kashruts.map((kashrut) => (
                                                    `${kashrut.name_en}`
                                                )).toString()
                                            )}</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    </div>
    
    );
};

export default RestaurantDetailHeader;