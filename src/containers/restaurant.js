import React, {Component} from 'react';
import './../assets/css/baron.css';
import './../assets/css/order.css';
import './../assets/css/resturant.css';
import AppIcon from './../assets/images/AppIcon.png';
import Layout from "../hoc/Layout";
import RestaurantList from './../components/restaurant';
import MainContext from './../context/cart-context';
import TagIndex from './../components/shared/tags';
import {api} from "../utils/request";
import {LANGUAGES} from "../utils/globals";
import {withRouter} from 'react-router-dom';
import Search from "../components/restaurant/search";
import {calculateDistance} from "../utils/methods";
import {navigate} from "../components/shared/services";
import {
    isMobile
  } from "react-device-detect";


class Restaurant extends Component {
    static contextType = MainContext;

    componentDidMount = () => {
        this.fetchRestaurants();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {orderConfirmInfo, find} = this.context;
        if (orderConfirmInfo.payment.transactionInfo && orderConfirmInfo.payment.transactionInfo.status === 'COMPLETED') {

            navigate(this.props, '/confirm-order');
        }
    }

    fetchRestaurants = () => {
        const {find} = this.context;
        const {lat, lon} = this.props.location.state;
        // const {city} = this.props.match.params;
        // const {search} = this.props.location;
        let url = '';

        // if (find.searchKey) {
        //     url = `/restaurants-by-city/${1}/${day}?language=en&searchKey=${find.searchKey}`;
        // } else  {
        //     url = `/restaurants-by-city/${1}/${day}?language=en`;
        // }

        if (find.searchKey) {
            url = `/restaurants?language=en&searchKey=${find.searchKey}`;
        } else  {
            url = `/restaurants?language=en`;
        }
        // debugger;

        api(url, 'get')
            .then(res => {

                let restaurants = res.data.restaurants ? res.data.restaurants.map(restaurant => ({...restaurant, distance: (calculateDistance(lat, lon ,restaurant.lat, restaurant.lon, 'K')).toFixed(1)})) : [];
                // debugger;
                if (restaurants.length) {
                    restaurants = restaurants.sort((a, b) => (parseFloat(a.distance) > parseFloat(b.distance)) ? 1 : -1);
                    // restaurants = restaurants.filter(rest => rest.distance <= 10);
                }

                this.context.handleUpdateMainState({
                    restaurants,
                    tags: res.data.tags,
                    kashruts: res.data.kashruts
                })
            })
    };


    render() {
        return (
            <Layout>
                <div>
                    <div className="contant">
                        <div className="getapp">
                        {!isMobile && (

                            <div className="container  ">
                                <a className='show_app' href="#sa"><img alt="" src={AppIcon}/> Get the App</a>
                            </div>
                        )}
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                {/*<div className="col-sm-4">*/}
                                {/*    <Search*/}
                                {/*        fetchRestaurants={this.fetchRestaurants}*/}
                                {/*    />*/}
                                {/*    <div className="sidebar">*/}
                                {/*        <TagIndex/>*/}
                                {/*        /!* <KashrutIndex/> *!/*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <RestaurantList/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const WrappedClass = withRouter(Restaurant);

WrappedClass.WrappedComponent.contextType = MainContext;

export default WrappedClass;
