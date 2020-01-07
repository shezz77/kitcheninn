import React from 'react';
import {LANGUAGES} from "../utils/globals";

export default React.createContext({
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
            pickup_time: '',
            pickup_time_type: '',
            street_name: '',
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
    term: false,

    handleUpdateMainState: object => {},
    updateCartStateFromLocalStorage: object => {}
});
