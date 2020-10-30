import React, {useContext} from "react";
import CustomerForm from "./customer";
import DeliveryFrom from "./delivery";
import PaymentForm from "./payment";
import MainContext from './../../../context/cart-context';
import {validate} from "../../../utils/validation";
import {DELIVERY_TYPES, FIELD_TYPES} from "../../../utils/globals";

const Index = () => {
    const context = useContext(MainContext);
    let {messages, handleUpdateMainState, orderConfirmInfo} = context;

    const handleSubmit = e => {
        e.preventDefault();

        if (context.cart.total <= 0) {
            messages.text = 'Cart is empty, select item before order';
            messages.type = 'error';
            messages.status = true;
            handleUpdateMainState({messages});
            return false;
        }

        const validate = validateForm();

        if (!validate){
            return;
        }

        let showConfirmOrderModal = true;
        context.handleUpdateMainState({showConfirmOrderModal});
    };

    const validateForm = () => {
        let user_name = validate('First Name', orderConfirmInfo.customer.user_name, FIELD_TYPES.TEXT, true);

        if (!user_name.status) {
            messages.text = user_name.message;
            messages.type = 'error';
            messages.status = true;
            handleUpdateMainState({messages});
            return false;
        }

        let last_name = validate('Last Name', orderConfirmInfo.customer.last_name, FIELD_TYPES.TEXT, true);

        if (!last_name.status) {
            messages.text = last_name.message;
            messages.type = 'error';
            messages.status = true;
            handleUpdateMainState({messages});
            return false;
        }

        let email = validate('Email', orderConfirmInfo.customer.email, FIELD_TYPES.EMAIL, true);

        if (!email.status) {
            messages.text = email.message;
            messages.type = 'error';
            messages.status = true;
            handleUpdateMainState({messages});
            return false;
        }

        let contact = validate('Phone', orderConfirmInfo.customer.contact, FIELD_TYPES.NUMBER, true);

        if (!contact.status) {
            messages.text = contact.message;
            messages.type = 'error';
            messages.status = true;
            handleUpdateMainState({messages});
            return false;
        }

        let select_delivery_type = validate('Select delivery type', orderConfirmInfo.delivery.type, FIELD_TYPES.TEXT, true);

        if (!select_delivery_type.status) {
            messages.text = select_delivery_type.message;
            messages.type = 'error';
            messages.status = true;
            handleUpdateMainState({messages});
            return false;
        }

        if (orderConfirmInfo.delivery.type === DELIVERY_TYPES.DELIVERY) {
            let delivery_address = validate('Address', orderConfirmInfo.delivery.delivery_address, FIELD_TYPES.TEXT, true);

            if (!delivery_address.status) {
                messages.text = delivery_address.message;
                messages.type = 'error';
                messages.status = true;
                handleUpdateMainState({messages});
                return false;
            }

            let street_name = validate('Street Number', orderConfirmInfo.delivery.street_name, FIELD_TYPES.TEXT, false);

            if (!street_name.status) {
                messages.text = street_name.message;
                messages.type = 'error';
                messages.status = true;
                handleUpdateMainState({messages});
                return false;
            }

            // let matches = orderConfirmInfo.delivery.street_name.match(/\d+/g);
            // if (matches == null) {
            //     messages.text = 'Street number is not valid';
            //     messages.type = 'error';
            //     messages.status = true;
            //     handleUpdateMainState({messages});
            //     return false;
            // }

            let address_notes = validate('Address Notes', orderConfirmInfo.delivery.address_notes, FIELD_TYPES.TEXT, false);

            if (!address_notes.status) {
                messages.text = address_notes.message;
                messages.type = 'error';
                messages.status = true;
                handleUpdateMainState({messages});
                return false;
            }

            let building_no = validate('Building No', orderConfirmInfo.delivery.building_no, FIELD_TYPES.TEXT, false);

            if (!building_no.status) {
                messages.text = building_no.message;
                messages.type = 'error';
                messages.status = true;
                handleUpdateMainState({messages});
                return false;
            }


            let apt_no = validate('Apartment No', orderConfirmInfo.delivery.apt_no, FIELD_TYPES.TEXT, false);

            if (!apt_no.status) {
                messages.text = apt_no.message;
                messages.type = 'error';
                messages.status = true;
                handleUpdateMainState({messages});
                return false;
            }

            let floor_no = validate('Floor No', orderConfirmInfo.delivery.floor_no, FIELD_TYPES.TEXT, false);

            if (!floor_no.status) {
                messages.text = floor_no.message;
                messages.type = 'error';
                messages.status = true;
                handleUpdateMainState({messages});
                return false;
            }

            let entrance_no = validate('Entrance No', orderConfirmInfo.delivery.entrance_no, FIELD_TYPES.TEXT, false);

            if (!entrance_no.status) {
                messages.text = entrance_no.message;
                messages.type = 'error';
                messages.status = true;
                handleUpdateMainState({messages});
                return false;
            }
        }


        // let paid = validate('Payment paid', orderConfirmInfo.payment.paid, FIELD_TYPES.TEXT, true);
        //
        // if (!paid.status) {
        //     messages.text = paid.message;
        //     messages.type = 'error';
        //     messages.status = true;
        //     handleUpdateMainState({messages});
        //     return false;
        // }

        // Skip card validation because only cash mode
        return true;

        // let card_number = validate('Card No', orderConfirmInfo.payment.card_number, FIELD_TYPES.TEXT, true);
        //
        // if (!card_number.status) {
        //     messages.text = card_number.message;
        //     messages.type = 'error';
        //     messages.status = true;
        //     handleUpdateMainState({messages});
        //     return false;
        // }
        //
        // let month = validate('Month', orderConfirmInfo.payment.month, FIELD_TYPES.TEXT, true);
        //
        // if (!month.status) {
        //     messages.text = month.message;
        //     messages.type = 'error';
        //     messages.status = true;
        //     handleUpdateMainState({messages});
        //     return false;
        // }
        //
        // let year = validate('Year', orderConfirmInfo.payment.year, FIELD_TYPES.TEXT, true);
        //
        // if (!year.status) {
        //     messages.text = year.message;
        //     messages.type = 'error';
        //     messages.status = true;
        //     handleUpdateMainState({messages});
        //     return false;
        // }
        //
        // let cvv = validate('Cvv', orderConfirmInfo.payment.cvv, FIELD_TYPES.TEXT, true);
        //
        // if (!cvv.status) {
        //     messages.text = cvv.message;
        //     messages.type = 'error';
        //     messages.status = true;
        //     handleUpdateMainState({messages});
        //     return false;
        // }
        //
        // return true;
    };

    return (
        <form onSubmit={handleSubmit} className="smart-form">
            <CustomerForm formType={'customer'}/>
            <DeliveryFrom formType={'delivery'}/>
            <PaymentForm formType={'payment'}/>

            <button type="submit" className="btn-submit button hoverable"><div className={'anim'}/> Submit</button>

        </form>
    );
};

export default Index;
