import React, {useContext} from 'react';
import CartItem from './cart-item';
import emptyCart from './../../assets/images/empty-cart.png';
import {navigate} from "./services";
import CartContext from './../../context/cart-context';
import {withRouter} from 'react-router-dom';
import {calculateDiscount} from "../../utils/methods";

const FoodCard = props => {
    let context = useContext(CartContext);
    let {restaurant, cart, messages} = context;
    let {items, delivery_charges, discount, total} = cart;
    total = parseFloat(total);
    let min_amount = parseFloat(restaurant.min_amount);

    const navigateToConfirmOrder = () => {
        if (min_amount > total) {
            messages.status = true;
            messages.text = 'Minimum limit is $ 50 for an order Please add your order!';
            context.handleUpdateMainState({messages});
            return false;
        }

        navigate(props,'/confirm-order')
    };

    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div className="cart-holder">
                {items && items.length > 0 ? (
                    <>
                        <header className="gray-header">
                            <h2 className="f black light">Food Cart</h2>
                            <button onClick={navigateToConfirmOrder} className="btn-submit button hoverable" type="button"><div className={'anim'}/> place order</button>

                        </header>

                        <div className="custom-scroll">
                            <div className="frame" id="nested-section">
                                {
                                    items.map((cartItem, index) => (
                                        <CartItem
                                            key={index}
                                            cartItem={cartItem}
                                            cartItemIndex={index}
                                            {...props}
                                        />
                                    ))
                                }

                            </div>

                        </div>

                        <div style={{
                            'position': 'absolute',
                            'left': '15px',
                            'right': '15px',
                            'bottom': '0',
                            'background': '#fff'
                        }} className="wrap">
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
                                                    <h3 className="title light">Discount</h3>
                                                </div>
                                                <div className="col-md-6 col-xs-6">
                                                    <h3 className="nis light">{calculateDiscount(total, discount) }$</h3>
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
                                                    <h3 className="nis light">{total + parseFloat(delivery_charges) - calculateDiscount(total, discount)} $</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) :  (
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="empty-cart">
                                <img src={emptyCart} alt="cart"/>
                                <h3 className="light">Your cart is empty</h3>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default withRouter(FoodCard);
