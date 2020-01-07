import {useContext} from "react";
import MainContext from "../../../context/cart-context";
import React from "react";
import axios from 'axios';
import {BASE_API_URL} from "../../../utils/globals";

const CustomerForm = ({formType}) => {
    let context = useContext(MainContext);
    let {orderConfirmInfo} = context;

    const handleFieldChange = (e) => {
        let {orderConfirmInfo, handleUpdateMainState} = context;

        orderConfirmInfo[formType][e.target.name] = e.target.value;

        handleUpdateMainState({orderConfirmInfo});
    };

    const fetchUserInfo = () => {
        axios.get(`${BASE_API_URL}/fetch-user-by-email/${orderConfirmInfo.customer.email}`)
            .then(res => {
                if (res.data.success) {
                    const {user} = res.data.data;
                    orderConfirmInfo.customer.user_name = user.user_name || '';
                    orderConfirmInfo.customer.contact = user.concat || '';

                    if (user.delivery_addresses) {
                        const delivery_address = user.delivery_addresses[0];
                        orderConfirmInfo.delivery.delivery_address = delivery_address.delivery_address || '';
                        orderConfirmInfo.delivery.building_no = delivery_address.building_no || '';
                        orderConfirmInfo.delivery.apt_no = delivery_address.apt_no || '';
                        orderConfirmInfo.delivery.entrance_no = delivery_address.entrance_no || '';
                        orderConfirmInfo.delivery.floor_no = delivery_address.floor_no || '';
                    }

                    context.handleUpdateMainState({orderConfirmInfo});
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="contant-frame">

            <h3 className="light">Customer Info</h3>
            <div className="row">
                <div className="col-sm-6">
                    <label className="input">
                        <i className="icon-prepend fa fa-user"/>
                        <input
                            value={orderConfirmInfo.customer.user_name}
                            onChange={handleFieldChange}
                            type="text"
                            name="user_name"
                            placeholder="First name"
                        />
                    </label>
                </div>
                <div className="col-sm-6">
                    <label className="input">
                        <i className="icon-prepend fa fa-user"/>
                        <input
                            value={orderConfirmInfo.customer.last_name}
                            onChange={handleFieldChange}
                            type="text"
                            name="last_name"
                            placeholder="Last name"
                        />
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <label className="input">
                        <i className="icon-prepend fa fa-envelope-o"/>
                        <input
                            value={orderConfirmInfo.customer.email}
                            onChange={handleFieldChange}
                            onBlur={fetchUserInfo}
                            type="email"
                            name="email"
                            placeholder="E-mail"
                        />
                    </label>
                </div>
                <div className="col-sm-6">
                    <label className="input">
                        <i className="icon-prepend fa fa-phone"/>
                        <input
                            value={orderConfirmInfo.customer.contact}
                            onChange={handleFieldChange}
                            type="tel"
                            name="contact"
                            placeholder="Phone"
                            data-mask="(999) 999-9999"
                        />
                    </label>
                </div>
            </div>

        </div>
    );
};

export default CustomerForm;