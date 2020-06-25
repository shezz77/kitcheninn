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


class Restaurant extends Component {
    static contextType = MainContext;

    componentDidMount = () => {
        this.fetchRestaurants();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {orderConfirmInfo} = this.context;
        if (orderConfirmInfo.payment.transactionInfo && orderConfirmInfo.payment.transactionInfo.status === 'COMPLETED') {

            navigate(this.props, '/confirm-order');
        }
    }

    fetchRestaurants = () => {
        const {find} = this.context;
        const {day, lat, lon} = this.props.match.params;
        // const {city} = this.props.match.params;
        // const {search} = this.props.location;
        let url = '';

        // if (find.searchKey) {
        //     url = `/restaurants-by-city/${1}/${day}?language=en&searchKey=${find.searchKey}`;
        // } else  {
        //     url = `/restaurants-by-city/${1}/${day}?language=en`;
        // }

        if (find.searchKey) {
            url = `/restaurants-by-lat-lng?day=${day}&lat=${lat}&lon=${lon}?language=en&searchKey=${find.searchKey}`;
        } else  {
            url = `/restaurants-by-lat-lng?day=${day}&lat=${lat}&lon=${lon}?language=en`;
        }
        // debugger;

        api(url, 'get')
            .then(res => {

                let restaurants = res.data.restaurants ? res.data.restaurants.map(restaurant => ({...restaurant, distance: (calculateDistance(lat, lon ,restaurant.lat, restaurant.lng, 'K')).toFixed(1)})) : [];
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
        const {layout} = this.context;

        if (layout.language === LANGUAGES.ENGLISH) {
            return (
                <Layout>
                    <div>
                        <div className="contant">
                            <div className="getapp">
                                <div className="container">
                                    <a href="#sa"><img alt="" src={AppIcon}/> Get the App</a>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <Search
                                            fetchRestaurants={this.fetchRestaurants}
                                        />
                                        <div className="sidebar">
                                            <TagIndex/>
                                            {/* <KashrutIndex/> */}
                                        </div>
                                    </div>
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
        else{
            return (
                <Layout>
                    <div>
                        <div className="contant">
                            <div className="getapp">
                                <div className="container">
                                    <a href="#sa"> <img alt="" src={AppIcon}/> הורד את האפליקציה   </a>
                                </div>
                            </div>
                            <div className="container">
                                <div className="heading-area">
                                    <h4 className="title">  משלוח מסעדות </h4>
                                    <p> מסעדות המגיעות לעיר {this.context.restaurants.length} מראה </p>
                                </div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <RestaurantList/>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="sidebar">
                                            <TagIndex/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
        }
    }
}

const WrappedClass = withRouter(Restaurant);

WrappedClass.WrappedComponent.contextType = MainContext;

export default WrappedClass;
