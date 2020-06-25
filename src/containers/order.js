import React from 'react';

import Layout from "../hoc/Layout";
import AppIcon from './../assets/images/AppIcon.png';
import RestaurantDetailHeader from './../components/order/detail';
import CategoryList from './../components/order/category-list';
import FoodCart from './../components/shared/food-cart';
import ReactModal from 'react-modal';
import ItemModal from "../components/order/item-modal";
import MainContext from './../context/cart-context';
import {api} from "../utils/request";
import {navigate} from "../components/shared/services";
import {withRouter} from "react-router-dom";
// import {calculateDeliveryCost, calculateDistance} from "../utils/methods";
// import ChoiceList from "../components/order/choice-list";
// import {calculateItemPrice} from "../components/order/services/methods";

ReactModal.setAppElement('#root');

class OrderContainer extends React.Component {
    static contextType = MainContext;

    componentDidMount() {


        this.restaurant();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {orderConfirmInfo} = this.context;
        if (orderConfirmInfo.payment.transactionInfo && orderConfirmInfo.payment.transactionInfo.status === 'COMPLETED') {

            navigate(this.props, '/confirm-order');
        }
    }

    restaurant = () => {
        let {restaurant_id} = this.props.match.params;
        api(`/restaurants/${restaurant_id}`, 'get')
            .then(res => {
                localStorage.setItem('restaurant', JSON.stringify(res.data));
                this.context.handleUpdateMainState({restaurant: res.data});
                // this.getLocation(res);
            })
    };

    // getLocation = (res) => {
    //     let {find, cart} = this.context;
    //
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) =>  {
    //             const {latitude, longitude} = position.coords;
    //             const distance = calculateDistance(latitude, longitude, res.data.lat, res.data.lng, 'K');
    //             cart.delivery_charges = calculateDeliveryCost(distance);
    //             find.location.latitude = latitude;
    //             find.location.longitude = longitude;
    //             this.context.handleUpdateMainState({restaurant: res.data, find, cart});
    //         });
    //     } else {
    //         console.log('second', res.data);
    //         find.location.message = "Geolocation is not supported by this browser.";
    //         this.context.handleUpdateMainState({restaurant: res.data, find, cart});
    //     }
    //
    //
    // };


    render() {
        return (
            <Layout {...this.props}>
                <div className="contant">

                    <div className="getapp">
                        <button className={'back-button'} onClick={() => this.props.history.goBack()}>
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"/>
                        </button>
                        <div className="container">
                            <a href="https://apps.apple.com/us/app/kitcheninns/id1495725627?ls=1"><img alt="" src={AppIcon}/> Get the App</a>
                        </div>
                    </div>
                    <div className="container">

                       <RestaurantDetailHeader
                           restaurant={this.context.restaurant}
                       />

                        <section className="block">
                            <div className="row no-gutters">
                                {this.context.restaurant && (
                                    <CategoryList
                                        restaurant={this.context.restaurant}
                                        handleUpdateMainState={this.context.handleUpdateMainState}
                                    />
                                )}


                                <FoodCart/>
                            </div>
                        </section>


                    </div>
                </div>

                <div>
                    <ReactModal
                        isOpen={this.context.showChoicesModal}
                        contentLabel="Minimal Modal Example"
                    >
                        <ItemModal/>
                    </ReactModal>
                </div>
            </Layout>
        );
    }
}


export default withRouter(OrderContainer);