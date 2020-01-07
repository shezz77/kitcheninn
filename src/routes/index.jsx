import React, {Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import appRoutes from './routes';
import CartContext from "../context/cart-context";
import {BASE_API_URL, LANGUAGES, PICKUP_TIME_TYPE} from "../utils/globals";
import {api} from "../utils/request";
import {navigate} from "../components/shared/services";
import {loaderDisplay} from "../utils/methods";
import axios from 'axios';

class Index extends Component {
    state = {
        layout: {
            language: LANGUAGES.ENGLISH
        },
        cart: {
            isCashed: false,
            item: null,
            items: [],
            delivery_charges: 0,
            discount: 0,
            total: 0
        },
        find: {
            city: '',
            cities: '',
            location: {
                latitude: '',
                longitude: '',
                google_places_object: '',
                address: '',
                message: ''
            },
            searchKey: ''
        },
        contactUs: {
            show: false,
            data: {
                name: '',
                email: '',
                text: ''
            }
        },
        messages: {
            type: 'error',
            status: false,
            text: ''
        },
        restaurant: {},
        restaurants: [],
        tags: [],
        kashruts: [],
        selectedTags: [],
        selectedKashruts: [],
        showChoicesModal: false,
        showLoginModal: false,
        showConfirmOrderModal: false,
        betaModal: false,
        item: {},
        orderConfirmInfo: {
            isCashed: false,
            customer: {
                user_name: '',
                last_name: '',
                email: '',
                contact: ''
            },
            delivery: {
                type: '',
                delivery_address: '',
                address_notes: '',
                building_no: '',
                apt_no: '',
                floor_no: '',
                entrance_no: '',
                street_name: '',
                pickup_time: PICKUP_TIME_TYPE.ASAP,
                pickup_time_type: PICKUP_TIME_TYPE.ASAP
            },
            payment: {
                type: '',
                account_holder_name: '',
                card_number: '',
                month: '',
                year: '',
                cvv: '',
                coupon: ''
            }
        },
        websiteClosedText: '',
        term: false
    };

    componentDidMount() {
        this.fetchSetting();
        this.fetchCities();
        this.getLocation();
        this.updateCartStateFromLocalStorage();
        this.updateOrderConfirmInfoStateFromLocalStorage();
    }

    fetchCities = () => {
        axios.get(`${BASE_API_URL}/cities`)
            .then(res => {
                let {find} = this.state;
                find.cities = res.data.data;
                this.handleUpdateMainState({find});
            })
    };

    // fetch settings from server
    fetchSetting = () => {
        api('settings', 'GET')
            .then(res => {
                if (this.isClosed(res.data)){
                    let websiteClosedText = res.data.find(setting => setting.var === 'reason_en');
                    this.setState({websiteClosedText: websiteClosedText.value}, () => {
                        navigate(this.props, '/closed');
                    });
                }

                loaderDisplay('none');
            })
            .catch(err => {
                loaderDisplay('none');
            })
    };

    isClosed = (settings) => {
        let website_on_off = settings.find(setting => setting.var === 'website_on_off');

        return website_on_off.value === "1";
    };

    updateOrderConfirmInfoStateFromLocalStorage = () => {
        let orderConfirmInfo = localStorage.getItem('orderConfirmInfo');

        if (orderConfirmInfo) {
            orderConfirmInfo = JSON.parse(orderConfirmInfo);
            this.handleUpdateMainState({orderConfirmInfo});
            // console.log(cart);
        }
    };

    updateCartStateFromLocalStorage = () => {
        let cartStorage = localStorage.getItem('cart');
        let restaurantStorage = localStorage.getItem('restaurant');
        let findStorage = localStorage.getItem('find');

        let {cart, restaurant, find} = this.state;

        if (cartStorage) {
            cart = JSON.parse(cartStorage);
        }

        if (restaurantStorage) {
            restaurant = JSON.parse(restaurantStorage);
        }

        if (findStorage) {
            find = JSON.parse(findStorage);
        }

        this.handleUpdateMainState({cart, restaurant, find});

    };

    // fetchCities = () => {
    //         axios.get(`${BASE_API_URL}/cities`)
    //             .then(res => {
    //                 let {find} = this.state;
    //                 find.cities = res.data.data;
    //                 this.handleUpdateMainState({find});
    //             })
    // };

    getLocation = () => {
        let {find} = this.state;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            find.location.message = "Geolocation is not supported by this browser.";
            alert("Geolocation is not supported by this browser.");
        }
        this.setState({find})
    };

    showPosition = (position) =>  {
        let {find} = this.state;
        find.location.latitude = position.coords.latitude;
        find.location.longitude = position.coords.longitude;
        this.setState({find});
    };

    handleUpdateMainState = object => this.setState({...object});

    render() {
        return (
            <CartContext.Provider value={{
                ...this.state,
                handleUpdateMainState: this.handleUpdateMainState,
                updateCartStateFromLocalStorage: this.updateCartStateFromLocalStorage,
                updateOrderConfirmInfoStateFromLocalStorage: this.updateOrderConfirmInfoStateFromLocalStorage
            }}>
                <Switch>
                    {appRoutes.map((route, key) =>
                        <Route
                            key={key}
                            exact
                            {...route}
                        />
                    )}
                </Switch>
            </CartContext.Provider>
        );
    }
}

export default withRouter(Index);
