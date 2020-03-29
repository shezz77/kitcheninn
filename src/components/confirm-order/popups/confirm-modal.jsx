import React, {useContext} from 'react';
import ReactModal from "react-modal";
import MainContext from './../../../context/cart-context';
import {api} from "../../../utils/request";
import {navigate} from "../../shared/services";
import {calculateDiscount, loaderDisplay} from "../../../utils/methods";
import {withRouter} from 'react-router-dom';
import {calculateItemPrice, subitemNames} from "../../order/services/methods";
import {DELIVERY_TYPES} from "../../../utils/globals";

const ConfirmModal = props => {
    const context = useContext(MainContext);
    let {messages, handleUpdateMainState, orderConfirmInfo} = context;

    let {items, delivery_charges, discount} = context.cart;

    const handleCloseModal = () => {
        let showConfirmOrderModal = false;
        context.handleUpdateMainState({showConfirmOrderModal});
    };

    const setRulesPayment = payment => {
        return {
            a: '',
            b: payment.card_number,
            c: payment.month,
            d: payment.year,
            e: payment.cvv
        };
    };

    const handleSubmit = () => {
        let {restaurant} = context;
        restaurant.categories = null;
        restaurant.tags = null;
        // restaurant

        let total = context.cart.total;
        let discount_value = 0;
        let coupon_discount = '';

        if (discount) {
            discount_value = calculateDiscount(total, discount);
            coupon_discount = discount.code;
        }
        let delivery_charges= context.cart.delivery_charges;
        let delivery_or_pickup = orderConfirmInfo.delivery.type;

        if (delivery_or_pickup === DELIVERY_TYPES.PICKUP_FROM_RESTAURANT) {
            orderConfirmInfo.delivery.delivery_address = '';
            orderConfirmInfo.delivery.building_no = '';
        } else {
            orderConfirmInfo.delivery.pickup_time = '';
            if (delivery_charges <= 0){
                delivery_charges = 20;
            }
        }

        // console.log({
        //     ...orderConfirmInfo.customer,
        //     ...orderConfirmInfo.delivery,
        //     ...orderConfirmInfo.payment,
        //     items: context.cart.items,
        //     total,
        //     discount_value,
        //     coupon_discount,
        //     delivery_or_pickup,
        //     delivery_charges: context.cart.delivery_charges,
        //     lat: context.find.location.latitude,
        //     lng: context.find.location.longitude,
        //     language: 'en',
        //     restaurant
        // });
        //
        // return true;

        let rules = setRulesPayment(orderConfirmInfo.payment);
        api('/orders', 'post', {
            ...orderConfirmInfo.customer,
            ...orderConfirmInfo.delivery,
            ...orderConfirmInfo.payment,
            ...rules,
            items: context.cart.items,
            total,
            discount_value,
            coupon_discount,
            delivery_or_pickup,
            platform_info: 'en web',
            delivery_charges,
            lat: context.find.location.latitude,
            lng: context.find.location.longitude,
            language: 'en',
            restaurant
        }).then(res => {
            // messages.text = "Order completed";
            // messages.status = true;
            // handleUpdateMainState({messages});

            localStorage.removeItem('restaurant');
            localStorage.removeItem('cart');
            navigate(props, '/thankyou');
        }).catch(error => {
            messages.text = "Incorrect card!!! Please check you credit card info.";
            messages.status = true;
            messages.type = 'error';
            handleUpdateMainState({messages});

            handleUpdateMainState({messages});
            loaderDisplay('none');
        })
    };

    return (
        <ReactModal
            isOpen={context.showConfirmOrderModal}
            contentLabel="Minimal Modal Example"
            className={'confrimOrderPopup'}
        >
            <div className="frame">
                <div className="baron">
                    <div id="scrollable" className="baron__scroller right add">
                        <div className="modal-header">
                            <button onClick={handleCloseModal} className="close" type="button"><span className="f white" aria-hidden="true">×</span></button>
                            <h1>Order Summary</h1>
                        </div>
                        <div className="modal-body">
                            <div className={'popup-text'}>

                                <div className={'order-summary'}>
                                    { items && items.length > 0 ?
                                        items.map((item, index) => (
                                            <div key={index} className={'row'}>
                                                <div className={'col-xs-9'}>
                                                    <h3>{item.name_en}</h3>
                                                    <p>{subitemNames(item)}</p>
                                                </div>
                                                <div className={'col-xs-3'}>
                                                    <p className={'text-right'}>{calculateItemPrice(item)}</p>
                                                </div>
                                            </div>
                                        )) : null
                                    }
                                </div>


                                <div className="wrap">
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <div className="frame">
                                                <div className="minimum-item add">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-6 col-xs-6">
                                                            <h3 className="title light">Delivery Charges</h3>
                                                        </div>
                                                        <div className="col-md-6 col-xs-6">
                                                            <h3 className="nis light">{delivery_charges} $</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xs-12">
                                            <div className="frame">
                                                <div className="minimum-item add">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-6 col-xs-6">
                                                            <h3 className="title light">Total Discount</h3>
                                                        </div>
                                                        <div className="col-md-6 col-xs-6">
                                                            <h3 className="nis light">{calculateDiscount(context.cart.total, discount) }$</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xs-12">
                                            <div className="frame">
                                                <div className="minimum-item add">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-6 col-xs-6">
                                                            <h3 className="title light">Grand Total</h3>
                                                        </div>
                                                        <div className="col-md-6 col-xs-6">
                                                            <h3 className="nis light">{parseInt(context.cart.total) + parseInt(delivery_charges) - calculateDiscount(context.cart.total, discount)} $</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="baron__track">
                        <div className="baron__bar add"/>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <div className="row no-gutters">
                    <div className="col-xs-12">
                        <button onClick={handleSubmit} className="btn-cart f white button hoverable" type="button"><div className={'anim'}/>Confirm Order</button>
                    </div>
                </div>
            </div>

        </ReactModal>
    );
};

export default withRouter(ConfirmModal);
