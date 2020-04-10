import React, {Component} from 'react';
import './../assets/css/baron.css';
import './../assets/css/order.css';
import './../assets/css/resturant.css';

import AppIcon from './../assets/images/AppIcon.png';
import Layout from "../hoc/Layout";
import RestaurantList from './../components/restaurant';
import MainContext from './../context/cart-context';
import TagIndex from './../components/shared/tags';
import KashrutIndex from './../components/shared/kashruts';
import {api} from "../utils/request";
import {LANGUAGES} from "../utils/globals";
import {withRouter} from 'react-router-dom';
// import {sort} from "../utils/methods";
import Search from "../components/restaurant/search";


class Restaurant extends Component {

    componentDidMount = () => {
        this.fetchRestaurants();
    };

    fetchRestaurants = () => {
        const {find} = this.context;
        const {city, day} = this.props.match.params;
        // const {city} = this.props.match.params;
        // const {search} = this.props.location;
        let url = '';

        if (find.searchKey) {
            url = `/restaurants-by-city/${city}/${day}?language=en&searchKey=${find.searchKey}`;
        } else  {
            url = `/restaurants-by-city/${city}/${day}?language=en`;
        }

        api(url, 'get')
            .then(res => {
                this.context.handleUpdateMainState({
                    restaurants: res.data.restaurants,
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
                                            <KashrutIndex/>
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
