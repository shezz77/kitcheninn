import React, {useEffect, useContext} from 'react';
// import logo from './../assets/images/logo.png';
import Autocomplete from 'react-google-autocomplete';
import AppContext from "../context/cart-context";
import {navigate} from "../components/shared/services";
import {withRouter} from "react-router-dom";
// import Geocode from "react-geocode";
import Layout from "../hoc/Layout";
import moment from "moment";

const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

const Home2 = (props) => {
    localStorage.removeItem('find');
    const context = useContext(AppContext);
    let { find, orderConfirmInfo } = context;

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const choices = new window.Choices('[data-trigger]', {
            searchEnabled: false,
            itemSelectText: '',
        });

    }, []);

    const handleCityChange = placeObject => {
        find.location.google_places_object = placeObject;
        let value = placeObject.name || placeObject.formatted_address;
        let lat = placeObject.geometry.location.lat();
        let lng = placeObject.geometry.location.lng();
        find.location.latitude = lat;
        find.location.longitude = lng;
        find.city = value;
        find.location.address = placeObject.formatted_address;
        orderConfirmInfo.delivery.delivery_address = `${value}, ${placeObject.formatted_address}`;

        context.handleUpdateMainState({ find, orderConfirmInfo });
    };

    // const handleMyLocation = () => {
    //     Geocode.fromLatLng(find.location.latitude, find.location.longitude).then(
    //         response => {
    //             find.city = response.results[0].formatted_address;
    //             find.location.address = find.city;
    //             orderConfirmInfo.delivery.delivery_address = find.city;
    //             context.handleUpdateMainState({ find, orderConfirmInfo });
    //         },
    //         error => {
    //             console.error(error);
    //         }
    //     );
    // };

    const handleChange = e => {
        let { find } = context;
        const {name, value} = e.target;
        find[name] = value;
        context.handleUpdateMainState({ find });
    };

    const handleFindRestaurantBtn = () => {
        const { find } = context;

        // if (!find.day || !find.city) {
        //     alert('Please select day and address to proceed!');
        //     return false;
        // }

        // let validDay = true;
        // let validDayMessage = 'You cannot order today, Please make sure order 2 day before!';
        // let unavailableDays = [
        //     moment().format('dddd'),
        //     moment().add(1, 'days').format('dddd'),
        // ];

        // for (let dayInstance of unavailableDays) {
        //     if (dayInstance === find.day) {
        //         validDay = false;
        //     }
        // }

        // if (!validDay) {
        //     alert(validDayMessage);
        //     return false;
        // }

        const {latitude, longitude} = context.find.location;
        localStorage.setItem('find', JSON.stringify(find));
        navigate(props, `/restaurants`);
    };

    return (
        <Layout homeHeader={true}>
        <div className="foodapp">
            <form>
                <div className="inner-form">
                    {/* <div className="input-field first-wrap">
                        <div className="input-select">
                            <select name="day" onChange={handleChange} data-trigger="">
                                <option value=''>Select Day</option>
                                {DAYS.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                    </div> */}
                    <div className="input-field second-wrap">
                        <Autocomplete
                            defaultValue={find.location.address}
                            className={'form-control'}
                            style={{width: '100%', height: '67px', border: 'none', padding: '15px'}}
                            onPlaceSelected={handleCityChange}
                            placeholder={'Please enter your address'}
                            types={[]}
                            componentRestrictions={{country: "au"}}
                        />
                        {/*<input name="city" onChange={handleChange} id="search" type="text" placeholder="Enter Keywords?"/>*/}
                    </div>
                    <div className="input-field third-wrap">
                        <button onClick={handleFindRestaurantBtn} className="btn-search" type="button">
                            <svg className="svg-inline--fa fa-search fa-w-16" aria-hidden="true" data-prefix="fas"
                                 data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        </Layout>
    );
};

export default withRouter(Home2);