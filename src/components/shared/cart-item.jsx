import React, {useContext} from 'react';
import {calculateItemPrice, calculateItemsGrandTotalPrice, subitemNames} from "../order/services/methods";
import CartContext from './../../context/cart-context';


const CartItem = props => {
    let context = useContext(CartContext);

    let {cartItem} = props;

    const handleQuantity = qty => {
        let {cartItemIndex} = props;
        let {cart} = context;

        if(qty <= 0){
            cart.items.splice(cartItemIndex, 1);
        } else {
            cart.items[cartItemIndex].quantity = qty;
        }

        cart.total = calculateItemsGrandTotalPrice(cart.items);

        cart.isCashed = true;
        localStorage.setItem('cart', JSON.stringify(cart));

        context.handleUpdateMainState({cart});
    };

    const handleRemoveCartItem = () => {
        let {cartItemIndex} = props;
        let {cart} = context;

        cart.items.splice(cartItemIndex, 1);

        cart.total = calculateItemsGrandTotalPrice(cart.items);

        cart.isCashed = true;
        localStorage.setItem('cart', JSON.stringify(cart));
        context.handleUpdateMainState({cart});
    };

    const isPayment = (payment) => {
        return !!(payment.transactionInfo && payment.transactionInfo.status === 'COMPLETED');
    }

    return (
        <div className="order-item add">
            <div className="row no-gutters">
                <div className="col-xs-6">
                    <section className="qty-section">
                        <button disabled={isPayment(context.orderConfirmInfo.payment)} onClick={() => handleQuantity(cartItem.quantity - 1)} type="button" className="btn btn-sm">
                            <i className="fa fa-minus"/>
                        </button>
                        <span className="f-11"><b className="ng-binding">{cartItem.quantity}</b></span>
                        <button disabled={isPayment(context.orderConfirmInfo.payment)} onClick={() => handleQuantity(cartItem.quantity + 1)} type="button" className="btn btn-sm">
                            <i className="fa fa-plus"/>
                        </button>
                    </section>
                </div>
                <div className="col-xs-6">
                    <div className="row no-gutters">

                            <a onClick={handleRemoveCartItem} className="remove new"
                               href="#sa">
                                <i className="fa fa-times" aria-hidden="true"/>
                            </a>
                        <a className="f black amount">{calculateItemPrice(cartItem)} $</a>
                        <div>
                            <h5 className="f black short-txt">{cartItem.name_en}</h5>
                            <p className={'short-txt'}>{subitemNames(cartItem)}</p>
                        </div>



                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartItem;
