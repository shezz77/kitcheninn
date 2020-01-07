import React, {useContext} from 'react';
import AppContext from './../../context/cart-context';
import SocialButton from './hoc/social-button';
import {FACEBOOK_CONFIGS, GOOGLE_CONFIGS} from "../../utils/conf";

const Login = () => {
    const context = useContext(AppContext);

    const handleGuest = () => {
        context.handleUpdateMainState({showLoginModal: false})
    };

    const handleLoginSuccess = e => {
        let {_profile} = e;
        let {orderConfirmInfo} = context;

        orderConfirmInfo.customer.first_name = _profile.firstName;
        orderConfirmInfo.customer.email = _profile.email;
        orderConfirmInfo.payment.account_holder_name = _profile.name ? _profile.name : '';

        orderConfirmInfo.isCashed = true;
        localStorage.setItem('orderConfirmInfo', JSON.stringify(orderConfirmInfo));
        context.handleUpdateMainState({showLoginModal: false, orderConfirmInfo});
    };

    const handleLoginFailure = e => {
        console.log(e);
    };


    return (
        <div className={'signup-popup'}>
            <div className={'signup-holder'}>
                <SocialButton
                    {...FACEBOOK_CONFIGS}
                    onLoginSuccess={handleLoginSuccess}
                    onLoginFailure={handleLoginFailure}
                    key={'facebook'}
                >
                    <button className="loginBtn loginBtn--facebook button hoverable">
                        <div className={'anim'}/>
                        Login with Facebook
                    </button>
                </SocialButton>

                <SocialButton
                    {...GOOGLE_CONFIGS}
                    onLoginSuccess={handleLoginSuccess}
                    onLoginFailure={handleLoginFailure}
                    key={'google'}
                >
                    <button className="loginBtn loginBtn--google button hoverable">
                        <div className={'anim'}/>
                        Login with Google
                    </button>
                </SocialButton>

                <div className="line">Or</div>

                <button onClick={handleGuest} type={'button'} className={'contunue-guest btn-submit button hoverable'}><div className={'anim'}/>Continue as guest</button>
            </div>
        </div>
    );
};

export default Login;