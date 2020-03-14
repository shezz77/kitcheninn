import {useContext} from "react";
import MainContext from "../../../context/cart-context";
import React from "react";
import {DELIVERY_TYPES, PICKUP_TIME_TYPE} from "../../../utils/globals";
import {calculateDeliveryCost, calculateDistance} from "../../../utils/methods";
import Autocomplete from 'react-google-autocomplete';

const DeliveryFrom = ({formType}) => {
    let context = useContext(MainContext);
    let {orderConfirmInfo, handleUpdateMainState, find, cart, restaurant} = context;

    const handleFieldChange = (e) => {
        orderConfirmInfo[formType][e.target.name] = e.target.value;
        handleUpdateMainState({orderConfirmInfo});
    };

    const handleDeliveryType = type => {
        let {cart, find, restaurant} = context;
        const {latitude, longitude} = find.location;

        if (type === DELIVERY_TYPES.DELIVERY) {
            const distance = calculateDistance(latitude, longitude, restaurant.lat, restaurant.lng, 'K');
            cart.delivery_charges = calculateDeliveryCost(distance);
        } else {
            cart.delivery_charges = 0;
        }

        orderConfirmInfo.delivery.type = type;
        handleUpdateMainState({orderConfirmInfo, cart});
    };

    const handlePickupTimeType = type => {
        if (type === PICKUP_TIME_TYPE.ASAP) {
            orderConfirmInfo.delivery.pickup_time = PICKUP_TIME_TYPE.ASAP;
        } else {
            orderConfirmInfo.delivery.pickup_time = '';
        }

        orderConfirmInfo.delivery.pickup_time_type = type;
        handleUpdateMainState({orderConfirmInfo});
    };

    const handleAddressChange = placeObject => {
        find.location.google_places_object = placeObject;
        let value = placeObject.name;
        let lat = placeObject.geometry.location.lat();
        let lng = placeObject.geometry.location.lng();
        find.location.latitude = lat;
        find.location.longitude = lng;
        find.city = value;
        find.location.address = placeObject.formatted_address;
        orderConfirmInfo.delivery.delivery_address = `${value}, ${placeObject.formatted_address}`;

        const distance = calculateDistance(lat, lng, restaurant.lat, restaurant.lng, 'K');
        cart.delivery_charges = calculateDeliveryCost(distance);

        context.handleUpdateMainState({ find, orderConfirmInfo });
    };

    return (
        <div className="contant-frame">
            <h3 className="light">Delivery</h3>
            <div className="row margin-bottom">
                <div className="col-sm-6">
                    <label onClick={() => handleDeliveryType(DELIVERY_TYPES.PICKUP_FROM_RESTAURANT)} className="control control--radio">
                        <div className="chek-box-holder">
                            <input type="radio" name="type"/>
                            <div className="control__indicator"/>
                        </div>
                        <p>Pickup from restaurant</p>
                    </label>
                </div>
                <div className="col-sm-6">
                    <label onClick={() => handleDeliveryType(DELIVERY_TYPES.DELIVERY)} className="control control--radio">
                        <div className="chek-box-holder">
                            <input type="radio" name="type"/>
                            <div className="control__indicator"/>
                        </div>
                        <p>Delivery</p>
                    </label>
                </div>
            </div>

            {orderConfirmInfo.delivery.type === DELIVERY_TYPES.DELIVERY && (
                <>
                    <div className="row">
                        <div className="col-sm-12">
                            <label className="input">
                                <i className="icon-prepend fa fa-map-marker"/>
                                <Autocomplete
                                    defaultValue={orderConfirmInfo.delivery.delivery_address}
                                    className={'form-control'}
                                    style={{width: '100%', height: '44px', borderRadius: '8px', borderColor: '#bdbdbd', padding: '19px 38px 24px 44px'}}
                                    onPlaceSelected={handleAddressChange}
                                    placeholder={'Please enter your address'}
                                    types={[]}
                                    componentRestrictions={{country: "au"}}
                                />
                            </label>
                        </div>
                        <div className="col-sm-12">
                            <label className="input">
                                <i className="icon-prepend fa fa-building"/>
                                <input
                                    value={orderConfirmInfo.delivery.street_name}
                                    onChange={handleFieldChange}
                                    type="text"
                                    name="street_name"
                                    placeholder="Enter Street Number"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="input">
                                <i className="icon-prepend fa fa-building"/>
                                <input
                                    value={orderConfirmInfo.delivery.building_no}
                                    onChange={handleFieldChange}
                                    type="text"
                                    name="building_no"
                                    placeholder="Building no"
                                />
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <label className="input">
                                <i className="icon-prepend fa fa-building"/>
                                <input
                                    value={orderConfirmInfo.delivery.apt_no}
                                    onChange={handleFieldChange}
                                    type="text"
                                    name="apt_no"
                                    placeholder="Apt no"
                                />
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <label className="input">
                                <i className="icon-prepend fa fa-first-order"/>
                                <input
                                    value={orderConfirmInfo.delivery.floor_no}
                                    onChange={handleFieldChange}
                                    type="text"
                                    name="floor_no"
                                    placeholder="Floor no"
                                />
                            </label>
                        </div>
                        <div className="col-sm-3">
                            <label className="input">
                                <i className="icon-prepend fa fa-empire"/>
                                <input
                                    value={orderConfirmInfo.delivery.entrance_no}
                                    onChange={handleFieldChange}
                                    type="text"
                                    name="entrance_no"
                                    placeholder="Entrance no"
                                />
                            </label>
                        </div>
                        <div className="col-sm-12">
                            <label className="input">
                                <i className="icon-prepend fa fa-building"/>
                                <input
                                    value={orderConfirmInfo.delivery.address_notes}
                                    onChange={handleFieldChange}
                                    type="text"
                                    name="address_notes"
                                    placeholder="Extra notes for address"
                                />
                            </label>
                        </div>
                    </div>
                </>
            )}

            {orderConfirmInfo.delivery.type === DELIVERY_TYPES.PICKUP_FROM_RESTAURANT && (
                <>
                    <h3 className="light">Pickup Time</h3>
                    <div className="row margin-bottom">
                        <div className="col-sm-6">
                            <label onClick={() => handlePickupTimeType(PICKUP_TIME_TYPE.ASAP)} className="control control--radio">
                                <div className="chek-box-holder">
                                    <input type="radio" name="pick_time_type"/>
                                    <div className="control__indicator"/>
                                </div>
                                <p>ASAP</p>
                            </label>
                        </div>
                        <div className="col-sm-6">
                            <label onClick={() => handlePickupTimeType(PICKUP_TIME_TYPE.CUSTOM)} className="control control--radio">
                                <div className="chek-box-holder">
                                    <input type="radio" name="pick_time_type"/>
                                    <div className="control__indicator"/>
                                </div>
                                <p>Custom</p>
                            </label>
                        </div>
                    </div>

                    {orderConfirmInfo.delivery.pickup_time_type === PICKUP_TIME_TYPE.CUSTOM && (
                        <div className="col-sm-12">
                            <label className="input">
                                <i className="icon-prepend fa fa-building"/>
                                <input
                                    value={orderConfirmInfo.delivery.pickup_time}
                                    onChange={handleFieldChange}
                                    type="text"
                                    name="pickup_time"
                                    placeholder="Pickup time in hours"
                                />
                            </label>
                        </div>
                    ) }
                </>
            )}

        </div>
    );
};

export default DeliveryFrom;
