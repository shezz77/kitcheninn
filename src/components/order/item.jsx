import React, {useContext} from 'react';
import CartContext from "../../context/cart-context";
// import {calculateItemsGrandTotalPrice} from "./services/methods";

const Item = props => {
    const context = useContext(CartContext);

    let { item } = props;
    item = JSON.parse(JSON.stringify(item));

    const handleChoiceModal = () => {
        // let {cart} = context;
        let showChoicesModal = true;

        // if (item.choices.length > 0) {
        //     showChoicesModal = true;
        // } else {
        //     item.quantity = 1;
        //     cart.items.push(item);
        //     cart.total = calculateItemsGrandTotalPrice(cart.items);
        // }

        // cart.isCashed = true;
        // localStorage.setItem('cart', JSON.stringify(cart));
        context.handleUpdateMainState({showChoicesModal, item})
    };

    return (
        <>
            <div className="slide hoverable">
                <div className="add-row" onClick={handleChoiceModal}>
                    <div className="row">
                        <div className="col-xs-8">
                            <h4>{item.name_en}</h4>
                            <p style={{whiteSpace: 'normal'}}>{item.desc_en}</p>
                        </div>
                        <div className="col-xs-4 pull-right">
                            <i className="fa fa-plus-circle img-plus" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Item;