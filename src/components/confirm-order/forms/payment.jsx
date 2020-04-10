import {useContext} from "react";
import MainContext from "../../../context/cart-context";
import React from "react";
import {api} from "../../../utils/request";
import {calculateDiscount, loaderDisplay} from "../../../utils/methods";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentForm = ({formType}) => {
    let context = useContext(MainContext);
    let {orderConfirmInfo, messages, handleUpdateMainState, cart} = context;
    let {total} = cart;
    total = parseFloat(total);

    const handleFieldChange = (e) => {
        let {value, name} = e.target;

        orderConfirmInfo[formType][name] = value;
        handleUpdateMainState({orderConfirmInfo, messages});
    };

    const validateCoupon = () => {
        let {email} = orderConfirmInfo.customer;
        let {coupon} = orderConfirmInfo.payment;
        if (coupon && email) {
            api(`coupon-validate/${coupon}/${email}`, 'GET', {})
                .then(res => {
                    if (res.success) {
                        let disc = res.data;
                        // let grossTotal = total + parseFloat(delivery_charges);

                        if (disc.discount_type === 'amount' && disc.discount > total) {
                            disc.discount = total;
                        }

                        cart.discount = disc;

                        messages.status = true;
                        messages.type = 'success';
                        messages.text = `Congrats!! You got ${calculateDiscount(total, cart.discount)}$ discount.`;
                        handleUpdateMainState({messages, cart})
                    }
                })
                .catch(err => {
                    loaderDisplay('none');
                    messages.status = true;
                    messages.type = 'error';
                    messages.text = `Oops!! Seems, You already used "${coupon}" coupon, Try another coupon`;
                    handleUpdateMainState({messages})
                })
        } else {
            messages.status = true;
            messages.type = 'error';
            messages.text = "First add coupon and email";
            handleUpdateMainState({messages})
        }
    };

    return (
        <div className="contant-frame">
            <h3 className="light">Payment Summary</h3>
            <div className="row margin-bottom">

            </div>

            <div className="row">
                <div className="col-sm-8">
                    <label className="input">
                        <i className="icon-prepend fa fa-calendar"/>
                        <input
                            value={orderConfirmInfo.payment.coupon}
                            onChange={handleFieldChange}
                            type="text" name="coupon" placeholder="Use Coupon"/>
                    </label>
                </div>
                <div className="col-sm-4">
                    <button onClick={validateCoupon} type="button" className="btn-submit button hoverable btn-validate"><div className={'anim'}/> validate Coupon</button>
                </div>
            </div>

            <div className="row">
                {!orderConfirmInfo.payment.paid ? (
                    <PayPalButton
                        amount={total}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {
                            // debugger;
                            // alert("Transaction completed by " + details.payer.name.given_name);

                            handleFieldChange({target: {name: 'transactionInfo', value: details}});
                            handleFieldChange({target: {name: 'paid', value: total}});

                            localStorage.setItem('orderConfirmInfo', JSON.stringify(orderConfirmInfo));

                            // OPTIONAL: Call your server to save the transaction
                            // return fetch("/paypal-transaction-complete", {
                            //     method: "post",
                            //     body: JSON.stringify({
                            //         orderID: data.orderID
                            //     })
                            // });
                        }}
                    />
                ) : (
                    <h1 style={{marginLeft: '40px', marginTop: '100px'}}>Order paid amount ${orderConfirmInfo.payment.paid}</h1>
                )}

                {/*<div className="col-sm-12">*/}
                    {/*<label className="input">*/}
                        {/*<i className="icon-prepend fa fa-user"/>*/}
                        {/*<input*/}
                            {/*value={orderConfirmInfo.payment.account_holder_name}*/}
                            {/*onChange={handleFieldChange}*/}
                            {/*type="text" name="account_holder_name" placeholder="Account Holder Name"/>*/}
                    {/*</label>*/}
                {/*</div>*/}
            </div>
            {/*<div className="row">*/}
                {/*<div className="col-sm-12">*/}
                    {/*<label className="input">*/}
                        {/*<i className="icon-prepend fa fa-credit-card"/>*/}
                        {/*<input*/}
                            {/*value={orderConfirmInfo.payment.card_number}*/}
                            {/*onChange={handleFieldChange}*/}
                            {/*type="text" name="card_number" placeholder="Card Number"/>*/}
                    {/*</label>*/}
                {/*</div>*/}
            {/*</div>*/}
            {/*<div className="row">*/}
                {/*<div className="col-sm-4">*/}
                    {/*<label className="input">*/}
                        {/*<i className="icon-prepend fa fa-calendar"/>*/}
                        {/*<input*/}
                            {/*value={orderConfirmInfo.payment.month}*/}
                            {/*onChange={handleFieldChange}*/}
                            {/*type="text" name="month" placeholder="Month"/>*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="col-sm-4">*/}
                    {/*<label className="input">*/}
                        {/*<i className="icon-prepend fa fa-calendar"/>*/}
                        {/*<input*/}
                            {/*value={orderConfirmInfo.payment.year}*/}
                            {/*onChange={handleFieldChange}*/}
                            {/*type="text" name="year" placeholder="Year"/>*/}
                    {/*</label>*/}
                {/*</div>*/}
                {/*<div className="col-sm-4">*/}
                    {/*<label className="input">*/}
                        {/*<i className="icon-prepend fa fa-cc"/>*/}
                        {/*<input*/}
                            {/*value={orderConfirmInfo.payment.cvv}*/}
                            {/*onChange={handleFieldChange}*/}
                            {/*type="text" name="cvv" placeholder="CVV"/>*/}
                    {/*</label>*/}
                {/*</div>*/}
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*<div className="col-sm-4">*/}
            {/*<label className="input">*/}
            {/*<i className="icon-prepend fa fa-codiepie"/>*/}
            {/*<input*/}
            {/*value={orderConfirmInfo.payment.coupon}*/}
            {/*onChange={handleFieldChange}*/}
            {/*type="text" name="coupon" placeholder="Use coupon"/>*/}
            {/*</label>*/}
            {/*</div>*/}
            {/*</div>*/}

            {/*<iframe src={'https://direct.tranzila.com/food2you/iframenew.php?sum=5&currency=1&cred_type=1&tranmode=AK'}/>*/}

        </div>
    );
};

export default PaymentForm;
