import React, {useContext} from 'react';
import ReactModal from "react-modal";
import MainContext from './../../../context/cart-context';
import {api} from "../../../utils/request";
import {navigate} from "../../shared/services";
import {loaderDisplay} from "../../../utils/methods";
import {withRouter} from 'react-router-dom';
import {calculateItemPrice, subitemNames} from "../services/methods";

const ConfirmModal = props => {
    const context = useContext(MainContext);
    let {messages, handleUpdateMainState} = context;

    let {items, delivery_charges} = context.cart;

    const handleCloseModal = () => {
        let showConfirmOrderModal = false;
        context.handleUpdateMainState({showConfirmOrderModal});
    };

    const handleSubmit = () => {
        let {restaurant} = context;
        restaurant.categories = null;
        restaurant.tags = null;
        // restaurant

        api('/orders', 'post', {
            ...context.orderConfirmInfo.customer,
            ...context.orderConfirmInfo.delivery,
            ...context.orderConfirmInfo.payment,
            items: context.cart.items,
            total: context.cart.total,
            delivery_charges: context.cart.delivery_charges,
            lat: context.find.location.latitude,
            lng: context.find.location.longitude,
            language: 'en',
            restaurant
        }).then(res => {
            messages.text = "Order completed";
            messages.status = true;
            handleUpdateMainState({messages});
            navigate(props, '/thankyou');
            console.log(res);
        }).catch(error => {
            messages.text = "Internal Server Error";
            messages.status = true;
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
                                                            <h3 className="title light">Grand Total</h3>
                                                        </div>
                                                        <div className="col-md-6 col-xs-6">
                                                            <h3 className="nis light">{parseFloat(context.cart.total) + parseFloat(delivery_charges)} $</h3>
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