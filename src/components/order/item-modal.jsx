import React, {useContext} from 'react';
import ChoiceList from './choice-list';
import ItemModalCart  from './item-modal-cart';
import CartContext from "../../context/cart-context";

const ItemModal = props => {
    let context = useContext(CartContext);
    let { item } = context;

    const handleOpenModal = () => {
        let {showChoicesModal} = context;
        showChoicesModal = !showChoicesModal;

        context.handleUpdateMainState({showChoicesModal, item})
    };

    return (
        <>
            <div className="frame">
                <div className="baron">
                    <div id="scrollable" className="baron__scroller right add">
                        <div className="modal-header">
                            <button className="close" onClick={handleOpenModal} type="button"><span className="f white" aria-hidden="true">×</span></button>
                            <h1>{item.name_en}</h1>
                            <p>{item.desc_en}</p>
                        </div>
                        <div className="modal-body">

                        <ChoiceList
                            choices={item.choices}
                            {...props}
                        />

                        </div>
                    </div>
                    <div className="baron__track">
                        <div className="baron__bar add"/>
                    </div>
                </div>
            </div>

            <ItemModalCart
                {...props}
            />
        </>
    );
};

export default ItemModal;