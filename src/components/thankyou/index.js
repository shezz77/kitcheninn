import React from 'react';
// import moment from 'moment';
// import MainContext from './../../context/cart-context';

const ThankyouIndex = () => {
    // const context = useContext(MainContext);
    // let {restaurant, orderConfirmInfo, cart} = context;
    // let {items} = cart;

    return (
            <div className={'container'}>
                <div className="text-holder" style={{paddingTop: '25px'}}>
                    <h4>
                        THANK YOU <br/>
                        For you Kitcheninns Order!<br/><br/>

                        It has been sent to the restaurant to be prepared just the way you like it.<br/><br/>

                        An order confirmation has been emailed.<br/><br/>

                        If you have any questions or thoughts please hit us up through our live chat and one of our experts will be happy to chat with you. +61 450 889 573<br/><br/>

                        Bon Appe'tit!!<br/><br/>
                    </h4>
                </div>
            </div>
    );
};

export default ThankyouIndex;
