import React, {useContext} from 'react';
import AppContext from './../../context/cart-context';
import {navigate} from "../shared/services";
import {withRouter} from 'react-router-dom';
// import {calculateDistance} from "../../utils/methods";
import {processRestaurantActiveStatus} from "./services/methods";
import {RESTAURANT_AVAILIBILITY} from "../../utils/globals";
// import {calculateDistance} from "../../utils/methods";

const Restaurant = props => {
    let {restaurant} = props;
    const context = useContext(AppContext);
    const {updateCartStateFromLocalStorage} = context;
    let availableStatus = processRestaurantActiveStatus(restaurant);

    const navigateToOrder = () => {
        if (restaurant.distance > 10) {
            alert('Sorry! We are not offering above 10km');
            return  false;
        }

        if (availableStatus.includes(RESTAURANT_AVAILIBILITY.CLOSED) || availableStatus === RESTAURANT_AVAILIBILITY.COMING_SOON || availableStatus === RESTAURANT_AVAILIBILITY.PERMANENT_CLOSED) {
            return false;
        }

        localStorage.removeItem('cart');
        updateCartStateFromLocalStorage();

        context.handleUpdateMainState({
            cart: {
                isCashed: false,
                item: null,
                items: [],
                delivery_charges: 0,
                discount: 0,
                total: 0
            }
        });

        navigate(props, `/restaurants/order/${restaurant.id}`);
    };

    return (
        <li className={'hoverable'}>
            <div className="text-holder" onClick={navigateToOrder}>
                <div className="row">
                    <div className="col-md-2 col-sm-2 col-xs-2 center-content">
                        <div className="logo-container">
                            <img className="rest_img"
                                 src={restaurant.logo} alt="sa"/>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-5 col-xs-5">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <h2>{restaurant.name_en}</h2>
                                <p className="detail">{restaurant.address_en}</p>
                                <p className="detail">{restaurant.tags && (
                                    restaurant.tags.map((tag) => (
                                        `${tag.name_en}`
                                    )).toString()
                                )} </p>
                                <div className={'row'}>
                                    <div className={'col-xs-12'}>
                                        <p className="detail">{restaurant.kashruts && (
                                            restaurant.kashruts.map((kashrut) => (
                                                `${kashrut.name_en}`
                                            )).toString()
                                        )} </p>
                                        <img className={'newLogo'} src={restaurant.kashruts[0] ? restaurant.kashruts[0].image : null} alt={''}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-5 col-xs-5" style={{paddingLeft: '0'}}>
                        <ul className={'newList'}>
                            <li>
                                <i className={'fa fa-money'}/>
                                <p><em/>Min. order {restaurant.min_amount}$</p>
                            </li>
                            <li>
                                <div className={'row'}>
                                    <div className={'col-xs-7'}>
                                        <i className={'fa fa-map-marker'}/>
                                        {/*<p>Distance {(calculateDistance(find.location.latitude, find.location.longitude ,restaurant.lat, restaurant.lng, 'K')).toFixed(1)} km</p>*/}
                                        <p>Distance {restaurant.distance} km</p>
                                    </div>
                                    <div className={'col-xs-5'}>
                                        <span className={availableStatus === RESTAURANT_AVAILIBILITY.OPEN ? 'info-txt pull-right' : 'info-txt pull-right grey'}>{availableStatus}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        {/*<a className="btn-view button hoverable"  href={'#sa'}><div className={'anim'}/> Order Now</a>*/}
                    </div>
                </div>
            </div>
        </li>
    )

};

export default withRouter(Restaurant);