import React,  {useContext} from 'react';
import { withRouter } from 'react-router-dom';
import {navigate} from "../shared/services";
// import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
// import currentLocation from './../../assets/images/current-location.png';

import AppContext from './../../context/cart-context';
import {googleConfigs} from "../../utils/configs";

Geocode.setApiKey(googleConfigs.api_key);

const Find = props => {
    localStorage.removeItem('find');

    const context = useContext(AppContext);
    // let { find, orderConfirmInfo } = context;
    //
    // const handleCityChange = placeObject => {
    //     find.location.google_places_object = placeObject;
    //     let value = placeObject.name;
    //     let lat = placeObject.geometry.location.lat();
    //     let lng = placeObject.geometry.location.lng();
    //     find.location.latitude = lat;
    //     find.location.longitude = lng;
    //     find.city = value;
    //     find.location.address = placeObject.formatted_address;
    //     orderConfirmInfo.delivery.delivery_address = `${value}, ${placeObject.formatted_address}`;
    //
    //     context.handleUpdateMainState({ find, orderConfirmInfo });
    // };
    //
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
    //
    // const handleFindRestaurantBtn = () => {
    //     const { location } = context.find;
    //     const { messages, term } = context;
    //
    //     if (!term) {
    //         messages.status = true;
    //         messages.text = 'Please agree to the term and condition';
    //         context.handleUpdateMainState({messages});
    //
    //         return true;
    //     }
    //
    //     if (!location.address) {
    //         messages.status = true;
    //         messages.text = 'Please select location first';
    //         context.handleUpdateMainState({messages});
    //
    //         return true;
    //     }
    //
    //     localStorage.setItem('find', JSON.stringify(context.find));
    //     navigate(props, `/restaurants/${context.find.city || 'current'}?lat=${location.latitude}&lng=${location.longitude}`)
    // };

    const handleCityChange = e => {
        let { find } = context;
        find.city = e.target.value;

        context.handleUpdateMainState({ find });
    };

    const handleFindRestaurantBtn = () => {
        navigate(props, `/restaurants/${context.find.city}`)
    };

    return (
        <div>
            {/*<div id="mc-form" className="subscrie-form green ">*/}
                {/*<div className="select firstpage">*/}
                    {/*<div style={{color: 'black'}}>*/}
                        {/*<Autocomplete*/}
                            {/*defaultValue={find.location.address}*/}
                            {/*className={'form-control'}*/}
                            {/*style={{width: '100%', height: '67px', border: 'none', padding: '15px'}}*/}
                            {/*onPlaceSelected={handleCityChange}*/}
                            {/*placeholder={'Please enter your address'}*/}
                            {/*types={[]}*/}
                            {/*componentRestrictions={{country: "il"}}*/}
                        {/*/>*/}
                    {/*</div>*/}
                    {/*<span className={'currentLocation'} onClick={handleMyLocation}><img src={currentLocation} alt={''}/></span>*/}
                {/*</div>*/}
                {/*<button  type="submit" className="submit add button hoverable" onClick={handleFindRestaurantBtn}>*/}
                    {/*<div className={'anim'}/>*/}
                    {/*Order Now*/}
                {/*</button>*/}
            {/*</div>*/}

            <div id="mc-form" className="subscrie-form green ">
                <label className="mt10" htmlFor="mc-email" />
                <div className="select">
                    <select name="city" onChange={handleCityChange} value={context.find.city} id="slct">
                        <option>Select City</option>
                        {context.find.cities && (
                            context.find.cities.map((obj, index) => (
                                <option key={index} value={obj.id}>{obj.name_en}</option>
                            ))
                        )}
                    </select>
                </div>
                <button type="submit" className="submit add button hoverable" onClick={handleFindRestaurantBtn}><div className={'anim'}/> FIND RESTAURANT</button>
            </div>
        </div>
    );

};

export default withRouter(Find);
