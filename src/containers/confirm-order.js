import React from 'react';
import Index from "../components/confirm-order";
import AppContext from './../context/cart-context';
import {navigate} from "../components/shared/services";
import {withRouter} from 'react-router-dom';

class ConfirmOrder extends React.Component {
    static contextType = AppContext;

    componentDidMount() {
        let orderConfirmInfo = localStorage.getItem('orderConfirmInfo');
        let cart = localStorage.getItem('cart');

        if (!cart) {
            this.context.updateCartStateFromLocalStorage();
            navigate(this.props, '/');
            return true;
        }

        if (orderConfirmInfo) {
            orderConfirmInfo = JSON.parse(orderConfirmInfo);
            this.context.handleUpdateMainState({orderConfirmInfo});
        } else {
            this.context.handleUpdateMainState({showLoginModal: true});
        }
    }

    render() {
        return (
            <Index/>
        );
    }
}

export default withRouter(ConfirmOrder);
