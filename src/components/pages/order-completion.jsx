import React from 'react';
import {withRouter} from 'react-router-dom';
import {navigate} from "../shared/services";

const OrderCompletion = props => {
    return (
        <div>
            <h1>Your order completed</h1>
            <button onClick={navigate(props, '/')}>Go to home</button>
        </div>
    );
};

export default withRouter(OrderCompletion);