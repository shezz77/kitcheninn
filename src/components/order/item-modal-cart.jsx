import React, {useContext} from 'react';
import {calculateItemPrice, calculateItemsGrandTotalPrice} from './services/methods';
import CartContext from './../../context/cart-context';

const ItemModalCart = props => {
    let context = useContext(CartContext);
    let { item, cart, messages } = context;

    const handleAdToCart = () => {
        let itemPrice = calculateItemPrice(item);

        if ( parseFloat(itemPrice) <= 0.0) {
            messages.status = true;
            messages.type = 'error';
            messages.text = 'Item price must be greater than 0';
            context.handleUpdateMainState(messages);
            return true;
        }

        item = JSON.parse(JSON.stringify(item));
        item.quantity = 1;
        cart.items.push(JSON.parse(JSON.stringify(item)));
        cart.total = calculateItemsGrandTotalPrice(cart.items);

        cart.isCashed = true;
        localStorage.setItem('cart', JSON.stringify(cart));

        context.handleUpdateMainState({showChoicesModal: false, cart});
    };

    const handleSpecialRequest = e => {
        item.special_request = e.target.value;
        context.handleUpdateMainState({item});
    };

    return (
        <div className="modal-footer">
            <div className="row no-gutters">
                <div className="col-xs-2">
                    <h2 style={{fontSize: '14px'}} className="f black pull-left"> total {calculateItemPrice(item)} $</h2>
                </div>
                <div className="col-xs-6">
                    <textarea value={item.special_request} onChange={handleSpecialRequest} placeholder={'Special Request'} className={'form-control'}/>
                    <span style={{fontSize: '10px', float: 'left'}}>We will try to accommodate special requests but can't held responsible</span>
                </div>
                <div className="col-xs-4">

                    <button onClick={handleAdToCart} className="btn-cart f white button hoverable" type="button"><div className={'anim'}/>add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ItemModalCart;